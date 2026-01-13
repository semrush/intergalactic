import { Flex } from '@semcore/ui/base-components';
import { Plot, Radar, getLabelOffsetPosition } from '@semcore/ui/d3-chart';
import Tag from '@semcore/ui/tag';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  const width = 250;
  const height = 250;

  const scale = scaleLinear().domain([0, 10]);
  const maxLabelWidth = 50;

  return (
    <Flex>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale} offset={maxLabelWidth}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels>
              {(props) => {
                const width = maxLabelWidth;
                const height = 20;
                const [xOffset, yOffset] = getLabelOffsetPosition(
                  props.xDirection,
                  props.yDirection,
                  width,
                  height,
                );
                return {
                  tag: 'g',
                  children: (
                    <foreignObject
                      x={props.x - xOffset}
                      y={props.y - yOffset}
                      width={width}
                      height={height}
                    >
                      <Tag>{props.children}</Tag>
                    </foreignObject>
                  ),
                };
              }}
            </Radar.Axis.Labels>
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </Flex>
  );
};

const data = RadarMockData.SingleData;

export default Demo;
