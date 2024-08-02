import { MarkerType } from '@vue-flow/core'

export const initialNodes = [
  {
    id: '1',
    type: 'init',
    position: { x: 0, y: 0 },
    class: 'custom-node init',
  },
  {
    id: '2',
    type: 'content',
    position: { x: 500, y: 200 },
    class: 'custom-node content',
  },
  {
    id: '3',
    type: 'content',
    position: { x: 1000, y: 400 },
    class: 'custom-node content',
  }
]

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: false,
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: false,
    markerEnd: MarkerType.ArrowClosed,
  }
]
