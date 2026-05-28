import type { Intergalactic } from '@semcore/core';
import type TabLine from '@semcore/tab-line';

export type HighlightedTabLineItemComponent = typeof TabLine.Item & {
  Addon: Intergalactic.Component<'div', { animatedSparkleCount?: number }>;
};

export type HighlightedTabLineComponent = typeof TabLine & {
  HighlightedItem: HighlightedTabLineItemComponent;
};
