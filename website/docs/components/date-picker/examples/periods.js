import React from 'react';
import { DateRangePicker } from '@semcore/date-picker';

function Demo() {
  const pastYear = new Date();
  pastYear.setFullYear(pastYear.getFullYear() - 1);
  const past7days = new Date();
  past7days.setDate(past7days.getDate() - 7);
  const past14days = new Date();
  past14days.setDate(past14days.getDate() - 14);

  const periods = [
    { children: 'Last 7 days', value: [past7days, new Date()] },
    { children: 'Last 14 days', value: [past14days, new Date()] },
    { children: 'Last Year 🎄', value: [pastYear, new Date()] },
  ];
  return <DateRangePicker periods={periods} />;
}

export default Demo;
