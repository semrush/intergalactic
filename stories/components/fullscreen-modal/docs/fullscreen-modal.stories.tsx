import type { Meta, StoryObj } from '@storybook/react';

import BasicExample from './examples/basic_fullscreen.headers_use';
import DualZoneExample from './examples/example_of_a_dual-zone_modal_window';

const meta: Meta = {
  title: 'Components/FullscreenModal/Documentation',
};

export const Basic: StoryObj = {
  render: BasicExample,
};

export const DualZone: StoryObj = {
  render: DualZoneExample,
};

export default meta;
