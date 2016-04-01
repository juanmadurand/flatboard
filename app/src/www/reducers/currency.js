export const K_LOAD = 'currency/key/LOAD';
export const K_LOAD_SUCCESS = 'currency/key/LOAD_SUCCESS';
export const K_LOAD_FAIL = 'currency/key/LOAD_FAIL';
export const V_LOAD = 'currency/values/LOAD';
export const V_LOAD_SUCCESS = 'currency/values/LOAD_SUCCESS';
export const V_LOAD_FAIL = 'currency/values/LOAD_FAIL';

export function loadCurrencies() {
  return {
    types: [K_LOAD, K_LOAD_SUCCESS, K_LOAD_FAIL],
    promise: (client) => client.get('/api/currency/list'),
  };
}

export function loadValues() {
  return {
    types: [V_LOAD, V_LOAD_SUCCESS, V_LOAD_FAIL],
    promise: (client) => client.get('/api/currency/all'),
  };
}

const initialState = {
  values: [],
  currencies: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case V_LOAD:
    case K_LOAD:
      return {
        ...state,
        loading: true,
      };
    case K_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currencies: action.result,
      };
    case V_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        values: action.result,
      };
    case V_LOAD_FAIL:
    case K_LOAD_FAIL:
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

export function isCurrenciesLoaded(globalState) {
  return globalState.currencies && globalState.currencies.length > 0;
}

export function isValuesLoaded(globalState) {
  return globalState.values && globalState.values.length > 0;
}
