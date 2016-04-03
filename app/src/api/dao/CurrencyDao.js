import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import { BadRequest } from 'api/errors';

const API_URL = 'http://www.apilayer.net/api';

export default class CurrencyDao {
  constructor(secret) {
    if (secret === null) {
      console.warn('Secrets for CurrencyLayer not found!');
    }
    this.secret = secret;
  }
  async values(opts: Object = {}) {
    if (!this.secret) {
      return {};
    }
    if (opts.source && opts.source !== 'usd') {
      throw new BadRequest('Only USD source is allowed on free plan.');
    }
    return this.call('live', opts)
    .then((res) => (res.quotes));
  }

  async list() {
    if (!this.secret) {
      return {};
    }
    return this.call('list').then((res) => (res.currencies));
  }

  call(endpoint: string, query: Object = {}) {
    return superagent.get(`${API_URL}/${endpoint}`)
    .query({
      ...query,
      access_key: this.secret,
      format: 1,
    })
    .use(superagentPromisePlugin)
    .then((res) => (res.body))
    .catch((err) => {
      throw new Error(`Currency request failed: ${err.message}`);
    });
  }
}
