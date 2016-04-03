import Express from 'express';
import http from 'http';
import * as api from './api';
import * as www from './www';
import config from './config';

const app = new Express();

function listen(host, port) {
  return new Promise((resolve, reject) => {
    const server = new http.Server(app);
    server.listen(port, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.info(`==> ✅  Flatboard is running on http://${host}:${port}`);
      resolve();
    });
  });
}

(async () => {
  await api.init(app, '/api');
  await www.init(app);
  await listen(config.server.host, config.server.port);
})();
