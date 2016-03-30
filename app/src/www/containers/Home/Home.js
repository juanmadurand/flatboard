import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { Panel } from 'www/components';
import { Youtube } from 'www/containers';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title={'Flatboard'} />
        <Grid>
          <Row className="show-grid">
            <Col xsHidden smHidden md={2} />
            <Col sm={12} md={8}>
               <Panel title="Youtube search" collapsible>
                 <Youtube initialSearch="muse" />
               </Panel>
            </Col>
            <Col xsHidden smHidden md={2} />
          </Row>
        </Grid>
      </div>
    );
  }
}
