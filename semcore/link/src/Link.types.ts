import type { BoxProps, SimpleHintPopperProps } from '@semcore/base-components';
import type { BaseTextProps } from '@semcore/typography';
import type React from 'react';

export type LinkProps = BoxProps & BaseTextProps & {
  /**
   * CSS property of the display link (inline|inline-block)
   * @default false
   * @deprecated. You should use default inline-flex for all cases.
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
   * @default false
   */
  noWrap?: boolean;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
  /**
   * The position of the popper relative to the trigger that called it.
   * @default top
   */
  hintPlacement?: SimpleHintPopperProps['placement'];
};
