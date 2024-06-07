import React from 'react';
import { UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { Text, TextProps } from '@semcore/typography';

/** @deprecated */
export interface ITitleProps extends TitleProps, UnknownProperties {}
export type TitleProps = TextProps & {
  /**
   * Content of the tooltip that is displayed when hovering over the info icon in the end of title. Use it if you don't need Title with Ellipsis.
   */
  innerHint?: React.ReactNode;
  /**
   * Content of the tooltip that is displayed when hovering over the info icon right after the title. Useful in case of using Title with Ellipsis.
   */
  hintAfter?: React.ReactNode;
  /**
   * Renamed to `hintAfter`
   * @deprecated
   */
  hint?: React.ReactNode;
  /** Aria-label for the InnerHint icon */
  innerHintAriaLabel?: string;
  /** Aria-label for the HintAfter icon */
  hintAfterAriaLabel?: string;
};

declare const Card: Intergalactic.Component<'div', BoxProps> & {
  Title: Intergalactic.Component<'div', TitleProps>;
  Description: typeof Text;
  Header: typeof Box;
  Body: typeof Box;
};

export default Card;
