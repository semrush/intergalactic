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
};

export type NeighborLocationDetectInnerProps = {
  getNeighborLocation: (component: any) => NeighborItemProps['neighborLocation'];
};

declare const NeighborLocationRoot: {
  new (...args: any[]): any;
  cacheChild: Map<any, any>;
  calculateNeighborLocation: () => any;
};

declare const useNeighborLocationDetect: (index: number) => 'right' | 'both' | 'left' | false;

export { NeighborLocationRoot, useNeighborLocationDetect };
