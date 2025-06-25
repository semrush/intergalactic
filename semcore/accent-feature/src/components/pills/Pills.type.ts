import type { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Pills from '@semcore/pills';
import type { PillProps } from '@semcore/pills';

export type AccentItemAddonProps = {
  animatedSparkleCount?: number;
};

export type PillAccentComponent = typeof Pills & {
  AccentItem: Intergalactic.Component<'div', PillProps> & {
    Text: typeof Box;
    Addon: Intergalactic.Component<'div', AccentItemAddonProps>;
  };
};
