import type { Meta, StoryObj } from '@storybook/react';

import BasicExample from './examples/radial-tree-chart/basic';
import BasicUsageExample from './examples/radial-tree-chart/basic-usage';
import CustomSvgInCenterExample from './examples/radial-tree-chart/custom-svg-in-center';
import EdgeCasesExample from './examples/radial-tree-chart/edge-cases';
import MulticolorAndA11yExample from './examples/radial-tree-chart/multicolor-and-accessibility';
import MultilineTextExample from './examples/radial-tree-chart/multiline-text';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Radial-Tree-Chart',
};

export default meta;

export const Basic: StoryObj = {
  render: BasicExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const CustomSvgInCenter: StoryObj = {
  render: CustomSvgInCenterExample,
};

export const EdgeCases: StoryObj = {
  render: EdgeCasesExample,
};

export const MulticolorAndA11y: StoryObj = {
  render: MulticolorAndA11yExample,
};

export const MultilineText: StoryObj = {
  render: MultilineTextExample,
};