export type MouseEventMap = keyof Pick<GlobalEventHandlersEventMap,
'mouseup'
| 'mousedown'
| 'mousemove'
| 'click'
| 'dblclick'
| 'wheel'
>

export const POINTER_EVENTS: Array<MouseEventMap> = [
  'mouseup',
  'mousedown',
  'mousemove',
  'click',
  'dblclick',
  'wheel',
];
