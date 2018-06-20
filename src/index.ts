import { EventEmitter } from 'events';
import { Machine } from 'fseh';
export { Handlers, StateTable } from 'fseh';

export class MachineX extends Machine implements EventEmitter {

  // Machine overrides
  enter(state: string, ...args:any[]):Promise<any> {
    if (this.state) {
      this.emit(`${this.state}:exit`, state, ...args);
      this.emit('exit', this.state, state, ...args);
    }
    this.emit(`${state}:pre-entry`, ...args);
    this.emit('pre-entry', state, ...args);
    return super.enter(state, ...args).then(data => {
      this.emit(`${state}:entry`, ...args);
      this.emit('entry', state, ...args);
      this.emit(state, ...args);
      return data;
    });
  }

  // EventEmitter interface
  addListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
  on: (event: string | symbol, listener: (...args: any[]) => void) => this;
  once: (event: string | symbol, listener: (...args: any[]) => void) => this;
  prependListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
  prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
  removeListener: (event: string | symbol, listener: (...args: any[]) => void) => this;
  off: (event: string | symbol, listener: (...args: any[]) => void) => this;
  removeAllListeners: (event?: string | symbol) => this;
  setMaxListeners: (n: number) => this;
  getMaxListeners: () => number;
  listeners: (event: string | symbol) => Function[];
  rawListeners: (event: string | symbol) => Function[];
  emit: (event: string | symbol, ...args: any[]) => boolean;
  eventNames: () => Array<string | symbol>;
  listenerCount: (type: string | symbol) => number;
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
applyMixins(MachineX, [EventEmitter]);
