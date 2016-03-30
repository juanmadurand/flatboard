require('babel/polyfill');

try {
  require.resolve('./secrets');
} catch (e) {
  console.error(
`secrets.js not found.

This file contains secrets and credentials that cannot be
stored in source code management, so you must create it.

Use the provided file secrets-sample.js, and fill it with
the real credentials.
`);
  process.exit(1);
}

module.exports = {
  server: {
    port: process.env.FLATBOARD_PORT || 3000,
  },
  app: {
    head: {
      meta: [
        { name: 'description', content: 'All the modern best practices in one example.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Flatboard!' },
      ],
    },
  },
  secrets: require('./secrets'),
};
