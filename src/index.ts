import { EventEmitter } from 'events';
import { Machine } from 'fseh';

export class MachineX extends Machine implements EventEmitter {

  // Machine overrides
  enter(state: string): void {
    if (this.state) {
      this.emit(`${this.state}:exit`);
      this.emit('exit', this.state);
    }
    this.emit(`${state}:pre-entry`);
    this.emit('pre-entry', state);
    super.enter(state);
    this.emit(`${state}:entry`);
    this.emit('entry', state);
    this.emit(state);
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
