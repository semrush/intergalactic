import type { Intergalactic } from '@semcore/core';
import type Switch from '@semcore/switch';

import type { AnimatedSparklesProps } from '../../inner-components/sparkle/AnimatedSparkles';

export type HighlightedSwitchComponent = typeof Switch & {
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
