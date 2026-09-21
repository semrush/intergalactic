import type { LegendFlexProps } from '@semcore/ui/d3-chart';
import { ChartLegend } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { baseLegendProps } from '../stories_props_helper';

type CustomizableLegendProps = LegendFlexProps & {
  /** Renders a suffix element after the items. Mutually exclusive with `withTrend`. */
  withSuffix?: boolean;
  /**
   * Index of the highlighted item, every other item is dimmed.
   * `-1` highlights nothing. Normally driven by the parent chart on item hover.
   */
  highlightedItem?: number;
  /**
   * `LegendFlexProps` is a union (`suffix` XOR trend props), so trend fields cannot be read
   * from it directly. The story declares them as optional controls of its own.
   */
  trendIsVisible?: boolean;
  onTrendIsVisibleChange?: (isVisible: boolean) => void;
};

const Demo = (props: CustomizableLegendProps) => {
  const { withSuffix, withTrend, trendIsVisible, items, onChangeVisibleItem, ...rest } = props;
  const [trendVisible, setTrendVisible] = React.useState(trendIsVisible ?? true);
  // `checked` has to be owned here, otherwise the checkboxes render as controlled
  // inputs that never toggle.
  const [unchecked, setUnchecked] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setTrendVisible(trendIsVisible ?? true);
  }, [trendIsVisible]);

  const handleChangeVisibleItem = (id: string, isVisible: boolean) => {
    setUnchecked((prev) => ({ ...prev, [id]: !isVisible }));
    onChangeVisibleItem?.(id, isVisible);
  };

  const checkableItems = (items ?? []).map((item: LegendFlexProps['items'][number]) => ({
    ...item,
    checked: !unchecked[item.id],
  }));

  const addonProps = withTrend
    ? {
        withTrend: true,
        trendIsVisible: trendVisible,
        onTrendIsVisibleChange: setTrendVisible,
      }
    : withSuffix
      ? { suffix: <Text size={200}>Suffix</Text> }
      : {};

  return (
    <ChartLegend
      {...(rest as LegendFlexProps)}
      items={checkableItems}
      onChangeVisibleItem={handleChangeVisibleItem}
      {...(addonProps as any)}
    />
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  bar: `Bar ${i + 1}`,
}));

export const defaultProps = {
  'size': baseLegendProps.size,
  'shape': baseLegendProps.shape,
  'direction': 'row',
  'patterns': false,
  'withTrend': false,
  'withSuffix': false,
  'trendLabel': '',
  'trendIsVisible': true,
  'highlightedItem': -1,
  'aria-label': 'Chart legend',
  'items': Array.from(data).map((item, index) => {
    return {
      id: item.bar,
      label: `Category ${item.bar}`,
      checked: true,
      color: `chart-palette-order-${index + 1}`,
      additionalInfo: { count: index },
    };
  }),
} as unknown as CustomizableLegendProps;

Demo.defaultProps = defaultProps;

export default Demo;
