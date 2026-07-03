import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { NSText } from '../Text/Text.type';

declare namespace NSList {
  type Props = NSText.Props & {
    /** Marker of the entire list
     * @default • */
    marker?: React.ReactNode;
  };

  type DefaultProps = {
    marker: '•';
  };

  namespace Item {
    type Props = NSText.Props & {
      /** Individual marker of a list item */
      marker?: React.ReactNode;
    };

    namespace Content {
      type Props = NSFlex.Props;
      type Component = Intergalactic.Component<NSFlex.Component, Props>;
    }

    type Component = Intergalactic.Component<'li', Props> & {
      Content: Content.Component;
    };
  }

  type Component = Intergalactic.Component<'ul', Props> & {
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type ListItemProps = NSList.Item.Props;
/** @deprecated It will be removed in v18. */
export type ListItemContentProps = NSList.Item.Content.Props;
/** @deprecated It will be removed in v18. */
export type ListProps = NSList.Props;

export type { NSList };
