import type { Meta, StoryObj } from '@storybook/react';

import Select from '@semcore/select';

import AdvancedFilteringControlExample from './docs-examples/advanced_filtering_control';
import BasicUsageExample from './docs-examples/basic_usage';
import ControlledAndUncontrolledModesExample from './docs-examples/controlled_and_uncontrolled_modes';
import CustomSelectedLabelExample from './docs-examples/custom_selected_label';
import DropdownMenuCustomizationExample from './docs-examples/dropdownmenu_customization';
import LoadingStateExample from './docs-examples/loading_state';
import MultiselectExample from './docs-examples/multiselect';
import OptionsExample from './docs-examples/options';
import OptionsFilteringExample from './docs-examples/options_filtering';
import RenderFunctionExample from './docs-examples/render_function';
import SortingMultiselectOptionsExample from './docs-examples/sorting_multiselect_options';
import TriggerCustomizationDeepExample from './docs-examples/trigger_customization_deep';
import TriggerCustomizationExample from './docs-examples/trigger_customization';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
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
