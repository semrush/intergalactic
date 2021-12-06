import React from 'react';
import {
  CartesianGrid,
  Line,
  Area,
  LineChart,
  AreaChart,
  BarChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceDot,
  getColor,
  DefaultTooltipContent,
} from '@semcore/chart';
import { Box } from '@semcore/flex-box';

let data = [
  { date: 1525132800000, 'onliner.by': 37588, 'semrush.com': 35396 },
  { date: 1530403200000, 'onliner.by': 35967, 'semrush.com': 35349 },
  { date: 1541030400000, 'onliner.by': 51681, 'semrush.com': 35380 },
  { date: 1543622400000, 'onliner.by': 55419, 'semrush.com': 40007 },
  { date: 1546300800000, 'onliner.by': 53150, 'semrush.com': 42141 },
  { date: 1548979200000, 'onliner.by': 55575, 'semrush.com': 42179 },
  { date: 1551979200000, 'onliner.by': 67454, 'semrush.com': 44119 },
];

const converValueThousand = (str) => {
  const parts = String(str).split('.');
  const main = parts[0];
  const length = main.length;
  let output = '';
  let i = length - 1;

  while (i >= 0) {
    output = main.charAt(i) + output;
    if ((length - i) % 3 === 0 && i > 0) {
      output = `,${output}`;
    }
    i -= 1;
  }

  if (parts.length > 1) {
    output += `.${parts[1]}`;
  }
  return output;
};

DefaultTooltipContent.prototype.render = function() {
  const { labelFormatter, label } = this.props;
  return (
    <div className="recharts-default-tooltip">
      <p className="recharts-tooltip-label">{label && labelFormatter(label)}</p>
      {this.renderContent()}
      {label === data[3].date && (
        <Box m="16px -12px -12px" px={3} py={1} style={{ background: '#f5f5f5' }}>
          {label && labelFormatter(label)} start tracking
        </Box>
      )}
    </div>
  );
};

const Demo = () => (
  <ResponsiveContainer height={200}>
    <LineChart data={data}>
      <CartesianGrid />
      <XAxis
        dataKey="date"
        type="number"
        scale="time"
        domain={['auto', 'auto']}
        tickFormatter={(t) =>
          new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
          }).format(t)
        }
      />
      <YAxis
        tickFormatter={(number) => {
          let num = number / 1000;
          const afterDot = num.toString().split('.')[1];
          if (afterDot && afterDot.length > 2) {
            num = num.toFixed(2);
          }
          return num + 'k';
        }}
      />
      <Tooltip
        labelFormatter={(t) =>
          new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(Number(t))
        }
        formatter={(value) => converValueThousand(value)}
        content={<DefaultTooltipContent />}
      />
      <Line
        connectNulls
        type="monotone"
        dataKey="onliner.by"
        name={'onliner.by (Google.com) Total Keywords (Organic):'}
        stroke={getColor('onliner.by')}
        fill={getColor('onliner.by')}
      />
      <Line
        connectNulls
        type="monotone"
        dataKey="semrush.com"
        stroke={getColor('semrush.com')}
        fill={getColor('semrush.com')}
      />
      <ReferenceLine x={data[3].date} />
      <ReferenceDot
        x={data[3].date}
        y={data[3]['semrush.com']}
        fill={getColor('semrush.com')}
        r={8}
        strokeWidth={2}
        stroke="#fff"
      />
      <ReferenceDot
        x={data[3].date}
        y={data[3]['onliner.by']}
        fill={getColor('onliner.by')}
        r={8}
        strokeWidth={2}
        stroke="#fff"
      />
    </LineChart>
  </ResponsiveContainer>
);

export default Demo;
