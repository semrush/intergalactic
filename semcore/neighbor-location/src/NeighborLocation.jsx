import React, { useContext } from 'react';
import createComponent, { Root, Component, register } from '@semcore/core';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import isNode from '@semcore/utils/lib/isNode';

const Context = register.get('neighbor-location-context', React.createContext({}));

function childrenWithoutFragment(children) {
  return React.Children.toArray(children).reduce((acc, node) => {
    if (React.isValidElement(node) && node.type === React.Fragment) {
      acc.push.apply(acc, childrenWithoutFragment(node.props.children));
    } else {
      acc.push(node);
    }
    return acc;
  }, []);
}

function calculateNeighborLocation(length, i) {
  // default state
  let neighborLocation = 'both';
  // if one child
  if (length === 1) {
    return undefined;
  }
  // if first child
  if (i === 0) {
    neighborLocation = 'right';
  }
  // if last child
  if (i === length - 1) {
    neighborLocation = 'left';
  }
  return neighborLocation;
}

class NeighborLocationRoot extends Component {
  static displayName = 'NeighborLocation';

  controlsLengthRef = React.createRef();
  cacheChild = new Map();

  calculateNeighborLocation(controlsLength = 0, component) {
    // for not re-render component
    if (!this.cacheChild.has(component)) {
      const neighborLocation = calculateNeighborLocation(controlsLength, this.cacheChild.size);
      // set cache
      this.cacheChild.set(component, neighborLocation);
    }
    // return default state
    return this.cacheChild.get(component);
  }

  getDetectProps() {
    return {
      getNeighborLocation: this.calculateNeighborLocation.bind(
        this,
        this.controlsLengthRef.current,
      ),
    };
  }

  setContext() {
    return {
      controlsLengthRef: this.controlsLengthRef,
    };
  }

  render() {
    const { Children, tag: Tag, controlsLength } = this.asProps;
    this.controlsLengthRef.current =
      controlsLength ?? childrenWithoutFragment(getOriginChildren(Children)).filter(isNode).length;
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

function useNeighborLocationDetect(index) {
  const { controlsLengthRef } = useContext(Context);
  if (controlsLengthRef.current === undefined) return false;
  return calculateNeighborLocation(controlsLengthRef.current, index);
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

export { useNeighborLocationDetect };

export default NeighborLocation;
