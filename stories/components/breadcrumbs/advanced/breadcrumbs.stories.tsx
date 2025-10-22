import type Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TrimMiddleExample, { breadcrumbsEllipsisExampleProps } from './examples/trim_middle';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Advanced',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const TrimMiddle: StoryObj<typeof breadcrumbsEllipsisExampleProps> = {
  render: TrimMiddleExample,
  argTypes: {
    active: {
      control: { type: 'boolean' },
    },
  },
  args: breadcrumbsEllipsisExampleProps,
};
