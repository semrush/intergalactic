import type { Meta, StoryObj } from '@storybook/react';

import BasicUsageExample from './examples/venn-chart/basic-usage';
import LegendAndPatternFillExample from './examples/venn-chart/legend-and-pattern-fill';
import CustomIntersectionsStylesExample from './examples/venn-chart/custom-intersection-styles';
import SettingOrientationExample from './examples/venn-chart/setting-orientation';
import VennExample from './examples/venn-chart/venn';


const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Venn-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};

export const CustomIntersectionsStyles: StoryObj = {
  render: CustomIntersectionsStylesExample,
};

export const SettingOrientation: StoryObj = {
  render: SettingOrientationExample,
};

export const Venn: StoryObj = {
  render: VennExample,
};