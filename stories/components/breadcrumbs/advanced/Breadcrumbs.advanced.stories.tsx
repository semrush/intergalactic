import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '@semcore/breadcrumbs';

import TrimMiddleExample from './examples/trim_middle';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Advanced Usage',
};

export default meta;

export const TrimMiddle: StoryObj<typeof Breadcrumbs> = {
  render: TrimMiddleExample,
};
