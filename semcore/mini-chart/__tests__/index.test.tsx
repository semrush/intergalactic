import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { Box, Flex } from '@semcore/flex-box';

import MiniChart from '../src';

describe('MiniChart', () => {
    describe('MiniChart.Score', () => {
        beforeEach(cleanup);

        test.concurrent('renders Donuts', async ({task}) => {
            const component = (
                <Box w={'500px'}>
                    <Flex flexWrap={true} alignItems={'flex-end'}>
                        <MiniChart.ScoreDonut value={30} w={'50px'}/>
                        <MiniChart.ScoreSemiDonut value={45} w={'50px'}/>
                        <MiniChart.ScoreDonut loading={true} value={30} w={'50px'}/>
                        <MiniChart.ScoreSemiDonut loading={true} value={30} w={'50px'}/>
                    </Flex>
                    <br/>
                    <Flex flexWrap={true} alignItems={'flex-end'}>
                        {new Array(16).fill(null).map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <MiniChart.ScoreDonut
                                        value={30}
                                        w={'50px'}
                                        color={`chart-palette-order-${index + 2}`}
                                    />
                                    <MiniChart.ScoreSemiDonut
                                        value={30}
                                        w={'50px'}
                                        color={`chart-palette-order-${index + 2}`}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Flex>
                </Box>
            );
            await expect(await snapshot(component)).toMatchImageSnapshot(task);
        });

        test.concurrent('renders Lines', async ({task}) => {
            const component = (
                <Box w={'500px'}>
                    <Flex flexWrap={true} alignItems={'flex-end'}>
                        <MiniChart.ScoreLine value={30} w={'80px'}/>
                        &nbsp;
                        <MiniChart.ScoreLine loading={true} value={30} w={'80px'}/>
                        &nbsp;
                        <MiniChart.ScoreLine segments={5} value={2} w={'80px'}/>
                        &nbsp;
                        <MiniChart.ScoreLine loading={true} segments={5} value={2} w={'80px'}/>
                    </Flex>
                    <br/>
                    {new Array(16).fill(null).map((_, index) => {
                        return (
                            <Flex key={index} m={'4px'}>
                                <MiniChart.ScoreLine
                                    value={30}
                                    w={'80px'}
                                    color={`chart-palette-order-${index + 2}`}
                                />
                                &nbsp;
                                <MiniChart.ScoreLine
                                    segments={3}
                                    value={2}
                                    w={'80px'}
                                    color={`chart-palette-order-${index + 2}`}
                                />
                                <br/>
                            </Flex>
                        );
                    })}
                </Box>
            );
            await expect(await snapshot(component)).toMatchImageSnapshot(task);
        });
    });

    describe('MiniChart.Trend', () => {
        beforeEach(cleanup);

        test.concurrent('renders Bars', async ({task}) => {
            const data = [
                {value: 10},
                {value: 20},
                {value: 50},
                {value: 80, color: 'chart-palette-order-1'},
                {value: 45},
                {value: 66, color: 'chart-palette-order-5'},
            ];

            const component = (
                <Flex>
                    <MiniChart.TrendBar data={data}/>
                    <MiniChart.TrendBar data={data} loading={true}/>
                    <MiniChart.TrendHistogram data={data}/>
                    <MiniChart.TrendHistogram data={data} loading={true}/>
                </Flex>
            );
            await expect(await snapshot(component)).toMatchImageSnapshot(task);
        });

        test.concurrent('renders Lines', async ({task}) => {
            const data = [10, 20, 50, 80, 45, 66];

            const component = (
                <Flex>
                    <MiniChart.TrendLine data={data}/>
                    <MiniChart.TrendLine data={data} loading={true}/>
                    <MiniChart.TrendArea data={data}/>
                    <MiniChart.TrendArea data={data} loading={true}/>
                    <MiniChart.TrendLine data={data} lastPointColor={'chart-palette-order-4'}/>
                    <MiniChart.TrendArea data={data} lastPointColor={'chart-palette-order-7'}/>
                </Flex>
            );
            await expect(await snapshot(component)).toMatchImageSnapshot(task);
        });
    });
});
