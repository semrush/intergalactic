import React from 'react';
import { Plot, Radar, colors } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from '@semcore/d3-chart';

export default () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale}>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Tooltip tag={Radar.Hover} wMin={100}>
          {({ index }) => {
            return {
              children: (
                <>
                  <Tooltip.Title>{data.categories[index]}</Tooltip.Title>
                  <Tooltip.Dot color={colors['orange-04']}>{data['data_1'][index]}</Tooltip.Dot>
                  <Tooltip.Dot color={colors['violet-04']}>{data['data_2'][index]}</Tooltip.Dot>
                </>
              ),
            };
          }}
        </Tooltip>
        <Radar.Polygon dataKey='data_1' color={colors['orange-04']}>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dot />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2' color={colors['violet-04']}>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dot />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = {
  'categories': ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  'data_1': [1, 3, 5, 5, 9, 2],
  'data_2': [5, 2, 1, 2, 7, 6],
};
