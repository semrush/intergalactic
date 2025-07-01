import type { Intergalactic } from '@semcore/core';
import type TabLine from '@semcore/tab-line';

export type TabLineComponent = typeof TabLine & {
  AccentItem: typeof TabLine.Item & {
    Addon: Intergalactic.Component<'div', { animatedSparkleCount?: number }>;
  };
};
