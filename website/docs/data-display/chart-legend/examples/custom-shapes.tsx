import React from 'react';
import { ChartLegend, LegendItem } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';

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

const Shape = (props) => {
  const { color } = props;

  return (
    <div
      style={{
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderLeft: `16px solid ${color}`,
        borderBottom: '8px solid transparent',
        marginRight: '4px',
      }}
    />
  );
};

export default () => {
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
      <ChartLegend.Flex
        items={lines}
        onChangeVisibleItem={onChangeDisplayLine}
        trendIsVisible={trendIsVisible}
        onChangeTrendVisible={(isVisible) => setTrendIsVisible(isVisible)}
      >
        <ChartLegend.Flex.LegendItem>
          <ChartLegend.Flex.LegendItem.Shape style={{ background: 'transparent' }}>
            {(props) => {
              return <Shape {...props} />;
            }}
          </ChartLegend.Flex.LegendItem.Shape>
          <ChartLegend.Flex.LegendItem.Label />
        </ChartLegend.Flex.LegendItem>
      </ChartLegend.Flex>
    </div>
  );
};
