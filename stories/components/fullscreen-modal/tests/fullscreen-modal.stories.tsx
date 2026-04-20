import type { Meta, StoryObj } from '@storybook/react-vite';

import DisablePortalVisibleExample from './examples/disable-portal-visible';
import ConfigurableHeaderExample, { defaultProps as headerDefaultProps } from './examples/header/configurable-header';
import ScrollTestExample from './examples/scroll-test';
import WithSpinContainerExample from './examples/with-spin-container';

const meta: Meta = {
  title: 'Components/FullscreenModal/Tests',
};

export const DisablePortalVisible: StoryObj = {
  render: DisablePortalVisibleExample,
};

export const ScrollTest: StoryObj = {
  render: ScrollTestExample,
};

export const WithSpinContainer: StoryObj = {
  render: WithSpinContainerExample,
};
export const ConfigurableHeader: StoryObj = {
  render: ConfigurableHeaderExample,
  argTypes: {
    closable: { control: 'boolean' },
    showClose: { control: 'boolean' },
    showBack: { control: 'boolean' },
    backText: { control: 'text' },
    titleText: { control: 'text' },
    titleWidth: { control: 'number' },
    descriptionText: { control: 'text' },
    showDescriptionTooltip: { control: 'boolean' },
    hasBody: { control: 'boolean' },
    hasFooter: { control: 'boolean' },
  },
  args: headerDefaultProps,
};

export const LongTitleAndDescription: StoryObj = {
  render: ConfigurableHeaderExample,
  args: {
    ...headerDefaultProps,
    showClose: true,
    showBack: true,
    backText: 'Go to Tool Name',
    titleText: 'An Amazing Journey Through Enchanted Worlds, Where Every Step Unveils New Horizons and Dreams Become Reality',
    descriptionText: 'In the bustling city of Eldoria, where the sun sets behind the towering spires of ancient castles, a mysterious event is about to unfold',
  },
};

export default meta;
