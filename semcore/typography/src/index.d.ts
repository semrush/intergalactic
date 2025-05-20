import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';

import { Property } from 'csstype';
import { BoxProps, Flex, FlexProps } from '@semcore/flex-box';

/** @deprecated */
export interface ITextProps extends TextProps, UnknownProperties {}
export type TextProps = BoxProps & {
  /** Font size and line-heights */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  /** The text will not be wrapped on a new line and will be cut off with ellipsis */
  noWrap?: boolean;
  /** CSS property `font-weight: 700;` */
  bold?: boolean;
  /** CSS property `font-weight: 600;` */
  semibold?: boolean;
  /** CSS property `font-weight: 500;` */
  medium?: boolean;
  /** Italicized text */
  italic?: boolean;
  /** Underlined text */
  underline?: boolean;
  /** CSS property `font-family: monospace;` */
  monospace?: boolean;
  /** Strikethrough text */
  lineThrough?: boolean;
  /** Uppercase text */
  uppercase?: boolean;
  /** Lowercase text */
  lowercase?: boolean;
  /** Capitalized text */
  capitalize?: boolean;
  /** Text color **/
  color?: string;
  /** Custom `font-size` */
  fontSize?: Property.FontSize<any>;
  /** Custom `line-height` */
  lineHeight?: Property.LineHeight<any>;
  /** Custom `font-weight` */
  fontWeight?: Property.FontWeight;
  /** Text alignment */
  textAlign?: Property.TextAlign;
  /** Enforces text color */
  use?: 'primary' | 'secondary';
  /** Makes text semi-transparent to indicate disabled state */
  disabled?: boolean;
};

/** @deprecated */
export interface IListProps extends ListProps, UnknownProperties {}
export type ListProps = TextProps & {
  /** Marker of the entire list
   * @default • */
  marker?: React.ReactNode;
};

/** @deprecated */
export interface IListItemProps extends ListItemProps, UnknownProperties {}
export type ListItemProps = TextProps & {
  /** Individual marker of a list item */
  marker?: React.ReactNode;
};

export type ListItemContentProps = FlexProps;

/** @deprecated */
export interface IListContext extends ListContext, UnknownProperties {}
export type ListContext = {
  getItemProps: PropGetterFn;
};

/** @deprecated */
export interface IBlockquoteProps extends BlockquoteProps, UnknownProperties {}
export type BlockquoteProps = BoxProps & {
  /** Source of the quote */
  author?: React.ReactNode;
};

declare const Item: Intergalactic.Component<'li', ListItemProps> & {
  Content: Intergalactic.Component<typeof Flex, ListItemContentProps>;
};

declare const List: Intergalactic.Component<'ul', ListProps> & {
  Item: typeof Item;
};

declare const Text: Intergalactic.Component<'span', TextProps>;

declare const Blockquote: Intergalactic.Component<'blockquote', BlockquoteProps>;

export { Text, List, Blockquote };
