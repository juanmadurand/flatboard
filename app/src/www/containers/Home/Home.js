import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { isLoaded, load as videoSearch } from 'www/reducers/youtube';
import { asyncConnect } from 'redux-async-connect';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { Panel } from 'www/components';
import { Youtube } from 'www/containers';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
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
)
export default class Home extends Component {
  static propTypes = {
    videos: PropTypes.object,
  };
  render() {
    return (
      <div>
        <Helmet title={'Flatboard'} />
        <Grid>
          <Row className="show-grid">
            <Col xsHidden smHidden md={2} />
            <Col sm={12} md={8}>
              <Panel title="Youtube search" collapsible>
                <Youtube initialVideos={this.props.videos} />
              </Panel>
            </Col>
            <Col xsHidden smHidden md={2} />
          </Row>
        </Grid>
      </div>
    );
  }
}
