import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { load as videoSearch } from 'www/reducers/youtube';
import {
  VideoList,
  SearchBar,
} from 'www/components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';

import { Loader } from 'www/components';

@connect(
  state => ({
    videos: state.videos,
  }),
  dispatch => bindActionCreators({ videoSearch }, dispatch)
)

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
  },
}])

export default class Youtube extends Component {
  static propTypes = {
    videos: PropTypes.object,
    videoSearch: PropTypes.function,
    store: PropTypes.any,
  };

  render() {
    const debounceSearch = debounce((term) => { this.props.videoSearch(term) }, 300);
    const {
      videos,
    } = this.props;

    return (
      <div>
        <h3>Youtube search component</h3>
        <SearchBar onSearchTermChange={debounceSearch} />
        {videos.loaded ?
          <VideoList videos={videos.items} />
        : <Loader />}
      </div>
    );
  }
}
