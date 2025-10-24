import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomErrorExample from './examples/custom-error';
import TemplatesExample, { defaultProps as TemplatesProps } from './examples/templates';

const meta: Meta = {
  title: 'Patterns/UX Patterns/GlobalErrors/Documentation',
};

export const CustomError: StoryObj = {
  render: CustomErrorExample,
};

export const Templates: StoryObj<typeof TemplatesProps> = {
  render: TemplatesExample,
  argTypes: {
    homeLink: {
      control: { type: 'text' },
    },
    toolName: {
      control: { type: 'text' },
    },
    projectsLink: {
      control: { type: 'text' },
    },
    contactsLink: {
      control: { type: 'text' },
    },
    supportTeamLink: {
      control: { type: 'text' },
    },
    titleTag: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'p'],
    },
  },
  args: TemplatesProps,
};

export default meta;
