import MiniChart from '@semcore/mini-chart';
import React from 'react';

const Demo = () => {
  return (
    <>
      <MiniChart.ScoreLine w='100px'>
        <MiniChart.ScoreLine.Segment value={70} color='chart-palette-order-7' />
        <MiniChart.ScoreLine.Segment value={30} color='chart-palette-order-10' />
      </MiniChart.ScoreLine>
      <br />
      <MiniChart.ScoreLine w='100px'>
        <MiniChart.ScoreLine.Segment value={0} color='chart-palette-order-7' />
        <MiniChart.ScoreLine.Segment value={100} color='chart-palette-order-10' />
      </MiniChart.ScoreLine>
    </>
  );
};

export default Demo;
