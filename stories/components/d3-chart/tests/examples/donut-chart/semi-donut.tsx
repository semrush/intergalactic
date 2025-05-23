import React from 'react';
import { Plot, Donut, } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

const data = {
  speed: 3,
  other: 200,
};


const Demo = () => {
  return (
    <Plot width={300} height={150} data={data}>
      <Donut halfsize innerRadius={100}>
        <Donut.Pie dataKey='speed' name ='1'/>
        <Donut.Pie dataKey='other' color='#C4C7CF' name ='2'/>
        <Donut.Label>
          <Text tag='tspan' x='0' dy='-1.2em' fill='#6C6E79' size={400}>
            Keyword volume
          </Text>
        </Donut.Label>
      </Donut>
    </Plot>
  );
};



export default Demo;
