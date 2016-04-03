import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import * as youtubeActions from 'www/reducers/youtube';
import * as currencyActions from 'www/reducers/currency';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { Panel } from 'www/components';
import {
  Youtube,
  Currency,
  Xkcd,
} from 'www/containers';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!youtubeActions.isLoaded(getState())) {
      promises.push(dispatch((youtubeActions.load('muse'))));
    }
    if (!currencyActions.isCurrenciesLoaded(getState())) {
      promises.push(dispatch(currencyActions.loadCurrencies()));
    }
    if (!currencyActions.isValuesLoaded(getState())) {
      promises.push(dispatch(currencyActions.loadValues()));
    }

    return Promise.all(promises);
  },
}])
@connect(
  state => ({
    videos: state.videos,
    xkcdTitle: state.xkcd.loaded ? state.xkcd.title : '',
  }),
)
export default class Home extends Component {
  static propTypes = {
    videos: PropTypes.object,
    xkcdTitle: PropTypes.string,
    store: PropTypes.object,
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
              <Panel title="Currency Exchange" collapsible>
                <Currency />
              </Panel>
              <Row>
                <Col md={6}>
                  <Panel title={`Xkcd: ${this.props.xkcdTitle}`} collapsible>
                    <Xkcd />
                  </Panel>
                </Col>
              </Row>
            </Col>
            <Col xsHidden smHidden md={2} />
          </Row>
        </Grid>
      </div>
    );
  }
}
