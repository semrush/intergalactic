import React from 'react';
import { Plot, CigaretteBar, scaleToBand, HoverRect } from 'intergalactic/d3-chart';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const plotWidth = 400;
const plotHeight = 28;
const wMin = 2;

function Demo() {
  let offset = 0;
  let max = 0;

  Object.values(data).forEach((value) => {
    max = max + value;
  });

  const categoryScale = scaleBand<{}>([0], [plotHeight, 0]);

  const valueScale = scaleLinear().range([0, plotWidth]).domain([0, max]);

  return (
    <Plot data={data} width={400} height={28} scale={[valueScale, categoryScale]}>
      {Object.entries(data).map(([key, value], index) => {
        const absWidth = Math.abs(
          valueScale(value) - Math.max(valueScale(valueScale.domain()[0]), valueScale(0)),
        );
        const height = scaleToBand(categoryScale).bandwidth() - 4;
        const width = value === 0 ? 0 : Math.max(absWidth, wMin * 2) - wMin;
        const y = 2;
        const x = index === 0 ? 0 : offset;
        const r = index === 0 || index === Object.keys(data).length - 1 ? 4 : 0;
        const color = `blue-${5 - index}00`;

        offset = offset + width + wMin;

        return (
          <CigaretteBar
            key={key}
            dataKey={key}
            index={index}
            y={y}
            x={x}
            width={width}
            height={height}
            r={r}
            color={color}
            direction={'horizontal'}
          />
        );
      })}

      <HoverRect.Tooltip x={''} wMin={100} hideHoverLine={true}>
        {(tooltipProps: any) => {
          const dataKey = tooltipProps.xIndex;

          return {
            children: (
              <Flex justifyContent='space-between' key={dataKey}>
                <HoverRect.Tooltip.Dot mr={4}>{dataKey}</HoverRect.Tooltip.Dot>
                <Text bold>{data[dataKey]}</Text>
              </Flex>
            ),
          };
        }}
      </HoverRect.Tooltip>
    </Plot>
  );
}

const data = {
  Cats: 3524,
  Dogs: 1344,
  Capybaras: 6135,
  Hamsters: 1456,
  Birds: 1823,
};

export default Demo;
