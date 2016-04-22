import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';

import logger from 'www/helpers/logger';

import VideoPreview from './VideoPreview';

export default class VideoList extends Component {
  static propTypes = {
    videos: PropTypes.array,
    list: PropTypes.bool,
  };

  render() {
    const {
      videos,
      list,
    } = this.props;
    if (!videos) {
      logger.error(`Failed to load ${this.constructor.name}`);
      return (<div />);
    }

    if (list) {
      return (
        <div>
          {videos.map((video) => (<VideoPreview video={video} key={video.id.videoId} list />))}
        </div>
      );
    }

    return (
      <Row>
        {videos.map((video) => (<VideoPreview video={video} key={video.id.videoId} grid />))}
      </Row>
    );
  }
}
