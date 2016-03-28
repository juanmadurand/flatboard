import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const styles = require('./Panel.scss');

export default class Panel extends Component {
  static propTypes = {
    title: PropTypes.string,
    actionBtn: PropTypes.object,
    children: PropTypes.object,
  };

  render() {
    const {
      title,
      actionBtn,
      children,
    } = this.props;
    return (
      <div className={classNames('panel', styles.panel_wrapper)}>
        <div className={classNames('panel-heading', styles.panel_heading)}>
          <h3 className={classNames('panel-title', styles.panel_title)}>{title}</h3>
          { actionBtn &&
            <div className={styles.panel_heading_action_btn} onClick={actionBtn.action}>
              <Glyphicon
                glyph="circle-arrow-right"
                className={styles.panel_heading_action_btn_icon}
              />
              {actionBtn.title}
            </div>
          }
        </div>
        <div className="panel-body">
          {children}
        </div>
      </div>
    );
  }
}
