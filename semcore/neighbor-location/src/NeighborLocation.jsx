import React from 'react';
import createComponent, { Root, Component, register } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

function getControlsLength(children, controlsLength = 0) {
  React.Children.forEach(children, function (child) {
    if (!React.isValidElement(child)) return;
    if (child.props.neighborLocation === false) return child;

    if (child.props.neighborLocation || child.type[NEIGHBOR_LOCATION_AUTO_DETECT]) {
      controlsLength += 1;
    } else if (child.props.children) {
      controlsLength = getControlsLength(child.props.children, controlsLength);
    }
  });
  return controlsLength;
}

function getChildrenWithNeighborLocation(children, controlsLength) {
  let controlsIndex = 0;
  const recursiveNeighborLocation = function (children) {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      if (child.props.neighborLocation === false) return child;

      if (child.props.neighborLocation || child.type[NEIGHBOR_LOCATION_AUTO_DETECT]) {
        if (!child.props.neighborLocation) {
          let neighborLocation = 'both';
          if (controlsIndex === 0) {
            neighborLocation = 'right';
          }
          if (controlsIndex === controlsLength - 1) {
            neighborLocation = 'left';
          }
          child = React.cloneElement(child, { neighborLocation });
        }
        controlsIndex += 1;
        return child;
      } else if (child.props.children) {
        return React.cloneElement(child, {
          children: recursiveNeighborLocation(child.props.children),
        });
      }
      return child;
    });
  };

  return recursiveNeighborLocation(children, controlsLength);
}

class NeighborLocationRoot extends Component {
  static displayName = 'NeighborLocation';

  render() {
    const { Children, tag: Tag, controlsLength } = this.asProps;
    const OriginChildren = getOriginChildren(Children);
    const children =
      controlsLength === 1
        ? OriginChildren
        : getChildrenWithNeighborLocation(
            OriginChildren,
            controlsLength ?? getControlsLength(OriginChildren),
          );

    if (Tag) {
      return <Root render={Tag}>{children}</Root>;
    }

    return children;
  }
}

const NEIGHBOR_LOCATION_AUTO_DETECT = register.get(
  'neighbor-location-detect',
  Symbol('NEIGHBOR_LOCATION_AUTO_DETECT'),
);

const NeighborLocation = createComponent(NeighborLocationRoot);

export { NEIGHBOR_LOCATION_AUTO_DETECT };

export default NeighborLocation;
