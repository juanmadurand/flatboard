import React, { Component } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Well from 'react-bootstrap/lib/Well';

export default class Loader extends Component {
  render() {
    return (
      <Well bsClass="text-center well">
        <Glyphicon glyph="refresh" bsClass="glyphicon fa-spin" />
      </Well>
    );
  }
}
