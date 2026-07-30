import type { Intergalactic } from '@semcore/core';
import type { NSTabLine } from '@semcore/tab-line';

declare namespace NSTabLineFH {
  namespace HighlightedItem {
    namespace Addon {
      type Props = {
        animatedSparkleCount?: number;
      };

      type Component = Intergalactic.Component<'div', Props>;
    }

    type Component = NSTabLine.Item.Component & {
      Addon: Addon.Component;
    };
  }

  type Component = NSTabLine.Component & {
    HighlightedItem: HighlightedItem.Component;
  };
}

export type { NSTabLineFH };
