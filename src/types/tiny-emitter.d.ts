declare module 'tiny-emitter/instance' {
  declare class TinyEmitter {
    public on<E extends string, C = Record<string, any>>(
      event: E,
      callback: (args?: C) => void,
      ctx?: any
    ): this;

    public off<E extends string, C = Record<string, any>>(
      event: E,
      callback?: (args?: C) => void
    ): this;

    public once<E extends string, C = Record<string, any>>(
      event: E,
      callback: (args?: C) => void,
      ctx?: any
    ): this;

    public emit<E extends string, A = Record<string, any>>(event: E, arg?: A): this;
  }

  export default new TinyEmitter();
}
