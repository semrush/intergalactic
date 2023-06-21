import React from 'react';
import { Intergalactic } from '@semcore/core';

/** @deprecated */
export interface IClipPath extends ClipPath, UnknownProperties {}
export type ClipPath = {
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
};

declare const ClipPath: Intergalactic.Component<'clipPath', ClipPath>;

export default ClipPath;
