import type { Intergalactic } from '@semcore/core';
import type { NSRadio } from '@semcore/radio';
import type { Text } from '@semcore/typography';

import type { AnimatedSparklesProps } from '../../inner-components/sparkle/AnimatedSparkles';

export type HighlightedRadioComponent = Intergalactic.Component<'label', NSRadio.Props, NSRadio.Ctx> & {
  Value: Intergalactic.Component<'input', NSRadio.Value.Props>;
  Text: typeof Text;
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
