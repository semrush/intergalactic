import type { NSCheckbox } from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';

import type { NSAnimatedSparklesFH } from '../../inner-components/sparkle/AnimatedSparkles.type';

declare namespace NSCheckboxFH {
  type Props = NSCheckbox.Props;
  type Ctx = NSCheckbox.Ctx;

  namespace Text {
    type Props = NSCheckbox.Text.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  namespace Value {
    type Props = NSCheckbox.Value.Props;

    type Component = Intergalactic.Component<'input', Props>;
  }

  namespace AnimatedSparkles {
    type Props = NSAnimatedSparklesFH.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'label', Props, Ctx> & {
    Text: Text.Component;
    Value: Value.Component;
    AnimatedSparkles: AnimatedSparkles.Component;
  };
}

export type { NSCheckboxFH };
