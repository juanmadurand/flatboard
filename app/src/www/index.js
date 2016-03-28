import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './store';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';

import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from './routes';

export function init(app) {
  app.use(compression());
  app.use(favicon(path.join(__dirname, '../..', 'static', 'favicon.png')));

  // Set app/static for static assets (needed in prod)
  app.use(Express.static(path.join(__dirname, '../..', 'static')));

  app.get('/mock/api/c/starwars/:mockName', (req, res) => {
    res.send(require(`./mock/${req.params.mockName}.json`));
  });

  app.use((req, res) => {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }
    const client = new ApiClient(req);
    const history = createHistory(req.originalUrl);

    const store = createStore(history, client);

    function hydrateOnClient() {
      res.send(`<!doctype html>\n
        ${ReactDOM.renderToString(
          <Html
            assets={webpackIsomorphicTools.assets()}
            store={store}
          />)}`
        );
    }

    if (__DISABLE_SSR__) {
      hydrateOnClient();
      return;
    }

    match({ history, routes: getRoutes(store), location: req.originalUrl },
      (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.error(error);
          res.status(500);
          hydrateOnClient();
        } else if (renderProps) {
          loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
            const component = (
              <Provider store={store} key="provider">
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            );

            res.status(200);

            global.navigator = { userAgent: req.headers['user-agent'] };

            res.send(`<!doctype html>\n
              ${ReactDOM.renderToString(
                <Html
                  assets={webpackIsomorphicTools.assets()}
                  component={component}
                  store={store}
                />)}`
              );
          });
        } else {
          res.status(404).send('Not found');
        }
      });
  });

  return Promise.resolve();
}
