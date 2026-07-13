import type { FadeInOutProps, Box, BoxProps } from '@semcore/base-components';
import type { NSButton } from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';

import type { LocalizedMessaged } from './translations/__intergalactic-dynamic-locales';

declare namespace NSNotice {
  type Theme = 'danger' | 'warning' | 'success' | 'info' | 'muted';
  type Props = BoxProps &
    FadeInOutProps & {
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
    };
  type DefaultProps = {
    theme: 'info';
    i18n: LocalizedMessaged;
    locale: 'en';
  };
  type Ctx = {
    getLabelProps?: PropGetterFn;
  };

  namespace Label {
    type Props = BoxProps & {
      theme?: NSNotice.Theme;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Actions {
    type Component = typeof Box;
  }

  namespace Content {
    type Component = typeof Box;
  }

  namespace Title {
    type Component = typeof Text;
  }

  namespace Text {
    type Component = typeof Text;
  }

  namespace Close {
    type Component = NSButton.Component;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
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
