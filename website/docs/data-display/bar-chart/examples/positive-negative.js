import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  Tooltip as TooltipChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  timeFormat,
  getColor,
} from '@semcore/chart';
import Card from '@semcore/card';

let date = Date.now();

const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const intFormatter = (number) => {
  let num = number / 1000000;
  const afterDot = num.toString().split('.')[1];
  if (afterDot && afterDot.length > 2) {
    num = num.toFixed(2);
  }
  return num + 'M';
};

const data = [...Array(15)]
  .map(() => {
    const newDate = date;
    date -= 1000 * 60 * 60 * 24;
    return {
      date: newDate,
      new: getRandomInt(90000, 2000000),
      lost: -getRandomInt(90000, 2000000),
    };
  })
  .reverse();

const Demo = () => {
  const [bars, updateBars] = useState(['new', 'lost']);
  const [opacity, updateOpacity] = useState({});

  const handleMouseEnter = (entry) => {
    const { dataKey } = entry;
    Object.keys(opacity).forEach((dataKey) => {
      opacity[dataKey] = 0.3;
    });
    opacity[dataKey] = 1;
    updateOpacity({ ...opacity });
  };

  const handleMouseLeave = () => {
    Object.keys(opacity).forEach((dataKey) => {
      opacity[dataKey] = 1;
    });
    updateOpacity({ ...opacity });
  };

  const chooseBars = (entry) => {
    const { dataKey } = entry;
    let newBars = bars;
    if (newBars.includes(dataKey)) {
      newBars = newBars.filter((name) => name !== dataKey);
    } else {
      newBars = [...newBars, dataKey];
    }
    updateBars(newBars);
  };
  return (
    <Card my="24px" pt="20px" px="24px" pb="24px" wMax="800px">
      <Card.Title hint="This is just an example of bar chart">Keywords</Card.Title>
      <ResponsiveContainer height={180}>
        <BarChart stackOffset="sign" data={data}>
          <Legend verticalAlign="top">
            <Legend.Controls
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={chooseBars}
            />
          </Legend>
          <CartesianGrid />
          <TooltipChart labelFormatter={timeFormat(['month', 'day', 'year'])} />
          <YAxis tickFormatter={(t) => intFormatter(t)} />
          <XAxis
            dataKey="date"
            domain={['auto', 'auto']}
            tickFormatter={timeFormat(['day', 'month'])}
          />
          <Bar
            name="Lost"
            dataKey="lost"
            barSize={20}
            fill={'#ff8e29'}
            stackId="stack"
            fill={getColor('lost')}
            opacity={opacity['lost']}
            hide={!bars.includes('lost')}
          />
          <Bar
            name="New"
            dataKey="new"
            barSize={20}
            stackId="stack"
            fill={getColor('new')}
            opacity={opacity['new']}
            hide={!bars.includes('new')}
          />
          }
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Demo;
