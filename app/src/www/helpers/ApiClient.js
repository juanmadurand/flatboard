import superagent from 'superagent';
import url from 'url';
import config from '../../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function apiUrl(path) {
  const baseUri = __CLIENT__ ? '/' : `http://localhost:${config.server.port}/`;
  return url.resolve(baseUri, path);
}

/*
 * This silly underscore is here to avoid a mysterious
 * "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](apiUrl(path));

        if (params) {
          request.query(params);
        }

        if (!__CLIENT__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        });
      });
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
