import { ComponentEventMap } from '@/types/events';
import { TinyEmitter } from 'tiny-emitter';
import { Vue } from 'vue-class-component';
export declare abstract class Component<T, P = Record<string, unknown>> extends Vue {
    $props: P;
    protected abstract createTarget<A extends never>(...args: A): T | Promise<T>;
    protected $$emitter: TinyEmitter<ComponentEventMap> | null;
    protected $$target: T | null;
    render(): never;
    get target(): T | null;
}
