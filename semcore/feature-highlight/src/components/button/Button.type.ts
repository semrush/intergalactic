import type { ButtonAddonProps, ButtonComponent, ButtonProps } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

declare namespace NSButtonFH {
  type InnerProps = {
    theme?: ButtonProps['theme'] | 'highlighted';
  };
  type DefaultProps = {
    theme: 'highlighted';
  };

  namespace Addon {
    type Props = ButtonAddonProps & {
      animatedSparkleCount?: number;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = ButtonComponent & {
    Addon: Addon.Component;
  };
}

export type { NSButtonFH };
