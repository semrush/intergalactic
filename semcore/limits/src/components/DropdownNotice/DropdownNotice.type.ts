import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

import type { NSLimitsTrustLine } from '../../inner-components/TrustLine/TrustLine.type';

declare namespace NSLimitsDropdownNotice {
    type Props = NSFlex.Props & {
      /**
       * Notice title.
       */
      title?: React.ReactNode;
      /**
       * Notice description.
       */
      text: React.ReactNode;
      /**
       * Main call to action, usually a primary button.
       */
      primaryCta: React.ReactNode;
      /**
       * Secondary call to action, usually a link or secondary button.
       */
      secondaryCta?: React.ReactNode;
      /**
       * Shows the "Cancel anytime" trust line next to the actions. Pass an object to add a tooltip with details.
       */
      trustLine?: true | NSLimitsTrustLine.Props;
      /**
       * Locale for the built-in texts.
       */
      locale?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsDropdownNotice };
