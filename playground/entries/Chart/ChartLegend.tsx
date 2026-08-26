import type { IconProps } from '@semcore/icon';
import DesktopIcon from '@semcore/icon/Desktop/m';
import type { Intergalactic } from '@semcore/ui/core';
import type { LegendFlexProps, LegendItem } from '@semcore/ui/d3-chart';
import { ChartLegend } from '@semcore/ui/d3-chart';
import React from 'react';

import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type ChartLegendProps = Omit<LegendFlexProps, 'items'> & {
  additionLabel?: string;
  count?: number;
  withIcon?: boolean;
};
export type ChartLegendJSXProps = JSXProps<ChartLegendProps>;

const data = [...Array(5).keys()].map((_, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

function getJSX(props: ChartLegendJSXProps) {
  const { withTrend, shape, size, additionLabel, count, withIcon, direction } = props;
  const [lines, setLines] = React.useState<LegendItem[]>(Object.keys(data[0])
    .filter((name) => name !== 'x')
    .map((item, index) => ({
      id: item,
      label: item,
      checked: true,
      color: `chart-palette-order-${index + 1}`,
    })));
  const [trendIsVisible, setTrendIsVisible] = React.useState(false);

  const onChangeDisplayLine = (key: string, isDisplay: boolean) => {
    setLines((prevDisplayedLines) => {
      return prevDisplayedLines.map((item) => {
        if (item.id === key) {
          item.checked = isDisplay;
        }

        return item;
      });
    });
  };

  React.useEffect(() => {
    setLines((prevLines) => {
      return prevLines.map((line) => {
        if (additionLabel && count) {
          line.additionalInfo = {
            label: additionLabel,
            count: count,
          };
        } else if (additionLabel && !count) {
          line.additionalInfo = {
            label: additionLabel,
          };
        } else if (!additionLabel && count) {
          line.additionalInfo = {
            count: count,
          };
        } else {
          line.additionalInfo = undefined;
        }

        if (withIcon) {
          line.icon = <DesktopIcon /> as unknown as Intergalactic.Component<'svg', IconProps>;
        } else {
          line.icon = undefined;
        }

        return line;
      });
    });
  }, [additionLabel, count, withIcon]);

  return (
    // @ts-ignore withTrend will have true in runtime. TS is slightly weirdo about it, idk.
    <ChartLegend
      direction={direction}
      shape={shape}
      size={size}
      items={lines}
      trendIsVisible={trendIsVisible}
      onChangeVisibleItem={onChangeDisplayLine}
      onTrendIsVisibleChange={setTrendIsVisible}
      aria-label='Chart legend'
      {...(withTrend && { trendLabel: 'Trend', withTrend })}
    />
  );
}

const entry: PlaygroundEntry<ChartLegendJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    direction: {
      type: 'inline-radio',
      value: 'row',
      options: ['row', 'column'],
      displayName: 'Direction',
    },
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['m', 'l'],
      displayName: 'Size',
    },
    shape: {
      type: 'select',
      value: 'Checkbox',
      options: ['Checkbox', 'Line', 'Circle', 'Square'],
      displayName: 'Shape',
    },
    withIcon: {
      type: 'boolean',
      value: false,
      displayName: 'Icon',
    },
    additionLabel: {
      type: 'text',
      value: '',
      displayName: 'Additional label',
    },
    count: {
      type: 'text',
      value: '',
      displayName: 'Counter',
    },
    withTrend: {
      type: 'boolean',
      value: false,
      displayName: 'Trend',
    },
  },
  link: createGithubLink('d3-chart'),
  filterProps: ['items', 'onChangeVisibleItem', 'onTrendIsVisibleChange'],
};

export default entry;
