import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import youtube from './youtube';
import currency from './currency';
import xkcd from './xkcd';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  videos: youtube,
  currency,
  xkcd,
});
