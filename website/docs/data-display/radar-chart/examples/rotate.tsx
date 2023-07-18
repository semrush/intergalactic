import React from 'react';
import { Plot, Radar, colors } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinalClosed } from 'd3-shape';
import Slider from '@semcore/slider';

const scale = scaleLinear().domain([0, 10]);
export default () => {
  const width = 500;
  const height = 500;
  const [angleDegOffset, setAngleDegOffset] = React.useState(45);

  const angleOffset = React.useMemo(() => (angleDegOffset / 180) * Math.PI, [angleDegOffset]);

  return (
    <div>
      <Slider
        value={angleDegOffset}
        onChange={setAngleDegOffset}
        step={1}
        min={-360}
        max={360}
        w={360}
      />
      <div>
        Angle: {angleOffset.toFixed(2)} rad ({angleDegOffset.toFixed(0)} deg)
      </div>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale} type='circle' angleOffset={angleOffset}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1' color={colors['orange-04']} curve={curveCardinalClosed}>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
          <Radar.Polygon dataKey='data_2' color={colors['violet-04']} curve={curveCardinalClosed}>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
          <Radar.Tooltip wMin={100}>
            {({ index }) => {
              return {
                children: (
                  <>
                    <Radar.Tooltip.Title>{data.categories[index]}</Radar.Tooltip.Title>
                    <Radar.Tooltip.Dot color={colors['orange-04']}>
                      {data['data_1'][index]}
                    </Radar.Tooltip.Dot>
                    <Radar.Tooltip.Dot color={colors['violet-04']}>
                      {data['data_2'][index]}
                    </Radar.Tooltip.Dot>
                  </>
                ),
              };
            }}
          </Radar.Tooltip>
        </Radar>
      </Plot>
    </div>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
