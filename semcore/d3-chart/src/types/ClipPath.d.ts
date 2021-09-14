import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';

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

declare const ClipPath: <T>(props: CProps<IClipPath & T>) => ReturnEl;

export default ClipPath;
