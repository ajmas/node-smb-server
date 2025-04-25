/*
 *  Copyright 2015 Adobe Systems Incorporated. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

import ISession from '../interfaces/ISession.js';
import SMBError from '../smberror.js'

/**
 * Creates an instance of Session. Allows an implementation to perform cleanup tasks on logoff.
 *
 * @constructor
 * @this {Session}
 */
class Session implements ISession {
  constructor() {}

  logoff(callback?: (error: Error | SMBError) => void) {
    process.nextTick(function () {
      if (callback) {
        callback(new Error('abstract method'));
      }
    });
  }
}

export default Session
