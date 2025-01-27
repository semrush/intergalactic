import type { Flex, FlexProps } from '@semcore/flex-box';
import type { Intergalactic } from '@semcore/core';
import type { LegendItemType } from '../LegendItem/LegendItem.type';
import type { LegendProps } from '../BaseLegend.type';

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

export type LegendFlexProps = LegendProps & AddonProps & FlexProps;

export type LegendFlexType = Intergalactic.Component<typeof Flex, LegendFlexProps> & {
  LegendItem: LegendItemType;
};
