import type { Box, FlexProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSWidgetEmpty {
    type Props = FlexProps & {
      /**
       * URL before the icon or the whole component
       */
      icon?: React.ReactNode;
    };

    namespace Title {
        type Component = typeof Box;
    }

    namespace Description {
        type Component = typeof Box;
    }

    type Component = Intergalactic.Component<'div', Props> & {
      Title: Title.Component;
      Description: Description.Component;
    };
}

/** @deprecated It will be removed in v18. */
export type WidgetEmptyProps = NSWidgetEmpty.Props;

export type { NSWidgetEmpty };
