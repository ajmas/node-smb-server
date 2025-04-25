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

/**
 * a selection of 32bit NT Status codes (see [MS-ERREF] 2.3 for complete list)
 */
enum NtStatus {
  STATUS_SUCCESS = 0x00000000,
  STATUS_INVALID_SMB = 0x00010002, // At least one command parameter fails validation tests such as a field value being out of range or fields within a command being internally inconsistent.
  STATUS_SMB_BAD_TID = 0x00050002, // The TID specified in the command was invalid.
  STATUS_SMB_BAD_FID = 0x00060001, // Invalid FID.
  STATUS_SMB_BAD_UID = 0x005b0002, // The UID specified is not known as a valid ID on this server session.
  STATUS_SMB_BAD_COMMAND = 0x00160002, // An unknown SMB command code was received by the server.
  STATUS_OS2_INVALID_LEVEL = 0x007c0001, // Invalid information level.
  STATUS_UNSUCCESSFUL = 0xc0000001, // General error.
  STATUS_NOT_IMPLEMENTED = 0xc0000002, // Unrecognized SMB command code.
  STATUS_INVALID_HANDLE = 0xc0000008, // Invalid FID.
  STATUS_END_OF_FILE = 0xc0000011, // Attempted to read beyond the end of the file..
  STATUS_INVALID_PARAMETER = 0xc000000d, // A parameter supplied with the message is invalid.
  STATUS_NO_SUCH_FILE = 0xc000000f, // File not found.
  STATUS_MORE_PROCESSING_REQUIRED = 0xc0000016, // There is more data available to read on the designated named pipe.
  STATUS_ACCESS_DENIED = 0xc0000022, // Access denied.
  STATUS_OBJECT_NAME_NOT_FOUND = 0xc0000034, // File not found.
  STATUS_OBJECT_NAME_COLLISION = 0xc0000035, // An attempt to create a file or directory failed because an object with the same pathname already exists.
  STATUS_OBJECT_PATH_NOT_FOUND = 0xc000003a, // File not found.
  STATUS_EAS_NOT_SUPPORTED = 0xc000004f, // The server file system does not support Extended Attributes.
  STATUS_EA_TOO_LARGE = 0xc0000050, // Either there are no extended attributes, or the available extended attributes did not fit into the response.
  STATUS_WRONG_PASSWORD = 0xc000006a, // Invalid password.
  STATUS_LOGON_FAILURE = 0xc000006d,
  STATUS_IO_TIMEOUT = 0xc00000b5, // Operation timed out.
  STATUS_FILE_IS_A_DIRECTORY = 0xc00000ba,
  STATUS_NOT_SUPPORTED = 0xc00000bb,
  STATUS_UNEXPECTED_NETWORK_ERROR = 0xc00000c4, // Operation timed out.
  STATUS_NETWORK_ACCESS_DENIED = 0xc00000ca, // Access denied. The specified UID does not have permission to execute the requested command within the current context (TID).
  STATUS_BAD_DEVICE_TYPE = 0xc00000cb, // Resource type invalid. Value of Service field in the request was invalid.
  STATUS_BAD_NETWORK_NAME = 0xc00000cc, // Invalid server name in Tree Connect.
  STATUS_TOO_MANY_SESSIONS = 0xc00000ce, // Too many UIDs active for this SMB connection.
  STATUS_REQUEST_NOT_ACCEPTED = 0xc00000d0, // No resources currently available for this SMB request.
  STATUS_NOT_A_DIRECTORY = 0xc0000103,
  STATUS_SMB_NO_SUPPORT = 0xffff0002, // Function not supported by the server.

