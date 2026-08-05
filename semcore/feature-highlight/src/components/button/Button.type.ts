import type { NSButton } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

declare namespace NSButtonFH {
  type InnerProps = {
    theme?: NSButton.Props['theme'] | 'highlighted';
  };
  type DefaultProps = {
    theme: 'highlighted';
  };

  namespace Addon {
    type Props = NSButton.Addon.Props & {
      animatedSparkleCount?: number;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = NSButton.Component & {
    Addon: Addon.Component;
  };
}

export type { NSButtonFH };
