import type { EllipsisSettings, SimpleHintPopperProps, BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { IconProps } from '@semcore/icon';
import type React from 'react';

export type TagSize = 'xl' | 'l' | 'm';

export type TagTheme = 'primary' | 'secondary' | 'additional';
export type TagUse = 'primary' | 'secondary';

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
  /** Specifies the locale for i18n support */
  locale?: string;
};

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

export type TagContext = TagProps & {
  getCloseProps?: PropGetterFn;
};

export type TagAddonProps = BoxProps & {};

export type TagTextProps = BoxProps & {
  /**
   * Ellipsis settings
   * @default false
   */
  ellipsis?: boolean | EllipsisSettings;
  hintProps?: SimpleHintPopperProps | false;
};

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
