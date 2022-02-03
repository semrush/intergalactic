import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { Text, ITextProps } from '@semcore/typography';

export interface ITitleProps extends ITextProps {
  /**
   * Tooltip text
   */
  hint?: React.ReactNode;
}

declare const Card: (<T>(props: CProps<IBoxProps & T>) => ReturnEl) & {
  Title: <T>(props: ITitleProps & T) => ReturnEl;
  Description: typeof Text;
  Header: typeof Box;
  Body: typeof Box;
};

export default Card;
