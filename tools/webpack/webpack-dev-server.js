var Express = require('express');
var webpack = require('webpack');

Object.assign(global, require('../../app/src/globals'));
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);

var serverOptions = {
  contentBase: webpackConfig.baseUrl,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
};

var app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(webpackConfig.port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', webpackConfig.port);
  }
});
