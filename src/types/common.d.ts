export type SmbShareConfig = {
  backend: string;
  name: string;
  description: string;
  events: string[];
  [key: string]: unknown;
}

export type SmbFsShareConfig = SmbShareConfig & {
  backend: 'FS';
  path: string;
}

export type SmbServerConfig = {
  domainName: string;
  shares: Record<string, SmbShareConfig>;
  [key: string]: unknown;
}

export type SmbUser = {
  lmHash: string;
  ntlmHash: string;
}

export type SmbAuthenticatorConfig = {
  users: Record<string, SmbUser>
}

export type SystemError = Error & {
  code: number,
  path: string
}

export type UUID = {
  timeLow: number,
  timeMid: number,
  timeHiAndVersion: number,
  clockSeqHiAndReserved: number,
  clockSeqLow: number,
  node: Buffer
}

export type Listener = {
  mid: string,
  path: string,
  deep: boolean
  completionFilter: number,
  cb: (action: number, name: string, newName?: string) => void,
  autoRefreshTimer?: NodeJS.Timeout
}

export type NTLMv2Object = {
  signature: Buffer,
  reserved: Buffer,
  timeStamp: Date,
  timeStampRaw: Buffer,
  nonce: Buffer,
  unknown: Buffer,
  unknown2: Buffer,
  unknownTrailer: Buffer,
  info: Record<number, Buffer>,
}
