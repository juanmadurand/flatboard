export const LOAD = 'youtube/LOAD';
export const LOAD_SUCCESS = 'youtube/LOAD_SUCCESS';
export const LOAD_FAIL = 'youtube/LOAD_FAIL';

export function load(term = 'muse') {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/youtube/search/${term}`),
  };
}

const initialState = {
  loaded: false,
};

export default function youtube(state = initialState, action = {}) {
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
        items: action.result.items,
        error: null,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.videos && globalState.videos.loaded;
}
