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

import Path from 'node:path'

import Async from 'async'
import ntstatus from '../ntstatus.js'
import SMBError from '../smberror.js'
import { getParentPath, getPathName, unicodeNormalize } from '../utils.js'
import IFile from '../interfaces/IFile.js'
import ITree from '../interfaces/ITree.js'

/**
 * Creates an instance of File.
 *
 * @constructor
 * @this {File}
 * @param {String} filePath normalized file path
 * @param {Tree} tree tree object
 */
class File implements IFile {
  filePath: string;
  fileName: string;
  tree: ITree;

  constructor(filePath: string, tree: ITree) {
    this.filePath = unicodeNormalize(filePath)
    this.fileName = getPathName(this.filePath)
    this.tree = tree
  }

  /**
   * Return the Tree.
   *
   * @return {String} file path
   */
  getTree() {
    return this.tree
  }

  /**
   * Return the normalized file path.
   *
   * @return {String} file path
   */
  getPath() {
    return this.filePath
  }

  /**
   * Return the file name.
   *
   * @return {String} file name
   */
  getName() {
    return this.fileName
  }

  /**
   * Return a flag indicating whether this is a file.
   *
   * @return {Boolean} <code>true</code> if this is a file;
   *         <code>false</code> otherwise
   */
  isFile(): boolean {
    throw new Error('abstract method')
  }

  /**
   * Return a flag indicating whether this is a directory.
   *
   * @return {Boolean} <code>true</code> if this is a directory;
   *         <code>false</code> otherwise
   */
  isDirectory(): boolean {
    throw new Error('abstract method')
  }

  /**
   * Return a flag indicating whether this file is read-only.
   *
   * @return {Boolean} <code>true</code> if this file is read-only;
   *         <code>false</code> otherwise
   */
  isReadOnly(): boolean {
    throw new Error('abstract method')
  }

  /**
   * Converts the file into a generic object suitable for transport outside of the backend.
   *
   * @return {object} An object containing information about the file.
   */
  toObject(): Record<string, unknown> {
    return {
      name: this.getName(),
      path: getParentPath(this.getPath()),
      isFolder: this.isDirectory(),
    }
  }

  /**
   * Return a flag indicating whether this file is hidden.
   *
   * @return {Boolean} <code>true</code> if this file is hidden;
   *         <code>false</code> otherwise
   */
  isHidden(): boolean {
    const name = this.getName()
    return !!(name.length && (name[0] === '.' || name[0] === '~'));
  }

  /**
   * Return the file size.
   *
   * @return {Number} file size, in bytes
   */
  size(): number {
    throw new Error('abstract method')
  }

  /**
   * Return the number of bytes that are allocated to the file.
   *
   * @return {Number} allocation size, in bytes
   */
  allocationSize(): number {
    throw new Error('abstract method')
  }

  /**
   * Return the time of last modification, in milliseconds since
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} time of last modification
   */
  lastModified(): number {
    throw new Error('abstract method')
  }

  /**
   * Sets the time of last modification, in milliseconds since
   * Jan 1, 1970, 00:00:00.0.
   *
   * @param {Number} ms
   * @return {Number} time of last modification
   */
  setLastModified(ms: number): number {
    throw new Error('abstract method')
  }

  /**
   * Return the time when file status was last changed, in milliseconds since
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} when file status was last changed
   */
  lastChanged(): number {
    throw new Error('abstract method')
  }

  /**
   * Return the create time, in seconds since Jan 1, 1970, 00:00:00.0.
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} time created
   */
  created(): number {
    throw new Error('abstract method')
  }

  /**
   * Return the time of last access, in seconds since Jan 1, 1970, 00:00:00.0.
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} time of last access
   */
  lastAccessed(): number {
    throw new Error('abstract method')
  }

