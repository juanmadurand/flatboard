import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import { asyncConnect } from 'redux-async-connect';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Zone } from 'www/components';

import * as youtubeActions from 'www/reducers/youtube';
import * as currencyActions from 'www/reducers/currency';
import * as boardActions from 'www/reducers/board';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

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

@dragDropContext(HTML5Backend)
export default class Home extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  render() {
    return (
      <div>
        <Helmet title={'Flatboard'} />
        <Grid fluid>
          <Row className="show-grid">
            <Col md={8}>
              <Zone zone={boardActions.LEFT_ZONE} />
            </Col>
            <Col md={4}>
              <Zone zone={boardActions.RIGHT_ZONE} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
