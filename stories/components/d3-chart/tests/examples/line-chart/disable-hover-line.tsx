import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
    const MARGIN = 40;
    const width = 500;
    const height = 300;

    const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

    const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

    return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
                <YAxis.Ticks />
                <YAxis.Grid />
            </YAxis>
            <XAxis>
                <XAxis.Ticks />
            </XAxis>
            <HoverLine.Tooltip
    x="x"
    wMin={100}
    hideHoverLine={(xIndex) => xIndex !== null && xIndex >= 5}
>
    {({ xIndex }) => ({
        children: xIndex !== null ? (
            <>
                <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>
                <Flex justifyContent="space-between">
                    <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                    <Text bold>{data[xIndex].y}</Text>
                </Flex>
            </>
        ) : (
            <></> 
        ),
    })}
</HoverLine.Tooltip>
            <Line x="x" y="y" />
        </Plot>
    );
};

const data = Array.from({ length: 20 }, (_, i) => ({
    x: i,
    y: (i % 5) + 2, 
}));


export default Demo;
