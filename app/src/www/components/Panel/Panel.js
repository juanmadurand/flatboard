import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DragSource } from 'react-dnd';

import { move } from 'www/reducers/board';

import classNames from 'classnames';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

const styles = require('./Panel.scss');

const dragSource = {
  beginDrag(props) {
    return {
      id: props.id,
      zone: props.zone,
    };
  },
  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.move(props.id, dropResult.name);
    }
  },
};

@connect(
  null,
  dispatch => bindActionCreators({ move }, dispatch)
)
@DragSource('panel', dragSource, (connect, monitor) => ({ // eslint-disable-line
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Panel extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    move: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
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
      connectDragSource,
      isDragging,
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
      <div
        className={classNames('panel panel-primary', styles.panel_wrapper)}
        style={{opacity: isDragging ? 0.5 : 1}}
      >
        {connectDragSource(
          <div {...headingProps}>
            <h3 className={classNames('panel-title', styles.panel_title)}>{title}</h3>
            { this.renderHeaderAction() }
          </div>
        )}
        { !this.state.collapsed &&
          <div className="panel-body">
            {children}
          </div>
        }
      </div>
    );
  }
}
