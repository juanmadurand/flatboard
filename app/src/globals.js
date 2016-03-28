module.exports = {
  __CLIENT__: false,
  __DISABLE_SSR__: false,  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
  __DEVELOPMENT__: process.env.NODE_ENV !== 'production',
  __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
};
