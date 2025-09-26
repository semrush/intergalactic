import type { Meta, StoryObj } from '@storybook/react-vite';

import NoCloseSubcomponentWithAllPropsExample, { defaultProps as WithoutCloseProps } from './examples/no-close-subcomponent-all-props';
import WithCloseSubcomponentWithAllPropsExample, { defaultProps as WithCloseProps } from './examples/with-close-subcomponent-all-props';

const meta: Meta = {
  title: 'Components/NoticeGlobal/Tests',
};
export default meta;
const sharedArgTypes = {
  duration: {
    control: { type: 'number' },
  },
  theme: {
    control: { type: 'select' },
    options: ['neutral', 'info', 'success', 'warning', 'danger'],
  },
  closable: {
    control: { type: 'boolean' },
  },
} as const;

export const NoCloseSubcomponentWithAllProps: StoryObj<typeof WithoutCloseProps> = {
  render: NoCloseSubcomponentWithAllPropsExample,
  argTypes: sharedArgTypes,
  args: WithoutCloseProps,
};

export const WithCloseSubcomponentWithAllProps: StoryObj<typeof WithCloseProps> = {
  render: WithCloseSubcomponentWithAllPropsExample,
  argTypes: sharedArgTypes,
  args: WithCloseProps,
};
