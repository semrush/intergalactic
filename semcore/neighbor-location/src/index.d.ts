import React from 'react';
import { ReturnEl } from '@semcore/core';

export interface INeighborLocationProps {
  /**
   *  HTML tag name for the displayed item
   * @default div
   */
  tag?: React.ElementType | string;
  /** Number of elements in a group */
  controlsLength?: number;
}

export interface INeighborItemProps {
  /** Determines from which side the component has neighbors */
  neighborLocation?: 'right' | 'both' | 'left' | false;
}

declare const NeighborLocation: <T>(props: INeighborLocationProps & T) => ReturnEl;

export default NeighborLocation;