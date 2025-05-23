import React from 'react';
import { createComponent, Component, Root, register } from '@semcore/core';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import isNode from '@semcore/core/lib/utils/isNode';
import {
  NeighborItemProps,
  NeighborLocationUnion,
  NeighborLocationDetectProps,
  NeighborLocationProps,
  NeighborLocation as NeighborLocationType,
} from './NeighborLocation.types';

const Context = register.get(
  'neighbor-location-context',
  React.createContext<{ controlsLengthRef?: React.RefObject<number> }>({}),
);

function childrenWithoutFragment(children: React.ReactNode) {
  return React.Children.toArray(children).reduce<React.ReactNode[]>((acc, node) => {
    if (React.isValidElement(node) && node.type === React.Fragment) {
      acc.push.apply(acc, childrenWithoutFragment(node.props.children));
    } else {
      acc.push(node);
    }
    return acc;
  }, []);
}

function calculateNeighborLocation(
  length: number,
  i: number,
): NeighborItemProps['neighborLocation'] {
  // default state
  let neighborLocation: NeighborLocationUnion = 'both';
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

export class NeighborLocationRoot extends Component<NeighborLocationProps> {
  static displayName = 'NeighborLocation';

  controlsLengthRef = React.createRef() as React.MutableRefObject<number | undefined>;
  cacheChild = new Map();

  calculateNeighborLocation(controlsLength = 0, component = undefined) {
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
    // @ts-ignore
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

class Detect extends Component<NeighborLocationDetectProps> {
  render() {
    const { children, neighborLocation: selfNeighborLocation, getNeighborLocation } = this.asProps;
    const calculateNeighborLocation = getNeighborLocation ? getNeighborLocation(this) : undefined;
    const neighborLocation = selfNeighborLocation ?? calculateNeighborLocation;

    if (!children) return;
    if (typeof children === 'function') {
      // @ts-ignore
      return children(neighborLocation);
    }
    // @ts-ignore
    return React.cloneElement(React.Children.only(children), {
      neighborLocation,
    });
  }
}

function useNeighborLocationDetect(index: number) {
  const { controlsLengthRef } = React.useContext(Context);
  if (controlsLengthRef?.current === null || controlsLengthRef?.current === undefined) return false;
  return calculateNeighborLocation(controlsLengthRef.current, index);
}

export const NeighborLocation = createComponent(
  NeighborLocationRoot,
  {
    Detect: Detect,
  },
  {
    context: Context,
  },
) as typeof NeighborLocationType;

export { useNeighborLocationDetect };
