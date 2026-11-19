import type { Intergalactic } from '@semcore/core';

declare namespace NSLimitsTierCard {
  type Theme = 'default' | 'accent';

  type HeadingLevel = 2 | 3 | 4 | 5 | 6;

  type Price = {
    /** Formatted price */
    value: string;
    /** Billing period shown after a slash. If not set, only the value is shown */
    period?: string;
  };

  type Props = {
    /** Tier name */
    name: string;
    /**
     * Heading level of the tier name
     * @default 4
     */
    headingLevel?: NSLimitsTierCard.HeadingLevel;
    /** Tier price shown next to the name */
    price: NSLimitsTierCard.Price;
    /** List of what the tier includes */
    features: Array<React.ReactNode>;
    /**
     * Marker of the features list items
     * @default '•'
     */
    featuresMarker?: React.ReactNode;
    /**
     * Short tier description under the header
     * A string is wrapped into styled text; a React element is rendered as is, without default styles
     */
    description?: React.ReactNode;
    /** Call to action area at the bottom of the card, usually a Button */
    cta?: React.ReactNode;
  } & (
    | {
      theme?: 'default';
      promoLabel?: never;
    }
    | {
      /**
       * Visual theme of the card
       * @default 'default'
       */
      theme: 'accent';
      /** Short label pinned to the top edge of the card */
      promoLabel?: string;
    }
  );

  type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsTierCard };
