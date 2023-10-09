import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { ChartLegend as ChartL, LegendItem, LegendFlexProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import DesktopIcon from '@semcore/ui/icon/Desktop/m';
import { Intergalactic } from '@semcore/core';
import { IconProps } from '@semcore/icon';

const Preview = (preview) => {
  const { select, radio, text, bool } = preview('ChartLegend');

  const direction = radio({
    key: 'direction',
    defaultValue: 'row',
    label: 'Direction',
    options: ['row', 'column'],
  });

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: ['m', 'l'],
  });

  const shape = select({
    key: 'shape',
    defaultValue: 'Checkbox',
    label: 'Shape',
    options: ['Checkbox', 'Line', 'Circle', 'Square'],
  });

  const withIcon = bool({
    key: 'withIcon',
    defaultValue: false,
    label: 'With icon',
  });

  const additionLabel = text({
    key: 'additionLabel',
    defaultValue: '',
    label: 'Addition Label',
  });

  const count = text({
    key: 'count',
    defaultValue: 0,
    label: 'Count',
  });

  const withTrend = bool({
    key: 'withTrend',
    defaultValue: false,
    label: 'With trend',
  });

  return (
    <ChartLegend
      withTrend={withTrend || undefined}
      direction={direction}
      shape={shape}
      size={size}
      additionLabel={additionLabel}
      count={count}
      withIcon={withIcon}
    />
  );
};

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
  Line3: resolveColor('orange-400'),
  Line4: resolveColor('pink-300'),
  Line5: resolveColor('yellow-200'),
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

type ChartLProps = Omit<LegendFlexProps, 'items'> & {
  additionLabel?: string;
  count?: number;
  withIcon?: boolean;
};

const ChartLegend = (props: ChartLProps) => {
  const { withTrend, direction, shape, size, additionLabel, count, withIcon } = props;

  const [lines, setLines] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .reduce<Record<string, LegendItem>>((res, item) => {
        res[item] = {
          id: item,
          label: item,
          checked: true,
          color: lineColors[item],
        };

        return res;
      }, {}),
  );

  React.useEffect(() => {
    setLines(() => {
      const newLines = Object.keys(lines).reduce<Record<string, LegendItem>>((res, key) => {
        res[key].additionalInfo = {
          label: additionLabel,
          count: count,
        };

        if (!additionLabel && !count) {
          res[key].additionalInfo = undefined;
        }

        if (withIcon) {
          res[key].icon = (<DesktopIcon />) as unknown as Intergalactic.Component<'svg', IconProps>;
        } else {
          res[key].icon = undefined;
        }

        return res;
      }, lines);

      return { ...newLines };
    });
  }, [additionLabel, count, withIcon]);

  const onChangeDisplayLine = (key: string, isDisplay: boolean) => {
    setLines((prevDisplayedLines) => ({
      ...prevDisplayedLines,
      [key]: {
        ...prevDisplayedLines[key],
        checked: isDisplay,
      },
    }));
  };

  const [trendIsVisible, setTrendIsVisible] = React.useState(false);

  return (
    <div>
      <ChartL.Flex
        withTrend={withTrend}
        trendLabel={withTrend ? 'Trend' : undefined}
        direction={direction}
        shape={shape}
        items={lines}
        onChangeVisibleItem={onChangeDisplayLine}
        size={size}
        trendIsVisible={trendIsVisible}
        onChangeTrendVisible={(isVisible) => setTrendIsVisible(isVisible)}
      />
    </div>
  );
};

export default PlaygroundGeneration(Preview);
