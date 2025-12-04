import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React, { useState, useMemo } from 'react';

const Demo = ({ data }: { data: any[] }) => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const indexes = data.map((_: any, index: number) => String(index));

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(indexes);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks multiline={true}>
          {({ value }) => {
            console.log(value, data);
            const val = data[Number(value)].x;
            return {
              value: val,
              children: val,
            };
          }}
        </XAxis.Ticks>
      </XAxis>
      <Line x='index' y='y'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = Array(5)
  .fill({})
  .map((_d, i) => ({
    x: 'Label Text ' + i * 2,
    y: (i + 1) * 2,
    index: i,
  }));

const data1 = Array(20)
  .fill({})
  .map((_d, i) => ({
    x: 'Label Text ' + i * 2,
    y: (i + 1) % 10,
    index: i,
  }));

const App = () => {
  const [stat, setStat] = useState(false);
  const datuw = useMemo(() => {
    return stat ? data : data1;
  }, [stat]);
  return (
    <>
      <Demo data={datuw} />
      <button onClick={() => (stat ? setStat(false) : setStat(true))}>
        break chart
      </button>
    </>
  );
};

export default App;
