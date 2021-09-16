import React from 'react';
import { Plot, Donut } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

export default () => {
  return (
    <Plot width={300} height={150} data={data}>
      <Donut halfsize innerRadius={100}>
        <Donut.Pie dataKey="speed" />
        <Donut.Pie dataKey="other" color="#E4ECF1" />
        <Donut.Label>
          <Text tag="tspan" x="0" dy="-1.2em" fill="#757575" size={400}>
            Keyword volume
          </Text>
        </Donut.Label>
      </Donut>
    </Plot>
  );
};

const data = {
  speed: 3,
  other: 200,
};
