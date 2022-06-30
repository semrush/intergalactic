import React, { ComponentProps } from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';

import { Property } from 'csstype';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface ITextProps extends IBoxProps {
  /** Font size and line-heights */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  /** The text will not be wrapped on a new line and will be cut off with ellipsis */
  noWrap?: boolean;
  /** CSS property `font-weight: 700;` */
  bold?: boolean;
  /** CSS property `font-weight: 500;` */
  medium?: boolean;
  /** Italicized text */
  italic?: boolean;
  /** Underlined text */
  underline?: boolean;
  /** Strikethrough text */
  lineThrough?: boolean;
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
}

export interface IListProps extends ITextProps {
  /** Marker of the entire list
   * @default • */
  marker?: React.ReactNode;
}

export interface IListItemProps extends ITextProps {
  /** Individual marker of a list item */
  marker?: React.ReactNode;
}

export interface IListContext {
  getItemProps: PropGetterFn;
}

export interface IHintProps extends ITextProps {
  /** The value responsible for the activity of the element
   * @default false
   */
  disabled?: boolean;
  /** Enable `active` state */
  active?: boolean;
  /** Left addon hint  */
  addonLeft?: React.ElementType;
  /** Right addon hint  */
  addonRight?: React.ElementType;
}

export interface IBlockquoteProps extends IBoxProps {
  /** Source of the quote */
  author?: React.ReactNode;
}

declare const Hint: ((props: CProps<IHintProps>) => ReturnEl) & {
  Addon: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Text: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

declare const List: ((props: CProps<IListProps, IListContext>) => ReturnEl) & {
  Item: <T>(props: IListItemProps & T) => ReturnEl;
};

declare const Text: <T>(props: ITextProps & T) => ReturnEl;

declare const Blockquote: <T>(props: IBlockquoteProps & T) => ReturnEl;

export { Text, List, Hint, Blockquote };
