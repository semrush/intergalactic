import SidePanel from '@semcore/ui/side-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Demo1 from './examples/additional-content-in-header';
import type { defaultSidePanelDemoProps } from './examples/side-panel-demo';
import Demo from './examples/side-panel-demo';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel/Tests',
  component: SidePanel,
};

export default meta;

export const SidePanelProps: StoryObj<typeof defaultSidePanelDemoProps> = {
  render: Demo,
  argTypes: {
    ellipsisTitle: { control: { type: 'boolean' } },
    ellipsisMaxLine: { control: { type: 'number', min: 1 } },
    withClose: { control: { type: 'boolean' } },
    withAdditionalHeaderContent: { control: { type: 'boolean' } },
    withTooltipInBody: { control: { type: 'boolean' } },
    withFooter: { control: { type: 'boolean' } },
  },
};

export const SidePanelProps1 = {
  render: Demo1,

};
