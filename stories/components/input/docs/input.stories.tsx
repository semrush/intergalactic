import type { Meta, StoryObj } from '@storybook/react';

import InputWithSubmitButtonExample from './examples/input_with_a_submit_icon';
import InputWithTextAddonExample from './examples/input_with_a_text_addon';
import InputWithMultipleAddonsExample from './examples/input_with_multiple_addons';
import InputWithOtherComponentInsideExample from './examples/input_with_a_text_addon';
import InputWithTheClearingAbilityExample from './examples/input_with_the_clearing_ability';
import LoadingStateInTheInputExample from './examples/loading_state_in_the_input';
import PasswordInputExample from './examples/password_input';

const meta: Meta = {
  title: 'Components/Input/Documentation',
};

export default meta;
type Story = StoryObj;

export const InputWithSubmitButton: Story = {
  render: InputWithSubmitButtonExample,
};

export const InputWithTextAddon: Story = {
    render: InputWithTextAddonExample,
  };

  export const InputWithMultipleAddons: Story = {
    render: InputWithMultipleAddonsExample,
  };

  export const InputWithOtherComponentInside: Story = {
    render: InputWithOtherComponentInsideExample,
  };

  export const InputWithTheClearingAbility: Story = {
    render: InputWithTheClearingAbilityExample,
  };
  
  export const LoadingStateInTheInput: Story = {
    render: LoadingStateInTheInputExample,
  };

  export const PasswordInput: Story = {
    render: PasswordInputExample,
  };