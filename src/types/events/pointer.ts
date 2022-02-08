export type PointerEventMap = Pick<GlobalEventHandlersEventMap,
'mouseup'
| 'mousedown'
| 'mousemove'
| 'click'
| 'dblclick'
| 'wheel'
>

export const POINTER_EVENTS: Array<keyof PointerEventMap> = [
  'mouseup',
  'mousedown',
  'mousemove',
  'click',
  'dblclick',
  'wheel',
];
