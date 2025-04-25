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

class CommonConstants {

  /**
   * Common/protocol-neutral constants (i.e. applicable to multiple SMB protocol versions)
   */

  static NATIVE_LANMAN = 'node-smb-server';

  /**
   * dialects
   */
  static DIALECT_NT_LM_0_12 = 'NT LM 0.12';// the currently supported dialect (CIFS)
  static DIALECT_SMB_2_002 = 'SMB 2.002';
  static DIALECT_SMB_2_X = 'SMB 2.???';

  /**
   * File attributes (MS-FSCC; 2.6)
   */
  static ATTR_READ_ONLY = 0x001;
  static ATTR_HIDDEN = 0x002;
  static ATTR_SYSTEM = 0x004;
  static ATTR_VOLUME = 0x008;
  static ATTR_DIRECTORY = 0x010;
  static ATTR_ARCHIVE = 0x020;
  static ATTR_NORMAL = 0x080;
  static ATTR_TEMPORARY = 0x100;
  static ATTR_COMPRESSED = 0x800;

  /**
   * file actions used in FileNotifyInformation (MS-FSCC; 2.4.42)
   */
  static FILE_ACTION_ADDED = 0x00000001;
  static FILE_ACTION_REMOVED = 0x0000002;
  static FILE_ACTION_MODIFIED = 0x0000003;
  static FILE_ACTION_RENAMED_OLD_NAME = 0x0000004;
  static FILE_ACTION_RENAMED_NEW_NAME = 0x0000005;
  static FILE_ACTION_ADDED_STREAM = 0x0000006;
  static FILE_ACTION_REMOVED_STREAM = 0x0000007;
  static FILE_ACTION_MODIFIED_STREAM = 0x0000008;

  static FILE_ACTION_RENAMED = 0x0000100;

  // FILE_ACTION_TO_STRING = () => {
  //   _.reduce(
  //     consts,
  //     (result, val, nm) => {
  //       if (nm.indexOf('FILE_ACTION_') === 0) {
  //         result[val] = nm;
  //       }
  //       return result;
  //     },
  //     {}
  //   )
  // },

  /**
   * Create Disposition
   */
  static FILE_SUPERSEDE = 0x00; // (No bits set.)If the file already exists; it SHOULD be superseded (overwritten). If it does not already exist; then it SHOULD be created.
  static FILE_OPEN = 0x01; // If the file already exists; it SHOULD be opened rather than created. If the file does not already exist; the operation MUST fail.
  static FILE_CREATE = 0x02; // If the file already exists; the operation MUST fail. If the file does not already exist; it SHOULD be created.
  static FILE_OPEN_IF = 0x03; // If the file already exists; it SHOULD be opened. If the file does not already exist; then it SHOULD be created. This value is equivalent to (FILE_OPEN | FILE_CREATE).
  static FILE_OVERWRITE = 0x04; // If the file already exists; it SHOULD be opened and truncated. If the file does not already exist; the operation MUST fail. The client MUST open the file with at least GENERIC_WRITE access for the command to succeed.
  static FILE_OVERWRITE_IF = 0x05; // If the file already exists; it SHOULD be opened and truncated. If the file does not already exist; it SHOULD be created. The client MUST open the file with at least GENERIC_WRITE access.

  /**
   * Create Action
   */
  static FILE_SUPERSEDED = 0x00000000; // An existing file was deleted and a new file was created in its place.
  static FILE_OPENED = 0x00000001; // An existing file was opened.
  static FILE_CREATED = 0x00000002; // A new file was created.
  static FILE_OVERWRITTEN = 0x00000003; // An existing file was overwritten.

  /**
   * Create Options
   */
  static FILE_DIRECTORY_FILE = 0x00000001; // The file being created or opened is a directory file.
  static FILE_WRITE_THROUGH = 0x00000002;
  static FILE_SEQUENTIAL_ONLY = 0x00000004;
  static FILE_NO_INTERMEDIATE_BUFFERING = 0x00000008;
  static FILE_SYNCHRONOUS_IO_ALERT = 0x00000010;
  static FILE_SYNCHRONOUS_IO_NONALERT = 0x00000020;
  static FILE_NON_DIRECTORY_FILE = 0x00000040; // If the file being opened is a directory; the server MUST fail the request with STATUS_FILE_IS_A_DIRECTORY in the Status field of the SMB Header in the server response.
  static FILE_CREATE_TREE_CONNECTION = 0x00000080;
  static FILE_COMPLETE_IF_OPLOCKED = 0x00000100;
  static FILE_NO_EA_KNOWLEDGE = 0x00000200;
  static FILE_OPEN_FOR_RECOVERY = 0x00000400;
  static FILE_RANDOM_ACCESS = 0x00000800;
  static FILE_DELETE_ON_CLOSE = 0x00001000; // The file SHOULD be automatically deleted when the last open request on this file is closed. When this option is set; the DesiredAccess field MUST include the DELETE flag. This option is often used for temporary files.
  static FILE_OPEN_BY_FILE_ID = 0x00002000;
  static FILE_OPEN_FOR_BACKUP_INTENT = 0x00004000;
  static FILE_NO_COMPRESSION = 0x00008000;
  static FILE_RESERVE_OPFILTER = 0x00100000;
  static FILE_OPEN_NO_RECALL = 0x00400000;
  static FILE_OPEN_FOR_FREE_SPACE_QUERY = 0x00800000;
}

export default CommonConstants;
