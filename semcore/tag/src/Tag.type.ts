import type { BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { IconProps } from '@semcore/icon';
import type { NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSTag {
  type Size = 'xl' | 'l' | 'm';
  type Theme = 'primary' | 'secondary' | 'additional';
  type Use = 'primary' | 'secondary';
  type Ctx = Props & {
    getCloseProps?: PropGetterFn;
  };
  type Props = BoxProps & {
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
    theme?: NSTag.Theme;
    /** Tag color text */
    color?: string;
    /** Tag size
     * @default m
     */
    size?: NSTag.Size;
    /** Left addon tag */
    addonLeft?: React.ElementType;
    /** Right addon tag */
    addonRight?: React.ElementType;
    /** Specifies the locale for i18n support */
    locale?: string;
  };

  namespace Text {
    type Props = NSText.Props;
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Addon {
    type Props = BoxProps;
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Circle {
    type Props = BoxProps;
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Close {
    type Props = IconProps & {
      /** Tag type
         * @default secondary
         */
      use?: NSTag.Use;
      /** Tag theme, there are several default themes or you can use your color
         * @default muted
         */
      theme?: NSTag.Theme;
    };
    type Component = Intergalactic.Component<'button', Props>;
  }

  namespace Container {
    type Component = Intergalactic.Component<'div', NSTag.Props, NSTag.Ctx> & {
      Tag: NSTag.Component;
      Close: NSTag.Close.Component;
      Addon: NSTag.Addon.Component;
      Circle: NSTag.Circle.Component;
    };
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Text: Text.Component;
    Addon: Addon.Component;
    Circle: Circle.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type TagSize = NSTag.Size;
/** @deprecated It will be removed in v18. */
export type TagTheme = NSTag.Theme;
/** @deprecated It will be removed in v18. */
export type TagUse = NSTag.Use;
/** @deprecated It will be removed in v18. */
export type TagProps = NSTag.Props;
/** @deprecated It will be removed in v18. */
export type TagCloseProps = NSTag.Close.Props;
/** @deprecated It will be removed in v18. */
export type TagContext = NSTag.Ctx;
/** @deprecated It will be removed in v18. */
export type TagAddonProps = NSTag.Addon.Props;
/** @deprecated It will be removed in v18. */
export type TagTextProps = NSTag.Text.Props;

export type { NSTag };
