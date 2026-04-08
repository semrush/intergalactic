import type { Intergalactic } from '@semcore/core';
import type { NRadio } from '@semcore/radio';
import type { Text } from '@semcore/typography';

import type { AnimatedSparklesProps } from '../../inner-components/sparkle/AnimatedSparkles';

export type HighlightedRadioComponent = Intergalactic.Component<'label', NRadio.Props, NRadio.Ctx> & {
  Value: Intergalactic.Component<'input', NRadio.Value.Props>;
  Text: typeof Text;
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
