import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import config from 'config';
import { APIError } from 'api/errors';
import * as HttpStatus from 'http-status-codes';

const API_URL = 'http://www.apilayer.net/api';

export default class CurrencyDao {
  async values(opts: Object = {}) {
    if (opts.source && opts.source !== 'usd') {
      throw new APIError(HttpStatus.BAD_REQUEST, 'Only USD source is allowed on free plan.');
    }
    return this.call('live', opts)
    .then((res) => (res.quotes));
  }

  async list() {
    return this.call('list').then((res) => (res.currencies));
  }

  call(endpoint: string, query: Object = {}) {
    return superagent.get(`${API_URL}/${endpoint}`)
    .query({
      ...query,
      access_key: config.secrets.currency.apiKey,
      format: 1,
    })
    .use(superagentPromisePlugin)
    .then((res) => (res.body))
    .catch((err) => {
      throw new Error(`Currency request failed: ${err.message}`);
    });
  }
}
