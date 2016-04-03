import * as response from 'api/response';
import checkError from 'api/router/checkError';
import ProxyDao from 'api/dao/ProxyDao';

export default (proxyDao: ProxyDao) => {
  const router = require('express').Router();

  router.get('/', checkError(async (req, res) => {
    const result = await proxyDao.get(req.query.url);
    response.success(res, result);
  }));

  return router;
};
