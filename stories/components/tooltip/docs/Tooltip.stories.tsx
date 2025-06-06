import Tooltip from '@semcore/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic_usage';
import CustomBgColorExample from './examples/custom_bg_color';
import IgnorePortalStackingExample from './examples/ignore_portal_stacking';
import InfoIconExample from './examples/info_icon';
import NestedExample from './examples/nested';
import PlacementPropertiesExample from './examples/placement-properties';
import RoleStatusExample from './examples/role-status';
import SingletonExample from './examples/singleton';
import TitleExample from './examples/title';

import { BasicUsageTest } from './__tests__/basic_usage.test';
import { CustomBgColorTest } from './__tests__/custom_bg_color.test';
import { IgnorePortalStackingTest } from './__tests__/ignore_portal_stacking.test';
import { InfoIconTest } from './__tests__/info_icon.test';
import { NestedTest } from './__tests__/nested.test';
import { SingletonTest } from './__tests__/singleton.test';
import { TitleTest } from './__tests__/title.test';

import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Documentation',
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
  play: playWrapper(BasicUsageTest),
};

export const CustomBgColor: Story = {
  render: CustomBgColorExample,
  play: playWrapper(CustomBgColorTest),
};

export const IgnorePortalStacking: Story = {
  render: IgnorePortalStackingExample,
  play: playWrapper(IgnorePortalStackingTest),

};

export const InfoIcon: Story = {
  render: InfoIconExample,
  play: playWrapper(InfoIconTest),

};

export const Nested: Story = {
  render: NestedExample,
  play: playWrapper(NestedTest),

};

export const PlacementProperties: Story = {
  render: PlacementPropertiesExample,
};

export const RoleStatus: Story = {
  render: RoleStatusExample,
};

export const Singleton: Story = {
  render: SingletonExample,
  play: playWrapper(SingletonTest),

};

export const Title: Story = {
  render: TitleExample,
  play: playWrapper(SingletonTest),

};
