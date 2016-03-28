import * as response from 'api/response';
import checkError from 'api/router/checkError';
import YoutubeDao from 'api/dao/YoutubeDao';

export default (ytDao: YoutubeDao) => {
  const router = require('express').Router();

  router.get('/search/:term', checkError(async (req, res) => {
    const videos = await ytDao.searchVideos(req.params.term);
    response.success(res, videos);
  }));

  return router;
};
