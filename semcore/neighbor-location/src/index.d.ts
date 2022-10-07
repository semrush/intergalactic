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

export interface INeighborLocationDetectProps extends INeighborItemProps {
  children?:
    | React.ReactElement
    | ((neighborLocation: 'right' | 'both' | 'left' | undefined) => ReturnEl);
}

declare const NeighborLocation: (<T>(props: INeighborLocationProps & T) => ReturnEl) & {
  Detect: <T>(props: INeighborLocationDetectProps & T) => ReturnEl;
};

declare const useNeighborLocationDetect: (index: number) => 'right' | 'both' | 'left' | false;

export { useNeighborLocationDetect };

export default NeighborLocation;
