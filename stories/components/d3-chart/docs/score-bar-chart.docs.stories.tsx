import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/score-bar-chart/basic-usage';
import ClickableExample from './examples/score-bar-chart/clickable_basic';
import CompactBarExample from './examples/score-bar-chart/compact-bar';
import LinksExample from './examples/score-bar-chart/links';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Score-Bar-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const CompactBar: StoryObj = {
  render: CompactBarExample,
};

export const Links: StoryObj = {
  render: LinksExample,
};

export const Clickable: StoryObj = {
  render: ClickableExample,
};
