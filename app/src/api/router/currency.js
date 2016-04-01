import * as response from 'api/response';
import checkError from 'api/router/checkError';
import CurrencyDao from 'api/dao/CurrencyDao';

export default (cyDao: CurrencyDao) => {
  const router = require('express').Router();

  router.get('/all', checkError(async (req, res) => {
    response.success(res, await cyDao.values(req.query));
  }));

  router.get('/get/:source/:dest', checkError(async (req, res) => {
    response.success(res, await cyDao.values({
      source: req.params.source,
      currencies: req.params.dest,
    }));
  }));

  router.get('/list', checkError(async (req, res) => {
    response.success(res, await cyDao.list());
  }));

  return router;
};
