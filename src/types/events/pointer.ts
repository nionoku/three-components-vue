export type PointerEvents = Pick<GlobalEventHandlersEventMap,
'mouseup'
| 'mousedown'
| 'mousemove'
| 'click'
| 'dblclick'
| 'wheel'
>

export const POINTER_EVENTS: Array<keyof PointerEvents> = [
  'mouseup',
  'mousedown',
  'mousemove',
  'click',
  'dblclick',
  'wheel',
];
