import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import config from 'config';

const API_URL = 'https://www.googleapis.com/youtube/v3';

export default class YoutubeDao {
  constructor() {
    this.options = {
      videoDefinition: 'high',
      videoEmbeddable: 'true',
      order: 'rating',
    };
  }

  async searchVideos(term: string) {
    return this.search(term, 'video');
  }

  async search(term: string, type: string) {
    return this.call('search', {
      part: 'snippet',
      q: term,
      type,
      videoCaption: 'closedCaption',
    });
  }

  call(endpoint: string, query: Object) {
    return superagent.get(`${API_URL}/${endpoint}`)
    .query(query)
    .query({key: config.secrets.youtube.apiKey})
    .use(superagentPromisePlugin)
    .then((res) => (res.body))
    .catch((err) => {
      throw new Error(`Youtube request failed: ${err.message}`);
    });
  }
}
