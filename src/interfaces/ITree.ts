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

import type IFile from './IFile.js';
import SMBError from '../smberror.js'
import IShare from './IShare.js';

/**
 * Creates an instance of Tree.
 *
 * @constructor
 * @this {Tree}
 */
interface ITree {
  share?: IShare;

  /**
   * Test whether or not the specified file exists.
   *
   * @param {String} name file name
   * @param {Function} cb callback called with the result
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {Boolean} cb.exists true if the file exists; false otherwise
   */
  exists(name: string, cb: (error?: SMBError | null, exists?: boolean) => void): void;

  /**
   * Open an existing file.
   *
   * @param {String} name file name
   * @param {Function} cb callback called with the opened file
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File} cb.file opened file
   */
  open(name: string, cb: (error?: SMBError | null, file?: IFile) => void): void;

  /**
   * List entries, matching a specified pattern.
   *
   * @param {String} pattern pattern
   * @param {Function} cb callback called with an array of matching files
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File[]} cb.files array of matching files
   */
  list(pattern: string, cb: (error: SMBError | null | undefined, files?: IFile[]) => void): void;

  /**
   * Create a new file.
   *
   * @param {String} name file name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File} cb.file created file
   */
  createFile(name: string, cb: (error: SMBError | undefined |null, file?: IFile) => void): void;

  /**
   * Create a new directory.
   *
   * @param {String} name directory name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {File} cb.file created directory
   */
  createDirectory(name: string, cb: (error: SMBError | undefined | null) => void, file?: IFile): void;

  /**
   * Delete a file.
   *
   * @param {String} name file name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  delete(name: string, cb: (smbError?: SMBError | null, file?: IFile) => void): void;

  /**
   * Delete a directory. It must be empty in order to be deleted.
   *
   * @param {String} name directory name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  deleteDirectory(name: string, cb: (smbError?: SMBError | null, file?: IFile) => void): void;

  /**
   * Rename a file or directory.
   *
   * @param {String} oldName old name
   * @param {String} newName new name
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  rename(oldName: string, newName: string, cb: (smbError?: SMBError | null, file?: IFile) => void): void;
  /**
   * Refresh a specific folder.
   *
   * @param {String} folderPath
   * @param {Boolean} deep
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  refresh(folderPath: string, deep: boolean, cb: (error?: SMBError | null) => void): void;

  /**
   * Disconnect this tree.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  disconnect(cb: (error?: SMBError) => void): void;

  /**
   * Clears the tree's cache. Default implementation does nothing.
   * @param {function} cb Will be invoked when the operation is complete.
   * @param {string|Error} cb.err Will be truthy if there were errors during the operation.
   */
  clearCache(cb: (error?: string | SMBError | null) => void): void;
}

export default ITree
