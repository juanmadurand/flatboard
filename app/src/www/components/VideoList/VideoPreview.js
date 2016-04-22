import React, { Component, PropTypes } from 'react';

import { selectVideo } from 'www/reducers/youtube';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { autobind } from 'core-decorators';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';

const styles = require('./VideoList.scss');

@connect(
  null,
  dispatch => bindActionCreators({ selectVideo }, dispatch)
)
export default class VideoPreview extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    selectVideo: PropTypes.func.isRequired,
    grid: PropTypes.bool,
  };

  @autobind
  handleClick() {
    this.props.selectVideo(this.props.video);
  }

  @autobind
  renderTypeGrid() {
    const { snippet } = this.props.video;
    const {
      url,
      width,
      height,
    } = snippet.thumbnails.medium;
    return (
      <Col xs={6} md={4} className={styles.video_grid} onClick={this.handleClick}>
        <Thumbnail src={url} alt={`${width}x${height}`}>
          <h3>{snippet.title}</h3>
        </Thumbnail>
      </Col>
    );
  }

  @autobind
  renderTypeList() {
    const video = this.props.video;
    const snippet = video.snippet;
    return (
      <div className={styles.video_list}>
        <Row>
          <Col md={4}>
            <div className={styles.video_list_thumbnail}>
              <a onClick={this.handleClick} title={snippet.title}>
                <Image src={snippet.thumbnails.medium.url} />
              </a>
            </div>
          </Col>
          <Col md={8}>
            <div className={styles.video_list_content}>
              <h3>
                <a onClick={this.handleClick} title={snippet.title}>{snippet.title}</a>
              </h3>
              <p>{snippet.description}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  render() {
    return this.props.grid ? this.renderTypeGrid() : this.renderTypeList();
  }
}
