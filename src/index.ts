import { EventEmitter } from 'events';
import { Machine } from 'fseh';

export class MachineX extends Machine implements EventEmitter {

  // Machine overrides
  enter(state: string, ...args:any[]): void {
    if (this.state) {
      this.emit(`${this.state}:exit`, state, ...args);
      this.emit('exit', this.state, state, ...args);
    }
    this.emit(`${state}:pre-entry`, ...args);
    this.emit('pre-entry', state, ...args);
    super.enter(state, ...args);
    this.emit(`${state}:entry`, ...args);
    this.emit('entry', state, ...args);
    this.emit(state, ...args);
  }

  // EventEmitter interface
  addListener: (event: string | symbol, listener: Function) => this;
  on: (event: string | symbol, listener: Function) => this;
  once: (event: string | symbol, listener: Function) => this;
  prependListener: (event: string | symbol, listener: Function) => this;
  prependOnceListener: (event: string | symbol, listener: Function) => this;
  removeListener: (event: string | symbol, listener: Function) => this;
  removeAllListeners: (event?: string | symbol) => this;
  setMaxListeners: (n: number) => this;
  getMaxListeners: () => number;
  listeners: (event: string | symbol) => Function[];
  emit: (event: string | symbol, ...args: any[]) => boolean;
  eventNames: () => (string | symbol)[];
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
