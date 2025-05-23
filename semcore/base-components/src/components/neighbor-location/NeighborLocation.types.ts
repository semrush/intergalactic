import React from 'react';
import { UnknownProperties, Intergalactic, ReturnEl } from '@semcore/core';

export type NeighborLocationUnion = 'right' | 'both' | 'left';

/** @deprecated */
export interface INeighborLocationProps extends NeighborLocationProps, UnknownProperties {
  /**
   *  HTML tag name for the displayed item
   * @default div
   */
  tag?: React.ElementType | string;
}
export type NeighborLocationProps = {
  /** Number of elements in a group */
  controlsLength?: number;
};

/** @deprecated */
export interface INeighborItemProps extends NeighborItemProps, UnknownProperties {}
export type NeighborItemProps = {
  /** Determines from which side the component has neighbors */
  neighborLocation?: NeighborLocationUnion | false;
};

/** @deprecated */
export interface INeighborLocationDetectProps
  extends NeighborLocationDetectProps,
    UnknownProperties {}
export type NeighborLocationDetectProps = NeighborItemProps & {
  children?:
    | React.ReactElement
    | ((neighborLocation: 'right' | 'both' | 'left' | undefined) => ReturnEl);

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
