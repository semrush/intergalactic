import type { Flex, FlexProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { TextProps } from '../Text/Text.type';

export type ListItemProps = TextProps & {
  /** Individual marker of a list item */
  marker?: React.ReactNode;
};

export type ListItemContentProps = FlexProps;

export type ListProps = TextProps & {
  /** Marker of the entire list
   * @default • */
  marker?: React.ReactNode;
};

export type ListItemRootComponent = Intergalactic.Component<'li', ListItemProps>;
export type ListItemContentComponent = Intergalactic.Component<typeof Flex, ListItemContentProps>;

export type ListItemComponent = ListItemRootComponent & {
  Content: ListItemContentComponent;
};

export type ListRootComponent = Intergalactic.Component<'ul', ListProps>;
export type ListComponent = ListRootComponent & {
  Item: ListItemComponent;
};
