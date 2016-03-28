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
    const res = await this.search(term, 'video');
    return res.body;
  }

  async search(term: string) {
    const results = await this.call('search', {
      part: 'snippet',
      q: term,
      type: 'video',
      videoCaption: 'closedCaption',
    });
    return results;
  }

  async call(endpoint: string, query: Object) {
    try {
      return await superagent.get(`${API_URL}/${endpoint}`)
      .query(query)
      .query({key: config.secrets.youtube.apiKey})
      .use(superagentPromisePlugin)
      .end();
    } catch (e) {
      throw new Error(`Youtube request failed: ${e.message}`);
    }
  }
}
