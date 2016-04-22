export const K_LOAD = 'currency/key/LOAD';
export const K_LOAD_SUCCESS = 'currency/key/LOAD_SUCCESS';
export const K_LOAD_FAIL = 'currency/key/LOAD_FAIL';
export const V_LOAD = 'currency/values/LOAD';
export const V_LOAD_SUCCESS = 'currency/values/LOAD_SUCCESS';
export const V_LOAD_FAIL = 'currency/values/LOAD_FAIL';
export const CHANGE_VALUE = 'currency/input/CHANGE_VALUE';
export const CHANGE_FIELD = 'currency/input/CHANGE_FIELD';
export const ADD_FIELD = 'currency/input/ADD_FIELD';

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
  values: {},
  currencies: {},
  nominal: 1,
  fields: ['USD', 'GBP'],
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
    case CHANGE_VALUE:
      return {
        ...state,
        nominal: action.value,
      };
    case CHANGE_FIELD: {
      const idx = action.idxPrevField;
      return {
        ...state,
        fields: state.fields
          .slice(0, idx)
          .concat(action.nextField)
          .concat(state.fields.slice(idx + 1)),
      };
    }
    case ADD_FIELD: {
      const nonAddedCurrencies = Object.keys(state.currencies)
        .filter((key) => (!state.fields.includes(key)));
      return {
        ...state,
        fields: [...state.fields, nonAddedCurrencies[0]],
      };
    }
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

export function setNominalValue(value) {
  return {
    type: CHANGE_VALUE,
    value,
  };
}

export function changeField(idxPrevField, nextField) {
  return {
    type: CHANGE_FIELD,
    idxPrevField,
    nextField,
  };
}

export function addField() {
  return {
    type: ADD_FIELD,
  };
}
