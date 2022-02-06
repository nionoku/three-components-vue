export type MouseEventMap = keyof Pick<GlobalEventHandlersEventMap,
'mouseup'
| 'mousedown'
| 'mouseenter'
| 'mouseleave'
| 'mousemove'
| 'mouseout'
| 'mouseover'
| 'click'
| 'dblclick'
| 'wheel'
>

export const DEFAULT_POINTER_EVENTS_KEYS: Array<MouseEventMap> = [
  'mouseup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'click',
  'dblclick',
  'wheel',
];
