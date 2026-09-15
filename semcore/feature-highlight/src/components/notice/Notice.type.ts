import type { Intergalactic } from '@semcore/core';
import type { NSNotice, NSNoticeSmart } from '@semcore/notice';

declare namespace NSNoticeFH {
  type Props = NSNotice.Props & NSNoticeSmart.Props;

  namespace Label {
    type Component = NSNotice.Label.Component;
  }

  namespace Actions {
    type Component = NSNotice.Actions.Component;
  }

  namespace Content {
    type Component = NSNotice.Content.Component;
  }

  namespace Title {
    type Component = NSNotice.Title.Component;
  }

  namespace Text {
    type Component = NSNotice.Text.Component;
  }

  namespace Close {
    type Component = NSNotice.Close.Component;
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
