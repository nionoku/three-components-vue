import { IntersectionEventHandler, IntersectionGlobalEventHandler } from '@/types/events/intersection';

export interface SupportsPointerEvents<
    V = IntersectionEventHandler,
    VG = IntersectionGlobalEventHandler
> {
  whenClick: V
  whenMouseMove: V
  whenMouseUp: V
  whenMouseDown: V
  whenDblClick: V
  whenWheel: V
  // listen all pointer actions on canvas
  whenClickGlobal: VG
  whenMouseMoveGlobal: VG
  whenMouseUpGlobal: VG
  whenMouseDownGlobal: VG
  whenDblClickGlobal: VG
  whenWheelGlobal: VG
}
