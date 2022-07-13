import React from 'react';
import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from '@semcore/chart';

let date = Date.now();
const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const data = [...Array(5)].map(() => {
  const newDate = date;
  date -= 1000 * 60 * 60 * 24;
  return {
    date: newDate,
    new: getRandomInt(90000, 2000000),
  };
});

function formatDate(time) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
  }).format(time);
}

export default () => (
  <ResponsiveContainer height={300}>
    <BarChart data={data} layout="vertical">
      <CartesianGrid />
      <Tooltip labelFormatter={formatDate} />
      <XAxis type="number" />
      <YAxis dataKey="date" tickFormatter={formatDate} type="category" />
      <Bar dataKey="new" />
    </BarChart>
  </ResponsiveContainer>
);
