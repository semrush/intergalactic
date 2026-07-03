import type { NSBox, NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSWidgetEmpty {
    type Props = NSFlex.Props & {
      /**
       * URL before the icon or the whole component
       */
      icon?: React.ReactNode;
    };

    namespace Title {
        type Component = NSBox.Component;
    }

    namespace Description {
        type Component = NSBox.Component;
    }

    type Component = Intergalactic.Component<'div', Props> & {
      Title: Title.Component;
      Description: Description.Component;
    };
}

/** @deprecated It will be removed in v18. */
export type WidgetEmptyProps = NSWidgetEmpty.Props;

export type { NSWidgetEmpty };
