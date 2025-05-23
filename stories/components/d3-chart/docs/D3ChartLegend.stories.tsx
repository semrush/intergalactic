import type { Meta, StoryObj } from '@storybook/react';

import ChartLegendExample from './examples/ChartLegend';

const meta: Meta = {
    title: 'Components/d3Charts/Documentation/ChartLegend',
};

export default meta;

export const ChartLegend: StoryObj = {
    render: ChartLegendExample,
};
