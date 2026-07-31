import type { Intergalactic } from '@semcore/core';
import type { NSSwitch } from '@semcore/switch';

import type { NSAnimatedSparklesFH } from '../../inner-components/sparkle/AnimatedSparkles.type';

declare namespace NSSwitchFH {
  namespace Value {
    type Component = NSSwitch.Value.Component;
  }
  namespace AnimatedSparkles {
    type Props = NSAnimatedSparklesFH.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = NSSwitch.Component & {
    Value: Value.Component;
    AnimatedSparkles: AnimatedSparkles.Component;
  };

}

export type { NSSwitchFH };
