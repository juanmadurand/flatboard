import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import logger from 'www/helpers/logger';

const styles = require('./VideoList.scss');
const videoUrlTemplate = 'https://www.youtube.com/watch?v=';

export default class VideoList extends Component {
  static propTypes = {
    videos: PropTypes.array,
    list: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.renderVideoList = this.renderVideoList.bind(this);
  }

  renderVideoList(video) {
    const snippet = video.snippet;
    const videoUrl = `${videoUrlTemplate}${video.id.videoId}`;
    return (
      <div className={styles.video_list} key={video.id.videoId}>
        <Row>
          <Col md={4}>
            <div className={styles.video_list_thumbnail}>
              <a href={videoUrl} title={snippet.title}>
                <Image src={snippet.thumbnails.medium.url} />
              </a>
            </div>
          </Col>
          <Col md={8}>
            <div className={styles.video_list_content}>
              <h3>
                <a href={videoUrl} title={snippet.title}>{snippet.title}</a>
              </h3>
              <p>{snippet.description}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  renderVideoGrid(video) {
    const snippet = video.snippet;
    const {
      url,
      width,
      height,
    } = snippet.thumbnails.medium;

    return (
      <Col xs={6} md={4} className={styles.video_grid} key={video.id.videoId}>
        <Thumbnail src={url} alt={`${width}x${height}`}>
          <h3>{snippet.title}</h3>
        </Thumbnail>
      </Col>
    );
  }

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
          {videos.map(this.renderVideoList)}
        </div>
      );
    }

    return (
      <Row>
        {videos.map(this.renderVideoGrid)}
      </Row>
    );
  }
}
