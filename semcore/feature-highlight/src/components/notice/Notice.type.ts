import type { Intergalactic } from '@semcore/core';
import type { NSNoticeSmart } from '@semcore/notice';
import type Notice from '@semcore/notice';

declare namespace NSNoticeFH {
  type Props = NSNoticeSmart.Props;

  namespace Label {
    type Component = typeof Notice['Label'];
  }

  namespace Actions {
    type Component = typeof Notice['Actions'];
  }

  namespace Content {
    type Component = typeof Notice['Content'];
  }

  namespace Title {
    type Component = typeof Notice['Title'];
  }

  namespace Text {
    type Component = typeof Notice['Text'];
  }

  namespace Close {
    type Component = typeof Notice['Close'];
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Label: Label.Component;
    Actions: Actions.Component;
    Content: Content.Component;
    Title: Title.Component;
    Text: Text.Component;
    Close: Close.Component;
  };
}

export type { NSNoticeFH };
