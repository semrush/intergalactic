import React, { useContext, useRef } from 'react';
import createComponent, { Root, Component, register, CONTEXT_COMPONENT } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

const CALCULATE_NEIGHBOR_LOCATION = Symbol('CALCULATE_NEIGHBOR_LOCATION');

class NeighborLocationRoot extends Component {
  static displayName = 'NeighborLocation';

  _currentIndex = null;

  calculateNeighborLocation(controlsLength, prevNeighborLocation) {
    // default state
    let neighborLocation = 'both';

    if (this._currentIndex === null) {
      // for re-render component
      if (prevNeighborLocation) {
        // return prev state
        return prevNeighborLocation;
      } else {
        // for not context component
        return undefined;
      }
    }
    // if one children
    if (controlsLength === 1) {
      return undefined;
    }
    // if first children
    if (this._currentIndex === 0) {
      neighborLocation = 'right';
    }
    // if last children
    if (this._currentIndex === controlsLength - 1) {
      neighborLocation = 'left';
    }
    // increment index children
    this._currentIndex = this._currentIndex + 1;
    // if finished render all children
    if (this._currentIndex === controlsLength) {
      // reset index
      this._currentIndex = null;
    }
    // return default state
    return neighborLocation;
  }

  setContext() {
    const {
      Children,
      controlsLength = React.Children.toArray(getOriginChildren(Children)).length,
    } = this.asProps;

    return {
      [CALCULATE_NEIGHBOR_LOCATION]: this.calculateNeighborLocation.bind(this, controlsLength),
    };
  }

  render() {
    const { Children, tag: Tag } = this.asProps;
    this._currentIndex = 0;

    if (Tag) {
      return <Root render={Tag}>{Children.origin}</Root>;
    }

    return Children.origin;
  }
}

function neighborLocationEnhance() {
  return (props) => {
    const prevNeighborLocationRef = useRef(undefined);
    const ctx = useContext(NeighborLocation[CONTEXT_COMPONENT]);
    if (ctx[CALCULATE_NEIGHBOR_LOCATION]) {
      prevNeighborLocationRef['current'] = ctx[CALCULATE_NEIGHBOR_LOCATION](
        prevNeighborLocationRef['current'],
      );
    }
    return {
      neighborLocation: prevNeighborLocationRef['current'],
      ...props,
    };
  };
}

const Context = register.get(
  'neighbor-location-context',
  React.createContext({}),
);
const NeighborLocation = createComponent(NeighborLocationRoot, {}, {
  context: Context,
});

export { neighborLocationEnhance };

export default NeighborLocation;
