import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

import type { LegendProps } from '../BaseLegend.type';
import type { LegendItemType } from '../LegendItem/LegendItem.type';

export type TrendProps = {
  /**
   * Flag for include trend LegendItem in Legend
   */
  withTrend: true;
  /**
   * Trend label (for localization)
   */
  trendLabel?: string;
  /**
   * Flag for describe are trend is visible
   */
  trendIsVisible: boolean;
  /**
   * Handler for change trend visibility
   */
  onTrendIsVisibleChange: (isVisible: boolean) => void;
};

type SuffixProps = {
  /**
   * Element after all Legend items
   */
  suffix?: React.ReactElement;
};

type AddonProps = ({ withTrend?: never } & SuffixProps) | ({ suffix?: never } & TrendProps);

export type LegendFlexProps = LegendProps & AddonProps & NSFlex.Props;

export type LegendFlexDefaultProps = {
  direction: 'row';
  children: React.JSX.Element;
};

export type LegendFlexType = Intergalactic.Component<NSFlex.Component, LegendFlexProps> & {
  LegendItem: LegendItemType;
};
