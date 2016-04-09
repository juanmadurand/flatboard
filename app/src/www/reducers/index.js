import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import board from './board';
import youtube from './youtube';
import currency from './currency';
import xkcd from './xkcd';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  board,
  videos: youtube,
  currency,
  xkcd,
});
