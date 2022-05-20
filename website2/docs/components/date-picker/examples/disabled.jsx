import React from 'react';
import { DatePicker } from '@semcore/date-picker';

function Demo() {
  const today = new Date();
  return <DatePicker disabled={[new Date(today.getFullYear(), 0, 1), [today, false], '* * 6,7']} />;
}

export default Demo;
