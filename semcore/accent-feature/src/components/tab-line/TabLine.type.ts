import type TabLine from '@semcore/tab-line';

export type TabLineComponent = typeof TabLine & {
  AccentItem: typeof TabLine.Item;
};
