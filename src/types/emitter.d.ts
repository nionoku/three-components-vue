declare module 'tiny-emitter' {
  export declare class TinyEmitter {
    on<E extends string, C extends (...args: Array<any>) => void>(
      event: E,
      callback: C,
      ctx?: any
    ): this;

    off<E extends string, C extends (...args: Array<any>) => void>(
      event: E,
      callback?: C
    ): this;

    once<E extends string, C extends (...args: Array<any>) => void>(
      event: E,
      callback: C,
      ctx?: any
    ): this;

    emit<E extends string, A extends Array>(event: E, ...args: A): this;
  }
}
