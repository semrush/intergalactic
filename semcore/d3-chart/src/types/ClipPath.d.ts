import React from 'react';
import { MapProps } from './Plot';
import { ReturnEl } from '@semcore/core';

export interface IClipPath {
  /**
   *  HTML tag name for the displayed item
   * @default rect
   */
  tag?: string;
  /**
   *  HTML selector
   */
  id?: string;
  /**
   *  CSS property
   */
  transition?: string;
  /**
   *  Function which run after mounted clipPath
   */
  setAttributeTag?: (rect: React.ReactNode) => void;
}

declare const ClipPath: <T>(props: MapProps<IClipPath & T>) => ReturnEl;

export default ClipPath;
