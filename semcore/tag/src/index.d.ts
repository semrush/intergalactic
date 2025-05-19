import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { IconProps } from '@semcore/icon';

export type TagSize = 'xl' | 'l' | 'm';
/** @deprecated */
export type TagThemeOld =
  | 'muted'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'invert'
  | 'additional';
export type TagTheme = 'primary' | 'secondary' | TagThemeOld;
export type TagUse = 'primary' | 'secondary';

/** @deprecated */
export interface ITagProps extends TagProps, UnknownProperties {}
export type TagProps = BoxProps & {
  /** Value responsible for tag availability
   */
  disabled?: boolean;
  /** Value responsible for tag activity
   */
  active?: boolean;
  /** Interactive tag
   */
  interactive?: boolean;
  /** Tag type
   * @default secondary
   * @deprecated v4.0.0
   * @use ITagProps.theme
   */
  use?: TagUse;
  /** Tag theme, there are several default themes or you can use your color
   * @default primary
   */
  theme?: TagTheme;
  /** Tag color text */
  color?: string;
  /** Tag size
   * @default m
   */
  size?: TagSize;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
  locale?: string;
};

/** @deprecated */
export interface ITagCloseProps extends TagCloseProps, UnknownProperties {}
export type TagCloseProps = IconProps & {
  /** Tag type
   * @default secondary
   */
  use?: TagUse;
  /** Tag theme, there are several default themes or you can use your color
   * @default muted
   */
  theme?: TagTheme;
};

/** @deprecated */
export interface ITagContext extends TagContext, UnknownProperties {}
export type TagContext = TagProps & {
  getCloseProps?: PropGetterFn;
};

/** @deprecated */
export interface ITagAddonProps extends TagAddonProps, UnknownProperties {}
export type TagAddonProps = BoxProps & {};

/** @deprecated */
export interface ITagTextProps extends TagTextProps, UnknownProperties {}
export type TagTextProps = BoxProps & {};

declare const Tag: Intergalactic.Component<'div', TagProps, TagContext> & {
  Text: Intergalactic.Component<'div', TagTextProps>;
  Addon: Intergalactic.Component<'div', TagAddonProps>;
  Circle: Intergalactic.Component<'div', TagAddonProps>;
};

declare const TagContainer: Intergalactic.Component<'div', TagProps, TagContext> & {
  Tag: typeof Tag;
  Close: Intergalactic.Component<'button'>;
  Addon: Intergalactic.Component<'div', TagAddonProps>;
  Circle: Intergalactic.Component<'div', TagAddonProps>;
};

export default Tag;
export { TagContainer };
