import type { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { NSPills } from '@semcore/pills';

declare namespace NSPillsFH {
  namespace HighlightedItem {
    type Props = NSPills.Props;

    namespace Text {
      type Component = typeof Box;
    }

    namespace Addon {
      type Props = {
        animatedSparkleCount?: number;
      };

      type Component = Intergalactic.Component<'div', Props>;
    }

    type Component = Intergalactic.Component<'button', Props> & {
      Text: Text.Component;
      Addon: Addon.Component;
    };
  }

  type Component = NSPills.Component & {
    HighlightedItem: HighlightedItem.Component;
  };
}

export type { NSPillsFH };
