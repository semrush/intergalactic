import React from 'react';
import { UnknownProperties } from '@semcore/core';
import { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface IClipPath extends ClipPath, UnknownProperties {}
export type ClipPath = {
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

declare const ClipPath: IntergalacticD3Component<'clipPath', ClipPath>;

export default ClipPath;
