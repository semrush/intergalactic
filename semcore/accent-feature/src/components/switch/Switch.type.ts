import type { Intergalactic } from '@semcore/core';
import type Switch from '@semcore/switch';

export type AnimatedSparklesProps = {
  count: number;
};

export type SwitchComponent = typeof Switch & {
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
