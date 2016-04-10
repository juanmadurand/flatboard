import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Panel } from 'www/components';
import * as Containers from 'www/containers';

import { DropTarget as dropTarget } from 'react-dnd';

const styles = require('./Zone.scss');

const zoneTarget = {
  canDrop(props, monitor) {
    const panel = monitor.getItem();
    return props.zone !== panel.zone;
  },

  drop(props) {
    return { name: props.zone };
  },
};

function collect(dragConnect, monitor) {
  return {
    connectDropTarget: dragConnect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

@connect(
  state => ({
    allPanels: state.board,
  }),
)
@dropTarget('panel', zoneTarget, collect)
export default class Zone extends Component {
  static propTypes = {
    allPanels: PropTypes.array.isRequired,
    zone: PropTypes.string.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  renderPanels(panels) {
    if (panels.length === 0) {
      return <div />;
    }

    return panels.map((panel) => {
      const Comp = Containers[panel.id];
      return (
        <Panel {...panel} collapsible key={panel.id}>
          <Comp />
        </Panel>
      );
    });
  }

  render() {
    const {
      allPanels,
      zone,
      canDrop,
      isOver,
      connectDropTarget,
    } = this.props;
    const comps = allPanels.filter((panel) => (panel.zone === zone));
    return connectDropTarget(
      <div className={styles.zone}>
        {this.renderPanels(comps)}
        {canDrop && isOver &&
          <div className={styles.zone_drop}>Drop panel</div>
        }
      </div>
    );
  }
}
