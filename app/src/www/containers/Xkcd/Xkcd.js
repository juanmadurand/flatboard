import React, { Component, PropTypes } from 'react';
import * as XkcdActions from 'www/reducers/xkcd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';

import { Loader } from 'www/components';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';

const styles = require('./Xkcd.scss');

@connect(
  state => ({
    comic: state.xkcd,
  }),
  dispatch => bindActionCreators(XkcdActions, dispatch)
)

export default class Youtube extends Component {
  static propTypes = {
    comic: PropTypes.object,
    id: PropTypes.number,
    getLast: PropTypes.func.isRequired,
    getById: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPrev: false,
    };
  }

  componentDidMount() {
    if (this.props.comic.loaded) {
      return;
    }
    if (this.props.id) {
      this.props.getById(this.props.id);
    }
    this.props.getLast();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.comic.loaded && nextProps.comic.loaded) {
      // Initial render
      this.setState({initialId: nextProps.comic.num});
    } else {
      this.setState({
        showPrev: nextProps.comic.loaded && nextProps.comic.num !== this.state.initialId,
      });
    }
  }

  @autobind
  prevComic() {
    this.props.getById(this.props.comic.num + 1);
  }

  @autobind
  nextComic() {
    this.props.getById(this.props.comic.num - 1);
  }

  render() {
    const { comic } = this.props;
    return (
      <div className={styles.xkcd}>
        <div className={styles.xkcd_image}>
          {comic.loading ? <Loader /> :
            <a href={comic.img} target="_blank">
              <Image src={comic.img} className={styles.xkcd_image_i} />
            </a>
          }
        </div>
        <div className={styles.xkcd_pagination}>
          <Button
            bsStyle="primary"
            onClick={this.prevComic}
            disabled={!this.state.showPrev}
            className={styles.xkcd_btn}
          >Prev</Button>
          <Button
            bsStyle="primary"
            onClick={this.nextComic}
            className={`${styles.xkcd_btn} pull-right`}
          >Next</Button>
        </div>
      </div>
    );
  }
}
