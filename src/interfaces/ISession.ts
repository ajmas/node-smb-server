import SMBError from "../smberror.js";

interface ISession {
  logoff(callback?: (error: Error | SMBError) => void): void;
}

export default ISession;