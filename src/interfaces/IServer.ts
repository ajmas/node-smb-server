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

import SMBLogin from '../smblogin.js'
import SMBError from '../smberror.js';
import ISession from './ISession.js';
import IShare from './IShare.js';
import ITree from './ITree.js';

/**
 * SMB Server
 *
 * events:
 * - error: error
 * - started
 * - terminated
 * - shareConnected: shareName
 * - shareDisconnected: shareName
 * - fileCreated: shareName, path
 * - folderCreated: shareName, path
 * - fileDeleted: shareName, path
 * - folderDeleted: shareName, path
 * - itemMoved: shareName, oldPath, newPath
 * - folderListed: shareName, path
 *
 * @param {Object} config - configuration hash
 * @param {Authenticator} authenticator
 * @constructor
 */
interface IServer {
  // static connectionIdCounter: number = 0;
  // tcpServer: Server;
  // connections: Record<string, unknown>;
  // shares: Record<string, unknown>;
  // logins: Record<string, unknown>;
  // sessions: Record<string, unknown>;
  // trees: Record<string, unknown>;
  // guid: Buffer;
  // domainName: string;
  // hostName: string;
  // nativeOS: string;
  // config: Record<string, unknown>;
  // authenticator: DefaultAuthenticator;
  // tsStarted?: Date;
  // nativeLanMan: string;


  onError(err: unknown);

  onClose();

  start(port: number, host: string, callback?: () => void);

  stop(cb: (smbError?: SMBError | null) => void);

  getGuid(): number;

  getStartTime(): number;

  createLogin(): SMBLogin;

  getLogin(key: string): SMBLogin;

  destroyLogin(key: string);

  /**
   *
   * @param {SMBLogin} login
   * @param {String} accountName
   * @param {String} primaryDomain
   * @param {Buffer} caseInsensitivePassword
   * @param {Buffer} caseSensitivePassword
   * @param {Function} cb callback called with the authenticated session
   * @param {String|Error} cb.error error (non-null if an error occurred)
   * @param {SMBSession} cb.session authenticated session
   */
  setupSession(
    login: SMBLogin,
    accountName: string,
    primaryDomain: string,
    caseInsensitivePassword: string,
    caseSensitivePassword: string,
    cb: (smbError?: SMBError | null, smbSession?: ISession) => void
  );

  getSession(uid): ISession;

  destroySession(uid);

  getShareNames(): string[];

  listShares(): IShare[];

  /**
   * Refresh a specific folder on a specific share.
   *
   * @param {String} shareName
   * @param {String} folderPath
   * @param {Boolean} deep
   * @param {Function} cb callback called on completion
   * @param {String|Error} cb.error error (non-null if an error occurred)
   */
  refresh(shareName: string, folderPath: string, deep: boolean, cb: (smbError?: SMBError | null) => void);

  /**
   *
   * @param {SMBSession} session
   * @param {String} shareName
   * @param {Buffer|String} shareLevelPassword optional share-level password (may be null)
   * @param {Function} cb callback called with the connect tree
   * @param {String|Error} cb.error error (non-null if an error occurred)
   * @param {SMBSession} cb.session authenticated session
   */
  connectTree(session: ISession, shareName: string, shareLevelPassword: string, cb: (smbError?: SMBError | null, session?: ISession) => void);

  getTree(tid: number): ITree;

  disconnectTree(tid: number);

  /**
   * Clears the server's cache.
   * @param {function} cb Will be invoked when the operation is complete.
   * @param {string|Error} cb.err Will be truthy if there were errors during the operation.
   */
  clearCache(cb: (smbError?: SMBError | null) => void);
}

export default IServer;
