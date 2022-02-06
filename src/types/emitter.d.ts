declare module 'tiny-emitter/instance' {
  declare class TinyEmitter {
    private constructor()

    static on<E extends string, C extends (...args: Array<any>) => void>(
      event: E,
      callback: C,
      ctx?: any
    ): this;

    static off<E extends string, C extends (...args: Array<any>) => void>(
      event: E,
      callback?: C
    ): this;

    static once<E extends string, C extends (...args: Array<any>) => void>(
      event: E,
      callback: C,
      ctx?: any
    ): this;

    static emit<E extends string, A extends Array>(event: E, ...args: A): this;
  }

  export default TinyEmitter
}
