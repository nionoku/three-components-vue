import { IntersectionEventHandler, IntersectionGlobalEventHandler } from '@/types/events/intersection';
export interface SupportsPointerEvents<V = IntersectionEventHandler, VG = IntersectionGlobalEventHandler> {
    whenClick: V;
    whenMouseMove: V;
    whenMouseUp: V;
    whenMouseDown: V;
    whenDblClick: V;
    whenWheel: V;
    whenClickGlobal: VG;
    whenMouseMoveGlobal: VG;
    whenMouseUpGlobal: VG;
    whenMouseDownGlobal: VG;
    whenDblClickGlobal: VG;
    whenWheelGlobal: VG;
}
