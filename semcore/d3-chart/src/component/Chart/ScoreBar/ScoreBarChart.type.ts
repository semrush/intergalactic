import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import type React from 'react';

type Category = string;

export type ScoreBarChartDataItem = {
  category: Category;
  value: number;
  href?: string;
};

export type ScoreBarChartData = Array<ScoreBarChartDataItem>;

export type ScoreBarChartProps = NSBox.Props & {
  /**
   * Chart data. For all charts except Donut(Pie), Radar and Venn should be an Array
   */
  data: ScoreBarChartData;

  /**
   * Mode for chart. Compact is for one row per item.
   * @default default.
   */
  mode?: 'default' | 'compact';

  /** Handle click by Item. */
  onClickItem?: (barItem: ScoreBarChartDataItem & { index: number }, e: React.SyntheticEvent) => void;
  /**
   * Value for 100% of bars.
   * @default sum of all bars values.
   */
  totalValue?: number;
  /**
   * Custom event emitter. Could be useful to handle event on few charts at the same time.
   */
  eventEmitter?: EventEmitter<ScoreBarEvents>;
  /**
   * Map with colors for data items
   */
  colorMap?: Record<Category, string>;
  /**
   * Show tooltip's.
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Function to format values
   */
  valueFormatter?: (value: unknown) => string;
  /**
   * Function to format title
   */
  titleFormatter?: (title?: Category) => string;
  /**
   * Animations duration in ms, set 0 to disable animations
   * @default --intergalactic-duration-medium
   */
  duration?: number;
  /**
   * Locale for displaying the days of a week and months, to be transferred to `Intl`
   * @default en
   * */
  locale?: NavigatorLanguage['language'];
};

export type ScoreBarChartDefaultProps = {
  showTooltip: true;
  locale: 'en';
};

export type ScoreBarChartType = Intergalactic.Component<NSBox.Component, ScoreBarChartProps>;

export type ScoreBarEvents =
  Record<`setTooltipPosition_${string}`, (clientX: number, clientY: number) => void> &
  Record<`setTooltipRenderingProps_${string}`, (_: {}, params: { index: number }) => void> &
  Record<`setTooltipVisible_${string}`, (isVisible: boolean) => void>;
