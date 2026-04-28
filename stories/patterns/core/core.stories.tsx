import type { Meta, StoryObj } from '@storybook/react-vite';

import AllComponentsExample from './tests/all-components';
import LinkButtonLinkTextCombinationExample, { defaultProps as combinationDefaultProps } from './tests/combination-link-button-link-text';
const meta: Meta = {
  title: 'Patterns/Core/Tests',
};
export default meta;
type Story = StoryObj<typeof meta>;
export const LinkButtonLinkTextCombination: StoryObj<typeof combinationDefaultProps> = {
  render: LinkButtonLinkTextCombinationExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [100, 200, 300, 400, 500, 600, 700, 800],
    },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    linkShowAddonLeft: {
      control: { type: 'boolean' },
    },
    linkShowAddonRight: {
      control: { type: 'boolean' },
    },
    buttonLinkShowAddonLeft: {
      control: { type: 'boolean' },
    },
    buttonLinkShowAddonRight: {
      control: { type: 'boolean' },
    },
    showIconOnlyVariants: {
      control: { type: 'boolean' },
    },
    showMultilineVariants: {
      control: { type: 'boolean' },
    },
  },
  args: combinationDefaultProps,
};
export const AllComponents: Story = {
  render: AllComponentsExample,
  parameters: {
    layout: 'fullscreen',
  },
};
