import type { Meta, StoryObj } from '@storybook/react';

import Select from '@semcore/select';

import AdvancedFilteringControlExample from './examples/advanced_filtering_control';
import BasicUsageExample from './examples/basic_usage';
import ControlledAndUncontrolledModesExample from './examples/controlled_and_uncontrolled_modes';
import CustomSelectedLabelExample from './examples/custom_selected_label';
import DropdownMenuCustomizationExample from './examples/dropdownmenu_customization';
import LoadingStateExample from './examples/loading_state';
import MultiselectExample from './examples/multiselect';
import OptionsExample from './examples/options';
import OptionsFilteringExample from './examples/options_filtering';
import RenderFunctionExample from './examples/render_function';
import SortingMultiselectOptionsExample from './examples/sorting_multiselect_options';
import TriggerCustomizationDeepExample from './examples/trigger_customization_deep';
import TriggerCustomizationExample from './examples/trigger_customization';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Documentation',
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const AdvancedFilteringControl: Story = {
  render: AdvancedFilteringControlExample,
};

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const ControlledAndUncontrolledModes: Story = {
  render: ControlledAndUncontrolledModesExample,
};

export const CustomSelectedLabel: Story = {
  render: CustomSelectedLabelExample,
};

export const DropdownMenuCustomization: Story = {
  render: DropdownMenuCustomizationExample,
};

export const LoadingState: Story = {
  render: LoadingStateExample,
};

export const Multiselect: Story = {
  render: MultiselectExample,
};

export const Options: Story = {
  render: OptionsExample,
};

export const OptionsFiltering: Story = {
  render: OptionsFilteringExample,
};

export const RenderFunction: Story = {
  render: RenderFunctionExample,
};

export const SortingMultiselectOptions: Story = {
  render: SortingMultiselectOptionsExample,
};

export const TriggerCustomizationDeep: Story = {
  render: TriggerCustomizationDeepExample,
};

export const TriggerCustomization: Story = {
  render: TriggerCustomizationExample,
};
