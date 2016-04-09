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

import * as Containers from 'www/containers';

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
    board: state.board,
  }),
)
export default class Home extends Component {
  static propTypes = {
    board: PropTypes.object.isRequired,
    videos: PropTypes.object,
    xkcdTitle: PropTypes.string,
    store: PropTypes.object,
  };

  renderSection(panels) {
    return panels.map((panel) => {
      const Comp = Containers[panel.comp];
      return (
        <Panel title={panel.title} collapsible key={panel.comp}>
          <Comp />
        </Panel>
      );
    });
  }

  render() {
    const { board } = this.props;
    return (
      <div>
        <Helmet title={'Flatboard'} />
        <Grid fluid>
          <Row className="show-grid">
            <Col md={6}>
              {this.renderSection(board.left)}
            </Col>
            <Col md={6}>
              {this.renderSection(board.right)}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
