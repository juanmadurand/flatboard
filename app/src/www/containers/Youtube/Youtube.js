import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { isLoaded, load as videoSearch } from 'www/reducers/youtube';
import { autobind } from 'core-decorators';

import Button from 'react-bootstrap/lib/Button';

import {
  VideoList,
  SearchBar,
} from 'www/components';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';

import { Loader } from 'www/components';

const styles = require('./Youtube.scss');

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    console.log('onAsyncConnect', this);
    if (!isLoaded(getState())) {
      return dispatch(videoSearch('muse'));
    }
    return null;
  },
}])

@connect(
  state => ({
    videos: state.videos,
  }),
  dispatch => bindActionCreators({ videoSearch }, dispatch)
)

export default class Youtube extends Component {
  static propTypes = {
    videos: PropTypes.object,
    videoSearch: PropTypes.func.isRequired,
    initialSearch: PropTypes.string,
    store: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = { listMode: true };
  }

  @autobind
  toggleViewMode() {
    this.setState({listMode: !this.state.listMode});
  }

  render() {
    const debounceSearch = debounce((term) => { this.props.videoSearch(term) }, 300);
    const {
      videos,
    } = this.props;

    if (!this.state) {
      return <div></div>;
    }

    return (
      <div>
        <div className={styles.yt_header}>
          <h3 className="pull-left">
            <i className="fa fa-youtube" />
             Search
          </h3>
          <div className="pull-right">
            <Button bsStyle="default" onClick={this.toggleViewMode}>
              {this.state.listMode ?
                <i className="fa fa-th-list" /> :
                <i className="fa fa-th-large" />
              }
            </Button>
          </div>
        </div>
        <SearchBar onSearchTermChange={debounceSearch} />
        {videos.loaded ?
          <VideoList videos={videos.items} list={this.state.listMode} />
        : <Loader />}
      </div>
    );
  }
}
