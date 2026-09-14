import type { Meta } from '@storybook/react-vite';

import BasicUsageExample, {
  defaultProps as basicUsageProps,
  dataAllTiny,
  dataEqual,
  dataMultipleTiny,
  dataOverflow,
  dataTinyValue,
  dataWithZero,
  dataFirstEmpty,
  dataLastZero,
  dataEmpty,
  dataNA,

} from './examples/cigarette-chart/basic-usage';
import { getChartArgTypes } from './examples/stories_props_helper';
const dataVariations = {
  default: basicUsageProps.data,
  tinyValue: dataTinyValue,
  multipleTiny: dataMultipleTiny,
  equal: dataEqual,
  withZero: dataWithZero,
  allTiny: dataAllTiny,
  overflow: dataOverflow,
  dataNA: dataNA,
  firstEmpty: dataFirstEmpty,
  lastZero: dataLastZero,
  empty: dataEmpty,
};
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Cigarette-Chart',
};
export default meta;
export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    showPercentValueInTooltip: { control: { type: 'boolean' } },
    tooltipTitle: { control: { type: 'text' } },
    tooltipViewType: { control: { type: 'select' }, options: ['all', 'single'] },
    enableMinimalBarWidth: { control: { type: 'boolean' } },
    minimalBarWidth: { control: { type: 'number' } },
    percentFormatter: {
      control: { type: 'select' },
      options: ['none', 'round', 'floor', 'ceil', 'oneDecimal', 'twoDecimal'],
      mapping: {
        none: undefined,
        round: (v: number) => Math.round(v),
        floor: (v: number) => Math.floor(v),
        ceil: (v: number) => Math.ceil(v),
        oneDecimal: (v: number) => Number(v.toFixed(1)),
        twoDecimal: (v: number) => Number(v.toFixed(2)),
      },
    },
    duration: { control: { type: 'number' } },
    data: {
      control: { type: 'select' },
      options: Object.keys(dataVariations),
      mapping: dataVariations,
    },
  }),
  args: basicUsageProps,
};
