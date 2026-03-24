import type { Box, BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { Text, TextProps } from '@semcore/typography';
import type React from 'react';

export type CardProps = BoxProps;

export type TitleProps = TextProps & {
  /**
   * Content of the Informer that's displayed in the end of the title. Use it if you don't need Title with Ellipsis.
   */
  innerHint?: React.ReactNode;
  /**
   * Content of the Informer that's displayed right after the title. Useful in case of using Title with Ellipsis.
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

export type CardComponent = Intergalactic.Component<'div', CardProps> & {
  Title: Intergalactic.Component<'div', TitleProps>;
  Description: typeof Text;
  Header: typeof Box;
  Body: typeof Box;
};
