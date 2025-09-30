import SidePanel from '@semcore/ui/side-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import WithEllipsisAndTooltipExample from './examples/with-ellipsis-and-tooltip';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel/Tests',
  component: SidePanel,
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const WithEllipsisAndTooltip: Story = {
  render: WithEllipsisAndTooltipExample,
};
