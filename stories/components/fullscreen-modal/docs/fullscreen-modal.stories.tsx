import type { Meta, StoryObj } from '@storybook/react';

import BasicExample from './examples/basic_fullscreen.headers_use';
import DualZoneModalExample from './examples/example_of_a_dual-zone_modal_window';

const meta: Meta = {
  title: 'Components/FullscreenModal/Documentation',
};

export const Basic: StoryObj = {
  render: BasicExample,
};

export const DualZoneModal: StoryObj = {
  render: DualZoneModalExample,
};

export default meta;
