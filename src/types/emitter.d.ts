declare module 'tiny-emitter' {
  declare class TinyEmitter<E extends string> {
    public on<C extends (...args: Array<any>) => void>(
      event: E,
      callback: C,
      ctx?: any
    ): this;

    public off<C extends (...args: Array<any>) => void>(
      event: E,
      callback?: C
    ): this;

    public once<C extends (...args: Array<any>) => void>(
      event: E,
      callback: C,
      ctx?: any
    ): this;

    public emit<A extends Array>(event: E, ...args: A): this;
  }

  export {
    TinyEmitter,
  };
}
