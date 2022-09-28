import React from 'react';
import createComponent, { Root, Component, register } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import isNode from '@semcore/utils/lib/isNode';

const Context = register.get('neighbor-location-context', React.createContext({}));

class NeighborLocationRoot extends Component {
  static displayName = 'NeighborLocation';

  controlsLength = 0;
  cacheChild = new Map();

  calculateNeighborLocation(controlsLength, component) {
    // for not re-render component
    if (!this.cacheChild.has(component)) {
      // default state
      let neighborLocation = 'both';
      // if one child
      if (controlsLength === 1) {
        return undefined;
      }
      // if first child
      if (this.cacheChild.size === 0) {
        neighborLocation = 'right';
      }
      // if last child
      if (this.cacheChild.size === controlsLength - 1) {
        neighborLocation = 'left';
      }
      // set cache
      this.cacheChild.set(component, neighborLocation);
    }
    // return default state
    return this.cacheChild.get(component);
  }

  getDetectProps() {
    return {
      getNeighborLocation: this.calculateNeighborLocation.bind(this, this.controlsLength),
    };
  }

  render() {
    const { Children, tag: Tag } = this.asProps;
    this.controlsLength = React.Children.toArray(getOriginChildren(Children)).filter(isNode).length;
    this.cacheChild.clear();

    if (Tag)
      return (
        <Root render={Tag}>
          <Children />
        </Root>
      );

    return <Children />;
  }
}

class Detect extends Component {
  render() {
    const { children, neighborLocation: selfNeighborLocation, getNeighborLocation } = this.asProps;
    const calculateNeighborLocation = getNeighborLocation ? getNeighborLocation(this) : undefined;
    const neighborLocation = selfNeighborLocation ?? calculateNeighborLocation;

    if (!children) return;
    if (typeof children === 'function') return children(neighborLocation);
    return React.cloneElement(React.Children.only(children), {
      neighborLocation,
    });
  }
}

const NeighborLocation = createComponent(
  NeighborLocationRoot,
  {
    Detect: Detect,
  },
  {
    context: Context,
  },
);

export default NeighborLocation;
