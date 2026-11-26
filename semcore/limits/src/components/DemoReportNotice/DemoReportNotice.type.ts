import type { Intergalactic } from '@semcore/core';

import type { NSLimitsNoticeBase } from '../../inner-components/NoticeBase/NoticeBase.type';

declare namespace NSLimitsDemoReportNotice {
    type Theme = NSLimitsNoticeBase.Theme;

    type Props = NSLimitsNoticeBase.Props & {
      /**
       * Called when the back button is clicked.
       */
      onBack?: (event: React.SyntheticEvent) => void;
      /**
       * Accessible name of the back button.
       * @default Back
       */
      backLabel?: string;
      /** Actions before primary button. It might be anything, e.g input/list. */
      beforeActions?: React.ReactNode;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsDemoReportNotice };
