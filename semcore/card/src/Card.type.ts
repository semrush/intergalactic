import type { Box, BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { Text, NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSCard {
  type Props = BoxProps;

  namespace Title {
    type Props = NSText.Props & {
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
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Description {
    type Component = typeof Text;
  }

  namespace Header {
    type Component = typeof Box;
  }

  namespace Body {
    type Component = typeof Box;
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Title: Title.Component;
    Description: Description.Component;
    Header: Header.Component;
    Body: Body.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type CardProps = NSCard.Props;
/** @deprecated It will be removed in v18. */
export type TitleProps = NSCard.Title.Props;

export type { NSCard };
