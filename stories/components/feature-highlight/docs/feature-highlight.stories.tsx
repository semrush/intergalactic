import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeExample from './examples/badge';
import ButtonExample from './examples/button';
import CheckboxExample from './examples/checkbox';
import DataTableExample from './examples/data-table';
import InputExample from './examples/input';
import NoticeExample from './examples/notice';
import PillsExample from './examples/pills';
import RadioExample from './examples/radio';
import SelectExample from './examples/select';
import SwitchExample from './examples/switch';
import TablineExample from './examples/tabline';

const meta: Meta = {
  title: 'Components/Feature Highlight/Documentation',
};

export const Badge: StoryObj = {
  render: BadgeExample,
};

export const Button: StoryObj = {
  render: ButtonExample,
};

export const Checkbox: StoryObj = {
  render: CheckboxExample,
};

export const DataTable: StoryObj = {
  render: DataTableExample,
};

export const Input: StoryObj = {
  render: InputExample,
};

export const Notice: StoryObj = {
  render: NoticeExample,
};

export const Pills: StoryObj = {
  render: PillsExample,
};

export const Radio: StoryObj = {
  render: RadioExample,
};

export const Select: StoryObj = {
  render: SelectExample,
};

export const Switch: StoryObj = {
  render: SwitchExample,
};

export const Tabline: StoryObj = {
  render: TablineExample,
};

export default meta;
