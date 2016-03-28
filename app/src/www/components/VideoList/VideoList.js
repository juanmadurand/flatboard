import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import logger from 'www/helpers/logger';

const styles = require('./VideoList.scss');

export default class VideoList extends Component {
  static propTypes = {
    videos: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.renderVideoList = this.renderVideoList.bind(this);
  }

  renderVideoList(video) {
    return (
      <div className={styles.video_list} key={video.id.videoId}>
        <Row>
          <Col md={12}>
            {video.snippet.title}
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { videos } = this.props;
    if (!videos) {
      logger.error(`Failed to load ${this.constructor.name}`);
      return (<div />);
    }
    return (
      <div>
        {videos.map(this.renderVideoList)}
      </div>
    );
  }
}
