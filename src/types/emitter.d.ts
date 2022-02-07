declare module 'tiny-emitter/instance' {
  declare function on<E extends string, C extends (...args: Array<any>) => void>(
    event: E,
    callback: C,
    ctx?: any
  ): this;

  declare function off<E extends string, C extends (...args: Array<any>) => void>(
    event: E,
    callback?: C
  ): this;

  declare function once<E extends string, C extends (...args: Array<any>) => void>(
    event: E,
    callback: C,
    ctx?: any
  ): this;

  declare function emit<E extends string, A extends Array>(event: E, ...args: A): this;

  export {
    on,
    off,
    once,
    emit,
  };
}
