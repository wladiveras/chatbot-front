import { MarkerType } from '@vue-flow/core'

export const initialNodes = [
  {
    id: '1',
    data: { label: 'Inicio' },
    position: { x: 0, y: 0 },
    class: 'custom-node init',
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 150, y: 100 },
    class: 'custom-node',
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 300, y: 200 },
    class: 'custom-node',
    type: 'output'
  }
]

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerEnd: MarkerType.ArrowClosed,
  }
]
