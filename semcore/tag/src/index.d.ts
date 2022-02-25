import React from 'react';
import { CProps, ReturnEl, PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { IIconProps } from '@semcore/icon';

export type TagSize = 'xl' | 'l' | 'm' | 's';
export type TagTheme = 'muted' | 'invert' | 'warning' | string;
export type TagUse = 'primary' | 'secondary' | 'custom';

export interface ITagProps extends IBoxProps {
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
   */
  use?: TagUse;
  /** Tag theme, there are several default themes or you can use your color
   * @default muted
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
}

export interface ITagCloseProps extends IIconProps {
  /** Tag type
   * @default secondary
   */
  use?: TagUse;
  /** Tag theme, there are several default themes or you can use your color
   * @default muted
   */
  theme?: TagTheme;
}

export interface ITagContext extends ITagProps {
  getCloseProps?: PropGetterFn;
}

export interface ITagAddonProps extends IBoxProps {}

export interface ITagTextProps extends IBoxProps {}

declare const Tag: (<T>(props: CProps<ITagProps & T, ITagContext>) => ReturnEl) & {
  Text: <T>(props: ITagTextProps & T) => ReturnEl;
  Addon: <T>(props: ITagAddonProps & T) => ReturnEl;
  Close: <T>(props: ITagCloseProps & T) => ReturnEl;
  Circle: <T>(props: ITagAddonProps & T) => ReturnEl;
};

export default Tag;
