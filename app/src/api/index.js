import * as router from 'api/router';

export function init(app, root: string) {
  return router.init()
    .then(expressRouter => app.use(root, expressRouter));
}
