import React, { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { ITextProps } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export interface ILinkProps extends ITextProps, IKeyboardFocusProps {
  /**
   * CSS property of the display link (inline|inline-block)
   * @default false
   */
  inline?: boolean;
  /**
   * Sets the link to the disabled state
   */
  disabled?: boolean;
  /**
   * Sets the link to the active state
   */
  active?: boolean;
  /** This flag enables highlighting of the visited link
   */
  enableVisited?: boolean;
  /** The text will not be moved to a new line
   * @default true
   */
  noWrap?: boolean;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
}

declare const Link: (<T>(props: CProps<ILinkProps & T>) => ReturnEl) & {
  Text: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Addon: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

export default Link;
