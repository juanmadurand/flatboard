import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

const styles = require('./Panel.scss');

export default class Panel extends Component {
  static propTypes = {
    title: PropTypes.string,
    actionBtn: PropTypes.object,
    children: PropTypes.object,
    collapsible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.renderHeaderAction = this.renderHeaderAction.bind(this);
  }

  toggleCollapse() {
    this.setState({collapsed: !this.state.collapsed});
  }

  renderHeaderAction() {
    if (this.props.collapsible) {
      const chevronIcon = this.state.collapsed ? 'fa-chevron-right' : 'fa-chevron-down';
      return (
        <Button
          className={styles.panel_icon_collapse} bsStyle="primary"
          onClick={this.toggleCollapse} bsSize="xsmall"
        >
          <i className={`fa ${chevronIcon}`} />
        </Button>
      );
    }
    const actionBtn = this.props.actionBtn;
    return (
      <div className={styles.panel_heading_action_btn} onClick={actionBtn.action}>
        <Glyphicon
          glyph="circle-arrow-right"
          className={styles.panel_heading_action_btn_icon}
        />
        {actionBtn.title}
      </div>
    );
  }

  render() {
    const {
      title,
      children,
      collapsible,
    } = this.props;

    const headingProps = {
      className: classNames({
        'panel-heading': true,
        [styles.panel_heading]: true,
      }),
      onClick: collapsible ? this.toggleCollapse : null,
      style: {cursor: 'pointer'},
    };

    return (
      <div className={classNames('panel panel-primary', styles.panel_wrapper)}>
        <div {...headingProps}>
          <h3 className={classNames('panel-title', styles.panel_title)}>{title}</h3>
          { this.renderHeaderAction() }
        </div>
        { !this.state.collapsed &&
          <div className="panel-body">
            {children}
          </div>
        }
      </div>
    );
  }
}
