import type { Intergalactic } from '@semcore/core';

declare namespace NSLimitsTrustLine {
    type Props = {
      /**
       * Additional details shown in a tooltip next to the "Cancel anytime" text. If not set, the info icon with the tooltip isn't rendered.
       */
      description?: string;
      /**
       * Locale for the built-in texts
       */
      locale?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsTrustLine };
