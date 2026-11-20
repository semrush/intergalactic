import type { Intergalactic } from '@semcore/core';

import type { NSLimitsNoticeBase } from '../../inner-components/NoticeBase/NoticeBase.type';
import type { NSLimitsUsageMeter } from '../../inner-components/UsageMeter/UsageMeter.type';

declare namespace NSLimitsNotice {
    type Theme = NSLimitsNoticeBase.Theme;

    type Props = NSLimitsNoticeBase.Props & {
      /**
       * Props of the usage meter shown above the content. If not set, the usage meter isn't rendered
       */
      usage?: NSLimitsUsageMeter.Props;
      /**
       * Shows the close button
       * @default false
       */
      closable?: boolean;
      /**
       * Called when the close button is clicked
       */
      onClose?: (event: React.SyntheticEvent) => void;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsNotice };
