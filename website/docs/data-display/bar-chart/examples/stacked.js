import React from 'react';
import {
  BarChart,
  Bar,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from '@semcore/chart';
import Card from '@semcore/card';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Checkbox from '@semcore/checkbox';

const BAR_TO_LABEL_MAP = {
  top3: 'Top 3',
  top10: '4-10',
  top20: '11-20',
  top50: '21-50',
  top100: '51-100',
};

const BAR_COLOR_MAP = {
  top3: '#ffc83f',
  top10: '#91c7ef',
  top20: '#50aef4',
  top50: '#0e75c2',
  top100: '#084c80',
};

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
      top3: getRandomInt(12000000, 14000000),
      top10: getRandomInt(15000000, 17000000),
      top20: getRandomInt(14000000, 15000000),
      top50: getRandomInt(18000000, 20000000),
      top100: getRandomInt(9000000, 12000000),
    };
  })
  .reverse();

export default class Demo extends React.Component {
  state = {
    bars: ['top3', 'top10', 'top20', 'top50', 'top100'],
  };

  handleCheckedBar = (name) => (e) => {
    const isEnable = this.state.bars.includes(name);
    let bars = [];
    const sortFn = (a, b) => a.split('top')[1] - b.split('top')[1];
    if (isEnable) {
      bars = this.state.bars.filter((line) => line !== name);
    } else {
      bars = this.state.bars.concat([name]);
    }
    this.setState({ bars: bars.sort(sortFn) });
  };

  renderCheck(name) {
    const { bars } = this.state;
    return (
      <Box mr={2}>
        <Checkbox theme={BAR_COLOR_MAP[name]} size="m">
          <Checkbox.Value checked={bars.includes(name)} onChange={this.handleCheckedBar(name)} />
          <Checkbox.Text>{BAR_TO_LABEL_MAP[name]}</Checkbox.Text>
        </Checkbox>
      </Box>
    );
  }

  render() {
    const { bars } = this.state;

    return (
      <Card my="24px" pt="20px" px="24px" pb="24px" wMax="800px">
        <Box mb={6}>
          <Text tag="h3" size={400} medium m="0 0 8px 0">
            Organic Keyword Trend
          </Text>
          <Flex mt="12px">
            {this.renderCheck('top3', 'Top 3')}
            {this.renderCheck('top10', '4-10')}
            {this.renderCheck('top20', '11-20')}
            {this.renderCheck('top50', '21-50')}
            {this.renderCheck('top100', '51-100')}
          </Flex>
        </Box>
        <ResponsiveContainer height={180}>
          <BarChart data={data}>
            <CartesianGrid />
            <ChartTooltip
              labelFormatter={(t) =>
                new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(Number(t))
              }
            />
            <YAxis tickFormatter={intFormatter} />
            <XAxis
              dataKey="date"
              domain={['auto', 'auto']}
              tickFormatter={(t) =>
                new Intl.DateTimeFormat('en-US', {
                  day: 'numeric',
                  month: 'short',
                }).format(t)
              }
            />
            {bars.reverse().map((bar, idx) => {
              const spread = idx === bars.length - 1 ? {} : { radius: 0 };
              return (
                <Bar
                  name={BAR_TO_LABEL_MAP[bar]}
                  key={bar}
                  dataKey={bar}
                  fill={BAR_COLOR_MAP[bar]}
                  stackId="ID"
                  barSize={20}
                  {...spread}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
  }
}
