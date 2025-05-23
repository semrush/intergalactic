import type { Meta, StoryObj } from '@storybook/react';

import AdvancedUsageExample from './examples/bar-horizontal-compact/advanced_usage';
import ClickableAdvancedExample from './examples/bar-horizontal-compact/clickable_advanced';
import BasicUsageExample from './examples/bar-horizontal-compact/basic_usage';
import ClickableBasicExample from './examples/bar-horizontal-compact/clickable_basic';
import LinksExample from './examples/bar-horizontal-compact/links';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Bar-Horizontal-Compact',
};

export default meta;

export const AdvancedUsage: StoryObj = {
  render: AdvancedUsageExample,
};

export const ClickableAdvanced: StoryObj = {
  render: ClickableAdvancedExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const ClickableBasic: StoryObj = {
  render: ClickableBasicExample,
};

export const Links: StoryObj = {
  render: LinksExample,
};