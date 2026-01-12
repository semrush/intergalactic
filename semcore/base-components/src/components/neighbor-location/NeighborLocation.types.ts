import type { Intergalactic } from '@semcore/core';
import type React from 'react';

export type NeighborLocationUnion = 'right' | 'both' | 'left';

export type NeighborLocationProps = {
  /** Number of elements in a group */
  controlsLength?: number;
};

export type NeighborItemProps = {
  /** Determines from which side the component has neighbors */
  neighborLocation?: NeighborLocationUnion | false;
};

export type NeighborLocationDetectProps = NeighborItemProps & {
  children?:
    | React.ReactElement
    | ((neighborLocation: 'right' | 'both' | 'left' | undefined) => React.ReactElement | null);

  /** Inner from Root */
  getNeighborLocation: (component: any) => NeighborItemProps['neighborLocation'];
};

declare const NeighborLocation: Intergalactic.Component<'div', NeighborLocationProps> & {
  Detect: Intergalactic.Component<'div', NeighborItemProps, 'right' | 'both' | 'left' | undefined>;
};

declare const NeighborLocationRoot: {
  new (...args: any[]): any;
  cacheChild: Map<any, any>;
  calculateNeighborLocation: () => any;
};

declare const useNeighborLocationDetect: (index: number) => 'right' | 'both' | 'left' | false;

export { NeighborLocation, NeighborLocationRoot, useNeighborLocationDetect };
