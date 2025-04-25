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

import errno from 'errno';

import ntstatus, { statusToString } from './ntstatus.js'

/**
 * Represents an SMB Error.
 *
 * @param {Number} status
 * @param {String} [message]
 * @constructor
 */
class SMBError extends Error {
  status: number;
  message: string;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status
    this.message = message || statusToString(status) || 'unknown error';

    Object.setPrototypeOf(this, SMBError.prototype);
  }

  static fromSystemError(err: NodeJS.ErrnoException | null | undefined, message?: string) {
    let status = ntstatus.STATUS_UNSUCCESSFUL;
    let msg = err ? err.message : message;

    if (typeof msg !== 'string') {
      msg = err?.message || statusToString(status) || 'unknown error'

      /**
       * err.syscall
       * err.errno
       * err.code
       * err.path
       */
      if (err && err.errno) {
        let code = err.code
        if (errno.errno[err.errno]) {
          msg = errno.errno[err.errno].description;
          code = errno.errno[err.errno].code;
        }
        if (err.path) {
          msg += ' [' + err.path + ']'
        }
        // the code:errno mapping is not unique (see e.g. 'ENOENT') ...
        switch (code) {
          case 'EINVAL':
            status = ntstatus.STATUS_NOT_IMPLEMENTED
            break
          case 'ENOENT':
            status = ntstatus.STATUS_NO_SUCH_FILE
            break
          case 'EPERM':
            status = ntstatus.STATUS_ACCESS_DENIED
            break
          case 'EBADF':
            // status = ntstatus.STATUS_INVALID_HANDLE;
            status = ntstatus.STATUS_SMB_BAD_FID
            break
          case 'EOF':
            status = ntstatus.STATUS_END_OF_FILE
            break
          case 'EEXIST':
            status = ntstatus.STATUS_OBJECT_NAME_COLLISION
            break
          case 'EACCES':
            status = ntstatus.STATUS_NETWORK_ACCESS_DENIED
            break
        }
      }
    }

    if (message) {
      msg += ' [' + message + ']'
    }

    return new SMBError(status, msg)
  }

  toJson (): Record<string, any> | Record<string, any>[] {
    return {
      status: this.status,
      message: this.message,
      stack: this.stack
    };
  }

  static systemToSMBErrorTranslator(cb: (smbError: SMBError | undefined | null, ...args: unknown[]) => void, message?: string) {
    return function (error?: Error | null, ...args: unknown[]) {
      cb(SMBError.fromSystemError(error, message), args);
    }
  }

  toString() {
    this.status = this.status || ntstatus.STATUS_UNSUCCESSFUL
    return '[' + this.status + '] (' + statusToString(this.status) + ')' + this.message
  }
}

export default SMBError
