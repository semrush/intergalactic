import type { Intergalactic } from '@semcore/core';
import type { NSRadio } from '@semcore/radio';
import type { NSText } from '@semcore/typography';

import type { NSAnimatedSparklesFH } from '../../inner-components/sparkle/AnimatedSparkles.type';

declare namespace NSRadioFH {
  type Props = NSRadio.Props;
  type Ctx = NSRadio.Ctx;

  namespace Value {
    type Props = NSRadio.Value.Props;

    type Component = Intergalactic.Component<'input', Props>;
  }

  namespace Text {
    type Component = NSText.Component;
  }

  namespace AnimatedSparkles {
    type Props = NSAnimatedSparklesFH.Props;

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'label', Props, Ctx> & {
    Value: Value.Component;
    Text: Text.Component;
    AnimatedSparkles: AnimatedSparkles.Component;
  };
}

export type { NSRadioFH };
