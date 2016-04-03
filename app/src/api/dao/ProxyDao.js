import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';

export default class ProxyDao {
  get(url: string, query: Object = {}) {
    return superagent.get(url)
    .query({...query})
    .use(superagentPromisePlugin)
    .then((res) => (res.body))
    .catch((err) => {
      throw new Error(`Request failed: ${err.message}`);
    });
  }
}
