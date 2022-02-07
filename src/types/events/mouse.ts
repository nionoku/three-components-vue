export type MouseEventMap = keyof Pick<GlobalEventHandlersEventMap,
'mouseup'
| 'mousedown'
| 'mousemove'
| 'click'
| 'dblclick'
| 'wheel'
>

export const DEFAULT_POINTER_EVENTS_KEYS: Array<MouseEventMap> = [
  'mouseup',
  'mousedown',
  'mousemove',
  'click',
  'dblclick',
  'wheel',
];
