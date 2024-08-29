import { MarkerType } from '@vue-flow/core'

export const initialFlow = {
  name: "Nova automação",
  description: "Descrição do automação"
}

export const initialNodes = [
  {
    id: '1',
    type: 'init',
    position: { x: 0, y: 0 },
    data: {
      commands: []
    },
    class: 'custom-node init',
  },
  {
    id: '2',
    type: 'content',
    position: { x: 500, y: 200 },
    data: {
      commands: []
    },
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
  }
]
