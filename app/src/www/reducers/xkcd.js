export const LOAD = 'xkcd/LOAD';
export const LOAD_SUCCESS = 'xkcd/LOAD_SUCCESS';
export const LOAD_FAIL = 'xkcd/LOAD_FAIL';

export function getLast() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/proxy', { params: {
      url: 'http://xkcd.com/info.0.json',
    }}),
  };
}

export function getById(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/proxy', { params: {
      url: `http://xkcd.com/${id}/info.0.json`,
    }}),
  };
}

const initialState = {
  loaded: false,
};

export default function xkcd(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
