/*
 *  Copyright 2015 Adobe Systems Incorporated. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

import _ from 'lodash'
import baseLogger from './logger.js'

import * as ntlm from './ntlm.js'
import Authenticator from './spi/authenticator.js'
import Session from './spi/session.js'
import ISession from './interfaces/ISession.js'
import { SmbAuthenticatorConfig } from './types/common.js'
const logger = baseLogger.child({ module: 'spi' })

/**
 * Creates an instance of DefaultSession.
 *
 * @constructor
 * @this {DefaultSession}
 */
class DefaultSession extends Session {
  accountName: string;
  domainName: string;

  constructor(accountName: string, domainName: string) {
    super();
    this.accountName = accountName;
    this.domainName = domainName;
  }

  logoff() {
    // nothing to do here
    const account =
      this.domainName && this.domainName !== ''
        ? this.domainName + "'" + this.accountName
        : this.accountName
    logger.debug('logged off %s', account)
  }
}

/**
 * Creates an instance of DefaultAuthenticator.
 *
 * @constructor
 * @this {DefaultAuthenticator}
 * @param {Object} config configuration hash
 */
class DefaultAuthenticator extends Authenticator {
  config: SmbAuthenticatorConfig;

  constructor(config: SmbAuthenticatorConfig) {
    super()
    this.config = _.cloneDeep(config)
  }

  authenticate(
    challenge: Buffer,
    caseInsensitivePassword: Buffer,
    caseSensitivePassword: Buffer,
    domainName: string,
    accountName: string,
    cb: (error?: Error | null, session?: ISession) => void
  ) {
    // challenge -> server challenge
    // caseInsensitivePassword -> client LM or LMv2 hash
    // caseSensitivePassword -> client NTLM or NTLMv2 hash
    const userName = accountName.toLowerCase()
    const user = this.config.users[userName]
    if (!user) {
      logger.debug('authentication failed: unknown user: %s', userName)
      cb(new Error('unknown user'))
      return
    }

    const lmHash = Buffer.from(user.lmHash, 'hex')
    const ntlmHash = Buffer.from(user.ntlmHash, 'hex')

    let authenticated: boolean = false

    if (caseSensitivePassword.length === ntlm.ntlm.RESPONSE_LENGTH) {
      // NTLM
      authenticated = ntlm.validateNTLMResponse(caseSensitivePassword, ntlmHash, challenge)
    } else if (caseSensitivePassword.length >= ntlm.ntlm2.MIN_RESPONSE_LENGTH) {
      // NTLMv2
      authenticated = !!ntlm.validateNTLMv2Response(
        caseSensitivePassword,
        ntlmHash,
        accountName,
        domainName,
        challenge
      )
    } else if (
      caseInsensitivePassword.length === ntlm.lm.RESPONSE_LENGTH ||
      caseInsensitivePassword.length === ntlm.lm2.RESPONSE_LENGTH
    ) {
      // assume LMv2 or LM
      authenticated =
        !!(ntlm.validateLMv2Response(
          caseInsensitivePassword,
          ntlmHash,
          accountName,
          domainName,
          challenge
        ) || ntlm.validateLMResponse(caseInsensitivePassword, lmHash, challenge))
    } else {
      logger.warn(
        'invalid/unsupported credentials: caseInsensitivePassword: %s, caseSensitivePassword: %s',
        caseInsensitivePassword.toString('hex'),
        caseSensitivePassword.toString('hex')
      )
      cb(new Error('invalid/unsupported credentials'))
      return
    }

    if (!authenticated) {
      logger.debug('failed to authenticate user %s: invalid credentials', userName)
      cb(new Error('invalid credentials'))
      return
    }

    cb(null, new DefaultSession(accountName, domainName))
  }
}

export default DefaultAuthenticator