  /**
   * Read bytes at a certain position inside the file.
   *
   * @param {Buffer} buffer the buffer that the data will be written to
   * @param {Number} offset the offset in the buffer to start writing at
   * @param {Number} length the number of bytes to read
   * @param {Number} position offset where to begin reading from in the file
   * @param {Function} cb callback called with the bytes actually read
   * @param {SMBError} cb.error error (non-null if an error occurred)
   * @param {Number} cb.bytesRead number of bytes actually read
   * @param {Buffer} cb.buffer buffer holding the bytes actually read
   */
  read(buffer: Buffer, offset: number, length: number, position:  number, cb: (smbError: SMBError | null | undefined, bytesRead?: number, data?: Buffer) => void) {
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_NOT_IMPLEMENTED))
    })
  }

  /**
   * Write bytes at a certain position inside the file.
   *
   * @param {Buffer} data buffer to write
   * @param {Number} position position inside file
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  write(data: Buffer, position: number, cb: (smbError?: SMBError | null) => void) {
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_NOT_IMPLEMENTED))
    })
  }

  /**
   * Sets the file length.
   *
   * @param {Number} length file length
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  setLength(length: number, cb: (smbError?: SMBError | null) => void) {
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_NOT_IMPLEMENTED))
    })
  }

  /**
   * Delete this file or directory. If this file denotes a directory, it must
   * be empty in order to be deleted.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  delete(cb: (smbError?: SMBError | null) => void) {
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_NOT_IMPLEMENTED))
    })
  }

  /**
   * Flush the contents of the file to disk.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  flush(cb: (smbError?: SMBError | null) => void) {
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_NOT_IMPLEMENTED))
    })
  }

  /**
   * Close this file, releasing any resources.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  close(cb: (smbError?: SMBError | null) => void) {
    process.nextTick(function () {
      cb(new SMBError(ntstatus.STATUS_NOT_IMPLEMENTED))
    })
  }

  /**
   * Copies this file to another tree
   * @param {Tree} destTree destination tree
   * @param {String} destName name of destination file
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  copyTo(destTree: ITree, destName: string, cb: (smbError?: SMBError | null) => void) {
    const self = this
    const createFn = this.isFile() ? destTree.createFile : destTree.createDirectory
    createFn.call(destTree, destName, (err: SMBError | null | undefined, destFile?: IFile) => {
      if (err) {
        cb(err);
      } else if (!destFile) {
        // TODO Need to establish a suitable status number
        cb(new SMBError(0, 'No destination file or directory provided for create call'));
      } else {
        copy(self, destFile, false, (err?: SMBError | null) => {
          destFile.close(() => {
            cb(err)
          })
        })
      }
    })
  }

  /**
   * Moves this file to another tree
   * @param {Tree} destTree destination tree
   * @param {String} destName name of destination file
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  moveTo(destTree: ITree, destName: string, cb: (smbError?: SMBError | null) => void) {
    const self = this
    const createFn = this.isFile() ? destTree.createFile : destTree.createDirectory
    createFn.call(destTree, destName, (err: SMBError | undefined | null, destFile?: IFile) => {
      if (err) {
        cb(err)
      } else if (!destFile) {
        // TODO Need to establish a suitable status number
        cb(new SMBError(0, 'No destination file or directory provided for create call'))
      } else {
        copy(self, destFile, true, (err?: SMBError | null) => {
          destFile?.close(() => {
            cb(err)
          })
        })
      }
    })
  }
}

/**
 * Recursive copy/move helper function
 *
 * @param {File} srcFile
 * @param {File} destFile
 * @param {Boolean} deleteSrc if true the result is a move (i.e. copy & delete)
 * @param {Function} cb callback called on completion
 * @param {SMBError} cb.error error (non-null if an error occurred)
 */
function copy(srcFile: IFile, destFile: IFile, deleteSrc: boolean, cb: (smbError?: SMBError | null) => void) {
  if (srcFile.isFile()) {
    // file: copy single file
    const srcLength = srcFile.size()
    const buf = Buffer.alloc(Math.min(0xffff, srcLength))
    let read = 0
    Async.whilst(
      function () {
        return read < srcLength
      },
      function (callback: (smbError?: SMBError, result?: File) => void) {
        srcFile.read(buf, 0, buf.length, read, (err: SMBError | null | undefined, bytesRead?: number, data?: Buffer) => {
          if (err || !bytesRead || !data) {
            callback(err ?? undefined)
            return
          }
          data = bytesRead < data.length ? data.subarray(0, bytesRead) : data
          destFile.write(data, read, (err?: SMBError | null) => {
            if (!err) {
              read += bytesRead
            }
            callback(err ?? undefined)
          })
        })
      },
      function (err) {
        if (err) {
          cb(err as SMBError)
          return
        }
        // flush & close dest file, close src file
        Async.series<IFile, SMBError>(
          [
            (callback) => {
              destFile.flush(callback)
            },
            (callback) => {
              destFile.close(callback)
            },
            (callback) => {
              srcFile.close(callback)
            },
            (callback) => {
              if (deleteSrc) {
                srcFile.delete(callback)
              } else {
                // noop
                callback()
              }
            },
          ],
          (err: unknown, results?: (IFile | undefined)[]) => {
            cb(err as SMBError)
          }
        )
      }
    )
  } else {
    // directory: list src files and copy recursively
    const pattern = srcFile.getPath() + '/*'
    srcFile.getTree().list(pattern, (err: SMBError | null | undefined, files: IFile[] = []) => {
      if (err) {
        cb(err)
        return
      }
      Async.each(
        files,
        function (file, callback) {
          // create dest file
          const destPath = Path.join(destFile.getPath(), file.getName())
          const destTree = destFile.getTree()
          const createFn = file.isFile() ? destTree.createFile : destTree.createDirectory
          createFn.call(destTree, destPath, (err: SMBError | null | undefined, destFile?: IFile) => {
            if (err) {
              callback(err)
            } else if (!destFile) {
              // TODO Need to establish a suitable status number
              callback(new SMBError(0, 'No destination file or directory provided for create call'))
            } else {
              // recurse
              copy(file, destFile, deleteSrc, function (err) {
                destFile.close(() => {
                  callback(err)
                })
              })
            }
          })
        },
        function (err) {
          if (err) {
            cb(err as SMBError)
            return
          }
          if (deleteSrc) {
            srcFile.delete(cb)
          } else {
            cb()
          }
        }
      )
    })
  }
}

export default File
