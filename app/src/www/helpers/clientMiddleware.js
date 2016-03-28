import { normalize } from 'normalizr';

function normalizeOutput(result, schema) {
  if (schema) {
    return normalize(result, schema);
  }
  return result;
}

export default function clientMiddleware(client) {
  return ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    // TODO: eslint-disable-line no-use-before-define
    const { promise, types, schema, ...rest } = action; // eslint-disable-line no-use-before-define
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});

    const actionPromise = promise(client);
    actionPromise.then(
      (response) => {
        const result = normalizeOutput(response, schema);
        next({...rest, result, type: SUCCESS});
      },
      (error) => next({...rest, error, type: FAILURE})
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({...rest, error, type: FAILURE});
    });

    return actionPromise;
  };
}
