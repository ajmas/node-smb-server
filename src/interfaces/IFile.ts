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

import SMBError from '../smberror.js'
import ITree from './ITree.js'

/**
 * Creates an instance of File.
 *
 * @constructor
 * @this {File}
 * @param {String} filePath normalized file path
 * @param {Tree} tree tree object
 */
interface File {

  /**
   * Return the Tree.
   *
   * @return {String} file path
   */
  getTree(): ITree;

  /**
   * Return the normalized file path.
   *
   * @return {String} file path
   */
  getPath(): string;

  /**
   * Return the file name.
   *
   * @return {String} file name
   */
  getName(): string;

  /**
   * Return a flag indicating whether this is a file.
   *
   * @return {Boolean} <code>true</code> if this is a file;
   *         <code>false</code> otherwise
   */
  isFile(): boolean;

  /**
   * Return a flag indicating whether this is a directory.
   *
   * @return {Boolean} <code>true</code> if this is a directory;
   *         <code>false</code> otherwise
   */
  isDirectory(): boolean;

  /**
   * Return a flag indicating whether this file is read-only.
   *
   * @return {Boolean} <code>true</code> if this file is read-only;
   *         <code>false</code> otherwise
   */
  isReadOnly(): boolean;

  /**
   * Converts the file into a generic object suitable for transport outside of the backend.
   *
   * @return {object} An object containing information about the file.
   */
  toObject(): Record<string, unknown>;

  /**
   * Return a flag indicating whether this file is hidden.
   *
   * @return {Boolean} <code>true</code> if this file is hidden;
   *         <code>false</code> otherwise
   */
  isHidden(): boolean;

  /**
   * Return the file size.
   *
   * @return {Number} file size, in bytes
   */
  size(): number;

  /**
   * Return the number of bytes that are allocated to the file.
   *
   * @return {Number} allocation size, in bytes
   */
  allocationSize(): number;

  /**
   * Return the time of last modification, in milliseconds since
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} time of last modification
   */
  lastModified(): number;

  /**
   * Sets the time of last modification, in milliseconds since
   * Jan 1, 1970, 00:00:00.0.
   *
   * @param {Number} ms
   * @return {Number} time of last modification
   */
  setLastModified(ms: number): number;

  /**
   * Return the time when file status was last changed, in milliseconds since
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} when file status was last changed
   */
  lastChanged(): number;

  /**
   * Return the create time, in seconds since Jan 1, 1970, 00:00:00.0.
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} time created
   */
  created(): number;

  /**
   * Return the time of last access, in seconds since Jan 1, 1970, 00:00:00.0.
   * Jan 1, 1970, 00:00:00.0.
   *
   * @return {Number} time of last access
   */
  lastAccessed(): number;

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
  read(buffer: Buffer, offset: number, length: number, position:  number, cb: (smbError: SMBError | null | undefined, bytesRead?: number, data?: Buffer) => void): void;

  /**
   * Write bytes at a certain position inside the file.
   *
   * @param {Buffer} data buffer to write
   * @param {Number} position position inside file
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  write(data: Buffer, position: number, cb: (smbError?: SMBError | null) => void): void;

  /**
   * Sets the file length.
   *
   * @param {Number} length file length
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  setLength(length: number, cb: (smbError?: SMBError | null) => void): void;

  /**
   * Delete this file or directory. If this file denotes a directory, it must
   * be empty in order to be deleted.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  delete(cb: (smbError?: SMBError | null | undefined) => void): void;

  /**
   * Flush the contents of the file to disk.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  flush(cb: (smbError?: SMBError | null) => void): void;

  /**
   * Close this file, releasing any resources.
   *
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  close(cb: (smbError?: SMBError | null) => void): void;

  /**
   * Copies this file to another tree
   * @param {Tree} destTree destination tree
   * @param {String} destName name of destination file
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  copyTo(destTree: ITree, destName: string, cb: (smbError?: SMBError | null) => void): void;

  /**
   * Moves this file to another tree
   * @param {Tree} destTree destination tree
   * @param {String} destName name of destination file
   * @param {Function} cb callback called on completion
   * @param {SMBError} cb.error error (non-null if an error occurred)
   */
  moveTo(destTree: ITree, destName: string, cb: (smbError?: SMBError | null) => void): void;
}

export default File
