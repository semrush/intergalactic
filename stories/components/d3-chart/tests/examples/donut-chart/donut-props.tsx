import { Flex } from '@semcore/ui/base-components';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import type { DonutProps } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export interface DonutPropsWithLabel extends DonutProps {
  showLabel?: boolean;
  showTooltip?: boolean;
  data?: { [key: string]: number };
}

const Demo = (props: DonutPropsWithLabel) => {
  const {
    innerRadius,
    outerRadius,
    paddingAngle,
    duration,
    halfsize,
    patterns,
    showLabel = true,
    showTooltip = true,
    data = defaultData,
  } = props;

  return (
    <Plot width={300} height={300} data={data}>
      <Donut
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={paddingAngle}
        duration={duration}
        halfsize={halfsize}
        patterns={patterns}
      >
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' name='Pie 2' />
        <Donut.Pie dataKey='c' name='Pie 3' />
        {showLabel && (
          <Donut.Label>
            <Text tag='tspan' color='text-primary' size={100}>
              Donut Chart
            </Text>
          </Donut.Label>
        )}
      </Donut>
      {showTooltip && (
        <Donut.Tooltip>
          {({ dataKey, name }) => {
            return {
              children: (
                <>
                  <Donut.Tooltip.Title>{name}</Donut.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    {/* @ts-ignore */}
                    <Text bold>{data[dataKey]}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </Donut.Tooltip>
      )}
    </Plot>
  );
};

const defaultData = {
  a: 3,
  b: 1,
  c: 2,
};

export const defaultProps: DonutPropsWithLabel = {
  innerRadius: 0,
  outerRadius: undefined,
  paddingAngle: 0,
  duration: 500,
  halfsize: false,
  patterns: undefined,
  showLabel: true,
  showTooltip: true,
  data: defaultData,
};

Demo.defaultProps = defaultProps;

export default Demo;
