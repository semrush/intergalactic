import SidePanel from '@semcore/ui/side-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AdditionalContentExample from './examples/additional-content-in-header';
import AsyncTitleInHeaderExample from './examples/async-title-in-header';
import type { defaultSidePanelDemoProps } from './examples/side-panel-additional-states';
import AdditionalStatesExample from './examples/side-panel-additional-states';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel/Tests',
  component: SidePanel,
};

export default meta;

export const AdditionalStates: StoryObj<typeof defaultSidePanelDemoProps> = {
  render: AdditionalStatesExample,
  args: defaultSidePanelDemoProps,
  argTypes: {
    ellipsisTitle: { control: { type: 'boolean' } },
    ellipsisMaxLine: { control: { type: 'number', min: 1 } },
    withClose: { control: { type: 'boolean' } },
    withAdditionalHeaderContent: { control: { type: 'boolean' } },
    withTooltipInBody: { control: { type: 'boolean' } },
    withFooter: { control: { type: 'boolean' } },
    backText: { control: { type: 'text' } },
    backWMax: { control: { type: 'number' } },
  },
};

export const AdditionalContent = {
  render: AdditionalContentExample,

};

export const AsyncTitleInHeader = {
  render: AsyncTitleInHeaderExample,

};
