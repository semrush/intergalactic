import React from 'react';
import { Intergalactic, ReturnEl, UnknownProperties } from '@semcore/core';

/** @deprecated */
export interface INeighborLocationProps extends NeighborLocationProps, UnknownProperties {}
export type NeighborLocationProps = {
  /**
   *  HTML tag name for the displayed item
   * @default div
   */
  tag?: React.ElementType | string;
  /** Number of elements in a group */
  controlsLength?: number;
};

/** @deprecated */
export interface INeighborItemProps extends NeighborItemProps, UnknownProperties {}
export type NeighborItemProps = {
  /** Determines from which side the component has neighbors */
  neighborLocation?: 'right' | 'both' | 'left' | false;
};

/** @deprecated */
export interface INeighborLocationDetectProps
  extends NeighborLocationDetectProps,
    UnknownProperties {}
export type NeighborLocationDetectProps = INeighborItemProps & {
  children?:
    | React.ReactElement
    | ((neighborLocation: 'right' | 'both' | 'left' | undefined) => ReturnEl);
};

declare const NeighborLocation: Intergalactic.Component<'div', NeighborLocationProps> & {
  Detect: Intergalactic.Component<'div', INeighborItemProps, 'right' | 'both' | 'left' | undefined>;
};

declare const useNeighborLocationDetect: (index: number) => 'right' | 'both' | 'left' | false;

export { useNeighborLocationDetect };

export default NeighborLocation;
