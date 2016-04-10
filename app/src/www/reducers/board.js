import update from 'react-addons-update';

export const LEFT_ZONE = 'board/LEFT_ZONE';
export const RIGHT_ZONE = 'board/RIGHT_ZONE';
export const MOVE = 'board/MOVE';
export const DRAG = 'board/DRAG';

const initialState = [
  {
    id: 'Youtube',
    title: 'Youtube search!',
    zone: LEFT_ZONE,
  },
  {
    id: 'Xkcd',
    title: 'Xkcd for everyone',
    zone: RIGHT_ZONE,
  },
  {
    id: 'Currency',
    title: 'Currency Converter',
    zone: RIGHT_ZONE,
  },
];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MOVE: {
      const componentIdx = state.findIndex((obj) => (
        obj.id === action.component
      ));
      return update(state, {
        [componentIdx]: {
          zone: { $set: action.zone },
          dragging: { $set: false },
        },
      });
    }
    case DRAG: {
      const componentIdx = state.findIndex((obj) => (
        obj.id === action.component
      ));
      return update(state, {
        [componentIdx]: {
          dragging: { $set: true },
        },
      });
    }
    default:
      return state;
  }
}

export function move(component, zone) {
  return {
    type: MOVE,
    zone,
    component,
  };
}

export function beginDrag(component) {
  return {
    type: DRAG,
    component,
  };
}
