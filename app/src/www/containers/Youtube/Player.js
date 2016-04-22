import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { Loader } from 'www/components';

const styles = require('./Player.scss');

@connect(
  state => ({
    video: state.videos.selected,
  }),
)

export default class Youtube extends Component {
  static propTypes = {
    video: PropTypes.object,
  };

  render() {
    const video = this.props.video;
    if (!video) {
      return <Loader />;
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div className={styles.video}>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={url}></iframe>
        </div>
        <div className={styles.video_detail}>
          <div className={styles.video_detail_title}>{video.snippet.title}</div>
          <div className={styles.video_detail_description}>{video.snippet.description}</div>
        </div>
      </div>
    );
  }
}
