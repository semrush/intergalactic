import type { Box, BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { Text, NSText } from '@semcore/typography';
import type React from 'react';

export type CardProps = BoxProps;

export type TitleProps = NSText.Props & {
  /**
   * Content of the Informer that's displayed in the end of the title. Use it if you don't need Title with Ellipsis.
   */
  innerHint?: React.ReactNode;
  /**
   * Content of the Informer that's displayed right after the title. Useful in case of using Title with Ellipsis.
   */
  hintAfter?: React.ReactNode;
  /** Aria-label for the InnerHint icon */
  innerHintAriaLabel?: string;
  /** Aria-label for the HintAfter icon */
  hintAfterAriaLabel?: string;
};

export type CardRootComponent = Intergalactic.Component<'div', CardProps>;
export type CardTitleComponent = Intergalactic.Component<'div', TitleProps>;
export type CardDescriptionComponent = typeof Text;
export type CardHeaderComponent = typeof Box;
export type CardBodyComponent = typeof Box;

export type CardComponent = CardRootComponent & {
  Title: CardTitleComponent;
  Description: CardDescriptionComponent;
  Header: CardHeaderComponent;
  Body: CardBodyComponent;
};
