import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '@semcore/tooltip';

import BasicUsageExample from './examples/basic_usage';
import CustomBgColorExample from './examples/custom_bg_color';
import IgnorePortalStackingExample from './examples/ignore_portal_stacking';
import InfoIconExample from './examples/info_icon';
import NestedExample from './examples/nested';
import PlacementPropertiesExample from './examples/placement-properties';
import RoleStatusExample from './examples/role-status';
import SingletonExample from './examples/singleton';
import TitleExample from './examples/title';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const CustomBgColor: Story = {
  render: CustomBgColorExample,
};

export const IgnorePortalStacking: Story = {
  render: IgnorePortalStackingExample,
};

export const InfoIcon: Story = {
  render: InfoIconExample,
};

export const Nested: Story = {
  render: NestedExample,
};

export const PlacementProperties: Story = {
  render: PlacementPropertiesExample,
};

export const RoleStatus: Story = {
  render: RoleStatusExample,
};

export const Singleton: Story = {
  render: SingletonExample,
};

export const Title: Story = {
  render: TitleExample,
};
