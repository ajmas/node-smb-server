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
import fs, { Stats } from 'node:fs'
import Async from 'async';
import baseLogger from '../../logger.js'

import mkdirp from 'mkdirp'
import Share from '../../spi/share.js'
import FSTree from './FsTree.js'
import SMBError from '../../smberror.js'
import { SmbFsShareConfig } from '../../types/common.js';
import Session from '../../spi/session.js'

const logger = baseLogger.child({ module: 'spi' })

/**
 * Creates an instance of FSShare.
 *
 * @constructor
 * @this {FSShare}
 * @param {String} name share name
 * @param {Object} config configuration hash
 */
class FSShare extends Share {
  path: string;
  constructor(name: string, config: SmbFsShareConfig) {
    config = config || {}

    super(name, config)

    this.path = config.path
    this.description = config.description || ''
  }

  // --------------------------------------------------------------------< Share >
  /**
   * Return a flag indicating whether this is a named pipe share.
   *
   * @return {Boolean} <code>true</code> if this is a named pipe share;
   *         <code>false</code> otherwise, i.e. if it is a disk share.
   */
  isNamedPipe() {
    return false
  }

  /**
   *
   * @param {Session} session
   * @param {Buffer|String} shareLevelPassword optional share-level password (may be null)
   * @param {Function} callback callback called with the connect tree
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {FSTree} cb.tree connected tree
   */
  connect(session: Session, shareLevelPassword: string, callback: (error: SMBError | undefined | null, fsTree?: FSTree | undefined) => void) {
    // todo check access rights of session?
    const self = this
    async function stat(done: (arg1: unknown, stats: Stats) => void) {
      fs.stat(self.path, (err, stats) => {
        done(null, stats)
      });
    }

    async function createOrValidate(stats: Stats, done: (message?: string) => void) {
      if (!stats) {
        await mkdirp (self.path);
        done();
      } else {
        if (!stats.isDirectory()) {
          done('invalid share configuration: ' + self.path + ' is not a valid directory path')
        } else {
          done()
        }
      }
    }

    Async.waterfall([stat, createOrValidate], (err) => {
      if (err) {
        logger.error(err)
        const msg = typeof err === 'string' ? err : err.message
        callback(SMBError.fromSystemError(err, 'unable to connect fs tree due to unexpected error'))
      } else {
        callback(null, new FSTree(self))
      }
    })
  }
}

export default FSShare
