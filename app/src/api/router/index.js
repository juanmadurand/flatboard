import osprey from 'osprey';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as response from 'api/response';
import {ImATeapot} from 'api/errors';
import YoutubeDao from 'api/dao/YoutubeDao';

export function init() {
  const ytDao = new YoutubeDao();

  const router = express.Router()
    .use(cookieParser());

  return require('raml-parser')
    .loadFile(`${__dirname}/../raml/api.raml`)
    .then(raml => {
      router.use(osprey.server(raml));

      router.use('/youtube', require('./youtube')(ytDao));

      // https://www.ietf.org/rfc/rfc2324.txt
      router.get('/brew/coffee', (req, res) => response.error(res, new ImATeapot()));

      router.use((err, req, res, next) => response.error(res, err));

      return router;
    });
}
