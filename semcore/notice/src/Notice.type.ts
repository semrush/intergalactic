import type { NSAnimation, NSBox } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type Icon from '@semcore/icon';
import type { IllustrationProps } from '@semcore/illustration';

import type { LocalizedMessaged } from './translations/__intergalactic-dynamic-locales';

declare namespace NSNotice {
  type Theme = 'danger' | 'warning' | 'success' | 'info' | 'muted';
  type Props = NSBox.Props &
    NSAnimation.FadeInOut.Props & {
    /** Property for managing visibility of Notice */
      hidden?: boolean;
      /**
       * Notice theme
       * @default info
       */
      theme?: NSNotice.Theme;
      /** Duration of animation, ms
       * @default 250
       */
      duration?: number;
      /** Specifies the locale for i18n support */
      locale?: string;
    } & ({
      icon?: typeof Icon;
    } | {
      illustration?: React.ElementType<IllustrationProps>;
    });
  type DefaultProps = {
    theme: 'info';
    i18n: LocalizedMessaged;
    locale: 'en';
  };
  type Ctx = {
    getLabelProps?: PropGetterFn;
  };

  namespace Label {
    type Props = NSBox.Props & {
      theme?: NSNotice.Theme;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Actions {
    type Component = NSBox.Component;
  }

  namespace Content {
    type Component = NSBox.Component;
  }

  namespace Title {
    type Component = typeof Text;
  }

  namespace Text {
    type Component = typeof Text;
  }

  namespace Close {
    type Component = typeof Button;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    /**
     * @deprecated. Use icon or illustration props instead.
     */
    Label: Label.Component;
    Actions: Actions.Component;
    Content: Content.Component;
    Title: Title.Component;
    Text: Text.Component;
    Close: Close.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type NoticeTheme = NSNotice.Theme;
/** @deprecated It will be removed in v18. */
export type NoticeProps = NSNotice.Props;
/** @deprecated It will be removed in v18. */
export type NoticeLabelProps = NSNotice.Label.Props;
/** @deprecated It will be removed in v18. */
export type NoticeContext = NSNotice.Ctx;

export type { NSNotice };
