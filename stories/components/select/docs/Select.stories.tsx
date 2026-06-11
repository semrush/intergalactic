import Select from '@semcore/ui/select';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AdvancedFilteringControlTest } from './__tests__/advanced_filtering_control.test';
import { BasicUsageTest } from './__tests__/basic_usage.test';
import { OptionsFilteringTest } from './__tests__/options_filtering.test';
import { SortingMultiselectOptionsTest } from './__tests__/sorting_multiselect_options.test';
import { StickyGroupTest } from './__tests__/sticky_group.test';
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
import StickyGroupsExample from './examples/sticky_groups';
import TriggerCustomizationExample from './examples/trigger_customization';
import TriggerCustomizationDeepExample from './examples/trigger_customization_deep';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Documentation',
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const AdvancedFilteringControl: Story = {
  render: AdvancedFilteringControlExample,
  play: playWrapper(AdvancedFilteringControlTest),
};

export const BasicUsage: Story = {
  render: BasicUsageExample,
  play: playWrapper(BasicUsageTest),
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
  play: playWrapper(OptionsFilteringTest),
};

export const RenderFunction: Story = {
  render: RenderFunctionExample,
};

export const SortingMultiselectOptions: Story = {
  render: SortingMultiselectOptionsExample,
  play: playWrapper(SortingMultiselectOptionsTest),
};

export const TriggerCustomizationDeep: Story = {
  render: TriggerCustomizationDeepExample,
};

export const TriggerCustomization: Story = {
  render: TriggerCustomizationExample,
};

export const StickyGroups: Story = {
  render: StickyGroupsExample,
  play: playWrapper(StickyGroupTest),
};
