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
import baseLogger from '../../logger.js'
import _ from 'lodash';

import Tree from '../../spi/tree.js'
import ntstatus from '../../ntstatus.js'
import SMBError from '../../smberror.js'
import IPC from './IpcConstants.js'
import IPCFile from './IpcFile.js'
import Share from '../../spi/share.js'
import IFile from '../../interfaces/IFile.js';
const logger = baseLogger.child({ module: 'spi' })

/**
 * Creates an instance of Tree.
 *
 * @constructor
 * @this {IPCTree}
 * @param {IPCShare} share parent share
 */
class IPCTree extends Tree {
  share: Share;
  pipes: Record<string, unknown>;

  constructor(share: Share) {
    super(share.config)

    this.share = share

    this.pipes = {}
    // this.pipes[IPC.LSARPC] = {};
    // we are currently only supporting /srvsrc (NetShareEnumAll)
    this.pipes[IPC.SRVSVC] = {}

  }

  /**
   * Test whether or not the specified file exists.
   *
   * @param {String} name file name
   * @param {Function} cb callback called with the result
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {Boolean} cb.exists true if the file exists; false otherwise
   */
  exists(name: string, cb: (error?: SMBError | null, exists?: boolean) => void) {
    logger.debug('[ipc] tree.exists %s', name)
    const self = this
    process.nextTick(function () {
      cb(null, !!self.pipes[name])
    })
  }

  /**
   * Open an existing file.
   *
   * @param {String} name file name
   * @param {Function} cb callback called with the opened file
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File} cb.file opened file
   */
  open(name: string, cb: (error?: SMBError | null, file?: IFile) => void) {
    logger.debug('[ipc] tree.open %s', name)
    if (this.pipes[name]) {
      process.nextTick(() => {
        cb(undefined, new IPCFile(name, this))
      })
    } else {
      // process.nextTick(function () { cb(new SMBError(ntstatus.STATUS_SMB_NO_SUPPORT)); });
      process.nextTick(function () {
        cb(new SMBError(ntstatus.STATUS_ACCESS_DENIED))
      })
    }
  }

  /**
   * List entries, matching a specified pattern.
   *
   * @param {String} pattern pattern
   * @param {Function} cb callback called with an array of matching files
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File[]} cb.files array of matching files
   */
  list(pattern: string, cb: (error?: SMBError | null, files?: IFile[]) => void) {
    logger.debug('[ipc] tree.list %s', pattern)
    const files: IFile[] = _.keys(this.pipes).map((nm) => {
      return new IPCFile(nm, this)
    })
    process.nextTick(function () {
      cb(undefined, files)
    })
  }

  /**
   * Create a new file.
   *
   * @param {String} name file name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File} cb.file created file
   */
  createFile(name: string, cb: (error: SMBError | undefined | null, file?: IFile) => void) {
    logger.debug('[ipc] tree.createFile %s', name)
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_SMB_NO_SUPPORT))
    })
  }

  /**
   * Create a new directory.
   *
   * @param {String} name directory name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File} cb.file created directory
   */
  createDirectory(name: string, cb: (error: SMBError | undefined | null) => void) {
    logger.debug('[ipc] tree.createDirectory %s', name)
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_SMB_NO_SUPPORT))
    })
  }

  /**
   * Delete a file or directory. If name denotes a directory, it must be
   * empty in order to be deleted.
   *
   * @param {String} name file or directory name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  delete(name: string, cb: (error?: SMBError) => void) {
    logger.debug('[ipc] tree.delete %s', name)
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_SMB_NO_SUPPORT))
    })
  }

  /**
   * Rename a file or directory.
   *
   * @param {String} oldName old name
   * @param {String} newName new name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  rename(oldName: string, newName: string, cb: (error?: SMBError | null, file?: IFile) => void) {
    logger.debug('[ipc] tree.rename %s -> %s', oldName, newName)
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_SMB_NO_SUPPORT))
    })
  }

  /**
   * Refresh a specific folder.
   *
   * @param {String} folderPath
   * @param {Boolean} deep
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  refresh(folderPath: string, deep: boolean, cb: (error?: SMBError) => void) {
    logger.debug('[ipc] tree.refresh %s, %d', folderPath, deep)
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_SMB_NO_SUPPORT))
    })
  }

  /**
   * Disconnect this tree.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  disconnect(cb: (error?: SMBError) => void) {
    logger.debug('[ipc] tree.disconnect')
    process.nextTick(function () {
      cb()
    })
  }
}

export default IPCTree