  // STATUS_SUCCESS = 0x00000000,
  STATUS_PENDING = 0x00000103,
  STATUS_NOTIFY_CLEANUP = 0x0000010b,
  STATUS_NOTIFY_ENUM_DIR = 0x0000010c,
  SEC_I_CONTINUE_NEEDED = 0x00090312,
  STATUS_OBJECT_NAME_EXISTS = 0x40000000,
  STATUS_BUFFER_OVERFLOW = 0x80000005,
  STATUS_NO_MORE_FILES = 0x80000006,
  SEC_E_SECPKG_NOT_FOUND = 0x80090305,
  SEC_E_INVALID_TOKEN = 0x80090308,
  // STATUS_NOT_IMPLEMENTED = 0xc0000002,
  STATUS_INVALID_INFO_CLASS = 0xc0000003,
  STATUS_INFO_LENGTH_MISMATCH = 0xc0000004,
  // STATUS_INVALID_HANDLE = 0xc0000008,
  // STATUS_INVALID_PARAMETER = 0xc000000d,
  STATUS_NO_SUCH_DEVICE = 0xc000000e,
  // STATUS_NO_SUCH_FILE = 0xc000000f,
  STATUS_INVALID_DEVICE_REQUEST = 0xc0000010,
  // STATUS_END_OF_FILE = 0xc0000011,
  // STATUS_MORE_PROCESSING_REQUIRED = 0xc0000016,
  // STATUS_ACCESS_DENIED = 0xc0000022, // The user is not authorized to access the resource.
  STATUS_BUFFER_TOO_SMALL = 0xc0000023,
  STATUS_OBJECT_NAME_INVALID = 0xc0000033,
  // STATUS_OBJECT_NAME_NOT_FOUND = 0xc0000034,
  // STATUS_OBJECT_NAME_COLLISION = 0xc0000035, // The file already exists
  STATUS_OBJECT_PATH_INVALID = 0xc0000039,
  // STATUS_OBJECT_PATH_NOT_FOUND = 0xc000003a, // The share path does not reference a valid resource.
  STATUS_OBJECT_PATH_SYNTAX_BAD = 0xc000003b,
  STATUS_DATA_ERROR = 0xc000003e, // IO error
  STATUS_SHARING_VIOLATION = 0xc0000043,
  STATUS_FILE_LOCK_CONFLICT = 0xc0000054,
  STATUS_LOCK_NOT_GRANTED = 0xc0000055,
  STATUS_DELETE_PENDING = 0xc0000056,
  STATUS_PRIVILEGE_NOT_HELD = 0xc0000061,
  // STATUS_WRONG_PASSWORD = 0xc000006a,
  // STATUS_LOGON_FAILURE = 0xc000006d, // Authentication failure.
  STATUS_ACCOUNT_RESTRICTION = 0xc000006e, // The user has an empty password, which is not allowed
  STATUS_INVALID_LOGON_HOURS = 0xc000006f,
  STATUS_INVALID_WORKSTATION = 0xc0000070,
  STATUS_PASSWORD_EXPIRED = 0xc0000071,
  STATUS_ACCOUNT_DISABLED = 0xc0000072,
  STATUS_RANGE_NOT_LOCKED = 0xc000007e,
  STATUS_DISK_FULL = 0xc000007f,
  STATUS_INSUFFICIENT_RESOURCES = 0xc000009a,
  STATUS_MEDIA_WRITE_PROTECTED = 0xc00000a2,
  // STATUS_FILE_IS_A_DIRECTORY = 0xc00000ba,
  // STATUS_NOT_SUPPORTED = 0xc00000bb,
  STATUS_NETWORK_NAME_DELETED = 0xc00000c9,
  // STATUS_BAD_DEVICE_TYPE = 0xc00000cb,
  // STATUS_BAD_NETWORK_NAME = 0xc00000cc,
  // STATUS_TOO_MANY_SESSIONS = 0xc00000ce,
  // STATUS_REQUEST_NOT_ACCEPTED = 0xc00000d0,
  STATUS_DIRECTORY_NOT_EMPTY = 0xc0000101,
  // STATUS_NOT_A_DIRECTORY = 0xc0000103,
  STATUS_TOO_MANY_OPENED_FILES = 0xc000011f,
  STATUS_CANCELLED = 0xc0000120,
  STATUS_CANNOT_DELETE = 0xc0000121,
  STATUS_FILE_CLOSED = 0xc0000128,
  STATUS_LOGON_TYPE_NOT_GRANTED = 0xc000015b,
  STATUS_ACCOUNT_EXPIRED = 0xc0000193,
  STATUS_FS_DRIVER_REQUIRED = 0xc000019c,
  STATUS_USER_SESSION_DELETED = 0xc0000203,
  STATUS_INSUFF_SERVER_RESOURCES = 0xc0000205,
  STATUS_PASSWORD_MUST_CHANGE = 0xc0000224,
  STATUS_NOT_FOUND = 0xc0000225,
  STATUS_ACCOUNT_LOCKED_OUT = 0xc0000234,
  STATUS_PATH_NOT_COVERED = 0xc0000257,
  STATUS_NOT_A_REPARSE_POINT = 0xc0000275,

  // STATUS_INVALID_SMB = 0x00010002, // SMB1/CIFS: A corrupt or invalid SMB request was received
  // STATUS_SMB_BAD_COMMAND = 0x00160002, // SMB1/CIFS: An unknown SMB command code was received by the server
  // STATUS_SMB_BAD_FID = 0x00060001, // SMB1/CIFS
  // STATUS_SMB_BAD_TID = 0x00050002, // SMB1/CIFS
  STATUS_OS2_INVALID_ACCESS = 0x000c0001, // SMB1/CIFS
  STATUS_OS2_NO_MORE_SIDS = 0x00710001, // SMB1/CIFS
  // STATUS_OS2_INVALID_LEVEL = 0x007c0001, // SMB1/CIFS
}

function statusToString (status: NtStatus | number) {
  return Object.keys(NtStatus) [Object.values(NtStatus).indexOf(status)];
}

export default NtStatus;
export { statusToString };
