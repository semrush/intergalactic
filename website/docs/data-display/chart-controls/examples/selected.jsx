import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from '@semcore/chart';
import Card from '@semcore/card';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const UI = styled.g`
  fill: ${({ selected }) => (selected ? 'rgba(196, 199, 207, 0.3)' : 'rgba(0, 0, 0, 0)')};
  text {
    fill: #6c6e79;
  }
  &:hover {
    fill: #a9abb6;
    text {
      fill: #fff;
    }
  }
`;

let date = Date.now();

const data = [...Array(15)]
  .map(() => {
    const newDate = date;
    date -= 1000 * 60 * 60 * 24;
    return {
      date: newDate,
      traffic: Math.random().toFixed(2),
    };
  })
  .reverse();

function Tick(props) {
  const { x, y, textAnchor, stroke, payload } = props;
  const [selected, setSelected] = useState(false);
  const text = useRef(null);
  const rect = useRef(null);

  useEffect(() => {
    const textLength = text.current.getComputedTextLength();
    const box = text.current.getBBox();

    rect.current.setAttribute('width', textLength + 12);
    rect.current.setAttribute('x', box.x - 6);
    rect.current.setAttribute('y', box.y - 4);
  });

  return (
    <UI cursor="pointer" tag="g" onClick={() => setSelected(!selected)} selected={selected}>
      <rect ref={rect} ry={3} height={22} />
      <text ref={text} x={x} y={y + 6} textAnchor={textAnchor} stroke={stroke}>
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
        }).format(Number(payload.value))}
      </text>
    </UI>
  );
}

export default () => (
  <Card my="24px" pt="20px" px="24px" pb="24px" wMax="600px">
    <Flex alignItems="center" mb={6}>
      <Text size={400} medium mr={1}>
        Branded traffic trend
      </Text>
    </Flex>
    <ResponsiveContainer height={100}>
      <BarChart data={data}>
        <CartesianGrid />
        <ChartTooltip
          labelFormatter={(t) =>
            new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
            }).format(Number(t))
          }
        />
        <XAxis dataKey="date" domain={['auto', 'auto']} tick={<Tick />} />
        <YAxis dataKey="traffic" />¬
        <Bar name="ebay.com" dataKey="traffic" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);
