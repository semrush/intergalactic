import type { NSBox } from '@semcore/base-components';

declare namespace NSProductHead {
  namespace Buttons {
    type Component = NSBox.Component;
  }

  namespace Links {
    type Component = NSBox.Component;
  }

  namespace Row {
    type Component = NSBox.Component;
  }

  type Component = NSBox.Component & {
    Buttons: Buttons.Component;
    Links: Links.Component;
    Row: Row.Component;
  };
}

export type { NSProductHead };
