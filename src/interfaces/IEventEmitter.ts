interface IEventEmitter {
  on (eventName: string, listener: () => void): void;
  notifyChangeListeners (id: number, data: string): void;
}

export default IEventEmitter;