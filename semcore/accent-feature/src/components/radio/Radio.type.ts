import type { Intergalactic } from '@semcore/core';
import type { RadioCtx, RadioProps, RadioValueProps } from '@semcore/radio';
import type { Text } from '@semcore/typography';

import type { AnimatedSparklesProps } from '../../inner-components/sparkle/AnimatedSparkles';

export type RadioComponent = Intergalactic.Component<'label', RadioProps, RadioCtx> & {
  Value: Intergalactic.Component<'input', RadioValueProps>;
  Text: typeof Text;
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
