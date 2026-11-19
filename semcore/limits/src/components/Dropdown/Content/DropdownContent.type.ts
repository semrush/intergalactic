import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

import type { NSLimitsTrustLine } from '../../../inner-components/TrustLine/TrustLine.type';
import type { NSLimitsUsageMeter } from '../../../inner-components/UsageMeter/UsageMeter.type';

declare namespace NSLimitsDropdownContent {
    type Props = NSFlex.Props & {
      /**
       * Popper content title.
       */
      title: React.ReactNode;
      /**
       * Popper description.
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
       * Shows the "Cancel anytime" trust line under the actions. Pass an object to add a tooltip with details.
       */
      trustLine?: true | NSLimitsTrustLine.Props;
      /**
       * Usage meters. A single object renders one usage meter above the title,
       * an array renders a list of usage meters under the description. If not set, no usage meter is rendered.
       */
      usage?: NSLimitsUsageMeter.Props | NSLimitsUsageMeter.Props[];
      /**
       * Locale for the built-in texts.
       */
      locale?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsDropdownContent };
