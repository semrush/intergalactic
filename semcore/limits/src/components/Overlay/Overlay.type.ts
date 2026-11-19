import type { Intergalactic } from '@semcore/core';

import type { NSLimitsOverlayContent } from '../../inner-components/OverlayContent/OverlayContent.type';
import type { NSLimitsTierCard } from '../../inner-components/TierCard/TierCard.type';
import type { NSLimitsTrustLine } from '../../inner-components/TrustLine/TrustLine.type';

declare namespace NSLimitsOverlay {

  type Props = NSLimitsOverlayContent.Props & {
    /**
     * Main call to action, usually a primary Button
     */
    primaryCta: React.ReactNode;
    /**
     * Secondary call to action shown next to the primary one, usually a secondary Button
     */
    secondaryCta: React.ReactNode;
    /**
     * Shows the "Cancel anytime" line under the actions. Pass an object to customize it, e.g. add a tooltip description
     * @default false
     */
    trustLine?: boolean | NSLimitsTrustLine.Props;
  } & (
    | {
      /**
       * List of benefits shown under the description
       */
      features: Array<React.ReactNode>;
      tiers?: never;
    }
    | {
      /**
       * Two tier cards to compare, shown side by side (stacked in narrow containers)
       */
      tiers: [NSLimitsTierCard.Props, NSLimitsTierCard.Props];
      features?: never;
    }
  );

  type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsOverlay };
