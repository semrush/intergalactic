import type { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Pills from '@semcore/pills';
import type { PillProps } from '@semcore/pills';

export type HighlightedItemAddonProps = {
  animatedSparkleCount?: number;
};

export type HighlightedPillItemComponent = Intergalactic.Component<'div', PillProps> & {
  Text: typeof Box;
  Addon: Intergalactic.Component<'div', HighlightedItemAddonProps>;
};

export type HighlightedPillComponent = typeof Pills & {
  HighlightedItem: HighlightedPillItemComponent;
};
