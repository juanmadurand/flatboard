import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import youtube from './youtube';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  videos: youtube,
});
