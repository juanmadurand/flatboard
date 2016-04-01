import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Col from 'react-bootstrap/lib/Col';

const styles = require('./App.scss');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return (
      <div>
        <Helmet
          title="Flatboard"
          titleTemplate="Flatboard - %s"
          meta={[
              {name: 'viewport', content: 'width=device-width, initial-scale=1'},
              {name: 'x-ua-compatible', content: 'ie=edge'},
          ]}
          link={[
              {rel: 'shortcut icon', href: '/favicon.png'},
          ]}
        />
        <Navbar fixedTop>
          <Col xs={4} md={2}>
            <IndexLink to="/" className={styles.brand}>
              <i className="fa fa-road fa-3x" />
            </IndexLink>
          </Col>
        </Navbar>


        <div className={`cf ${styles.appContent}`}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
