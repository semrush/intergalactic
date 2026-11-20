import type { Intergalactic } from '@semcore/core';
import type { NSNotice } from '@semcore/notice';

import type { NSLimitsTrustLine } from '../TrustLine/TrustLine.type';

declare namespace NSLimitsNoticeBase {
  type Theme = 'default' | 'accent';

  type Props = Intergalactic.InternalTypings.EfficientOmit<
    NSNotice.Props,
    'theme' | 'icon' | 'illustration' | 'hidden' | 'visible'
  > & {
    /**
     * Notice title. Also used as an accessible name of the notice.
     */
    title: React.ReactNode;
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
     * Shows the "Cancel anytime" trust line in the actions area. Pass an object to add a tooltip with details.
     */
    trustLine?: true | NSLimitsTrustLine.Props;
    /**
     * Color theme. `accent` fills the whole notice, `default` fills only the actions area.
     * @default default
     */
    theme?: Theme;
    /**
     * Locale for the built-in texts.
     */
    locale?: string;
  };

  type InnerProps = {
    header?: React.ReactNode;
    leading?: React.ReactNode;
    aside?: React.ReactNode;
    beforeActions?: React.ReactNode;
  };

  type Component = Intergalactic.Component<'div', Props & InnerProps>;
}

export type { NSLimitsNoticeBase };
