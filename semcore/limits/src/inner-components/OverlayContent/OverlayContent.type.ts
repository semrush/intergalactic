import type { Intergalactic } from '@semcore/core';

import type { NSLimitsUsageMeter } from '../UsageMeter/UsageMeter.type';

declare namespace NSLimitsOverlayContent {
  type Props = {
    /**
     * Title of the overlay
     */
    title: string;
    /**
     * Text under the title that explains the limitation
     */
    description: React.ReactNode;
    /**
     * Heading level of the title. Should match the page outline
     * @default 3
     */
    headingLevel?: 1 | 2 | 3 | 4 | 5;
    /**
     * Props of the usage meter shown above the title. If not set, the usage meter isn't rendered
     */
    usage?: NSLimitsUsageMeter.Props;
    /**
     * Locale for the built-in texts
     */
    locale?: string;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsOverlayContent };
