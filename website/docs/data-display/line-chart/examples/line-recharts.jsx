import React, { useState } from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  timeFormat,
  getColor,
} from '@semcore/chart';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import TabLine from '@semcore/ui/tab-line';
import Card from '@semcore/ui/card';
import Dropdown from '@semcore/ui/dropdown';
import Switch from '@semcore/ui/switch';
import SettingsS from '@semcore/ui/icon/Settings/m';

let date = Date.now();
const data = Array(200)
  .fill()
  .map(function (i, x) {
    date -= 1000 * 60 * 60 * 24;
    return {
      time: date,
      organic: Math.floor(Math.sin((x * -1.5) / Math.PI) * 100 + 200),
      paid: Math.floor(Math.sin((x * 2) / Math.PI) * 150 + 300),
    };
  })
  .reverse();

const Demo = () => {
  const [period, setPeriod] = useState('3');
  const [smooth, setSmooth] = useState(true);
  const [dot, setDot] = useState(false);
  const [lines, setLines] = useState(['organic', 'paid']);
  const [opacity, setOpacity] = useState({});

  const handleMouseEnter = (entry) => {
    const { dataKey } = entry;
    Object.keys(opacity).forEach((dataKey) => {
      opacity[dataKey] = 0.3;
    });
    opacity[dataKey] = 1;
    setOpacity({ ...opacity });
  };

  const handleMouseLeave = () => {
    Object.keys(opacity).forEach((dataKey) => {
      opacity[dataKey] = 1;
    });
    setOpacity({ ...opacity });
  };

  const chooseLines = (entry) => {
    const { dataKey } = entry;
    let newLines = lines;
    if (newLines.includes(dataKey)) {
      newLines = newLines.filter((name) => name !== dataKey);
    } else {
      newLines = [...newLines, dataKey];
    }
    setLines(newLines);
  };
  const getDataByPeriod = (data, period) => {
    const month = Number(period);
    if (month) {
      return data.slice(-period * 30);
    } else {
      return data;
    }
  };

  const dataByPeriod = getDataByPeriod(data, period);

  return (
    <Card>
      <Flex mb={2} alignItems="center">
        <Card.Title tag="h4" inline hint="This is just an example of line chart" my={0}>
          Chart heading
        </Card.Title>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger
            tag={SettingsS}
            ml="auto"
            color="gray-300"
            interactive
            aria-label="Open settings"
          />
          <Dropdown.Popper>
            <Box p={3}>
              <Text size={100} bold mb={3}>
                Chart appearance
              </Text>
              <Flex py={1} alignItems="center">
                <Box size={100} mr="3">
                  Smooth line
                </Box>
                <Box ml="auto">
                  <Switch size="m" theme="success">
                    <Switch.Value checked={smooth} onChange={() => setSmooth(!smooth)} />
                  </Switch>
                </Box>
              </Flex>
              <Flex py={1} alignItems="center">
                <Box size={100} mr="3">
                  Dots
                </Box>
                <Box ml="auto">
                  <Switch size="m" theme="success">
                    <Switch.Value checked={dot} onChange={() => setDot(!dot)} />
                  </Switch>
                </Box>
              </Flex>
            </Box>
          </Dropdown.Popper>
        </Dropdown>
      </Flex>
      <Card.Description>Subinfo about data represented on the chart (optional)</Card.Description>
      <ResponsiveContainer aspect={2}>
        <LineChart data={dataByPeriod}>
          <CartesianGrid />
          <Legend verticalAlign="top" style={{ alignItems: 'baseline' }}>
            <Legend.Controls
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onChange={chooseLines}
            />
            <TabLine value={period} onChange={setPeriod} size="m" underlined={false} w="auto">
              <TabLine.Item value="1" mx={2}>
                <Box pb={1}>1M</Box>
              </TabLine.Item>
              <TabLine.Item value="3" mx={2}>
                <Box pb={1}>3M</Box>
              </TabLine.Item>
              <TabLine.Item value="6" mx={2}>
                <Box pb={1}>6M</Box>
              </TabLine.Item>
              <TabLine.Item value="12" mx={2}>
                <Box pb={1}>1Y</Box>
              </TabLine.Item>
              <TabLine.Item value="all" mx={2}>
                <Box pb={1}>All time</Box>
              </TabLine.Item>
            </TabLine>
          </Legend>
          <XAxis
            dataKey="time"
            scale="time"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={timeFormat(['day', 'month'])}
          />
          <YAxis width={40} />
          <Tooltip labelFormatter={timeFormat(['month', 'day', 'year'])} />
          <Line
            type={smooth ? 'monotone' : 'linear'}
            dot={dot}
            name="Organic traffic"
            dataKey="organic"
            stroke={getColor('organic')}
            fill={getColor('organic')}
            strokeOpacity={opacity['organic']}
            hide={!lines.includes('organic')}
          />

          <Line
            type={smooth ? 'monotone' : 'linear'}
            dot={dot}
            name="Paid traffic"
            dataKey="paid"
            stroke={getColor('paid')}
            fill={getColor('paid')}
            strokeOpacity={opacity['paid']}
            hide={!lines.includes('paid')}
          />
          <ReferenceLine x={dataByPeriod[dataByPeriod.length - 7].time}>
            <Label position="left" angle={-90} offset={10}>
              Last 7 days
            </Label>
          </ReferenceLine>
          <ReferenceArea
            x1={dataByPeriod[dataByPeriod.length - 7].time}
            x2={dataByPeriod[dataByPeriod.length - 1].time}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Demo;
