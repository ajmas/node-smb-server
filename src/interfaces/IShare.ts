import SMBError from '../smberror.js';
import { SmbShareConfig } from '../types/common.js';
import IEventEmitter from './IEventEmitter.js';
import ISession from './ISession.js';
import ITree from './ITree.js';

interface IShare extends IEventEmitter{
  config: SmbShareConfig;
  name: string;
  description: string;
  path: string;

  getName(): string;
  getEvents(): string[];
  isNamedPipe(): boolean;
  connect(session: ISession, shareLevelPassword: string, callback: (smbError?: SMBError | null, smbTree?: ITree) => void): void;
}

export default IShare;