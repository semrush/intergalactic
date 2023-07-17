import React from 'react';
import { UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { Text, TextProps } from '@semcore/typography';

/** @deprecated */
export interface ITitleProps extends TitleProps, UnknownProperties {}
export type TitleProps = TextProps & {
  /**
   * Tooltip text
   */
  hint?: React.ReactNode;
};

declare const Card: Intergalactic.Component<'div', BoxProps> & {
  Title: Intergalactic.Component<'div', TitleProps>;
  Description: typeof Text;
  Header: typeof Box;
  Body: typeof Box;
};

export default Card;
