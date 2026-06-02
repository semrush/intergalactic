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
  argTypes: {
    ellipsisTitle: { control: { type: 'boolean' } },
    ellipsisMaxLine: { control: { type: 'number', min: 1 } },
    withClose: { control: { type: 'boolean' } },
    withAdditionalHeaderContent: { control: { type: 'boolean' } },
    withTooltipInBody: { control: { type: 'boolean' } },
    withFooter: { control: { type: 'boolean' } },
  },
};

export const AdditionalContent = {
  render: AdditionalContentExample,

};

export const AsyncTitleInHeader = {
  render: AsyncTitleInHeaderExample,

};
