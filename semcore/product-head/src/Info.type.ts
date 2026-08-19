import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSProductHeadInfo {
  namespace Item {
    type Props = NSBox.Props & {
      /** A label content that appears before the main item content */
      label?: React.ReactNode;
    };

    namespace Label {
        type Component = NSBox.Component;
    }

    type Component = Intergalactic.Component<'div', Props> & {
      Label: Label.Component;
    };
  }

  type Component = NSBox.Component & {
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type InfoItemProps = NSProductHeadInfo.Item.Props;

export type { NSProductHeadInfo };
