import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic-usage';
import CursorAnchoringExample from './examples/cursor_anchoring';
import PlacementExample from './examples/placement';
import TimeoutExample from './examples/timeout';

const meta: Meta = {
  title: 'Components/Base Components/Hint/Docs',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const CursorAnchoring: StoryObj = {
  render: CursorAnchoringExample,
};

export const Placement: StoryObj = {
  render: PlacementExample,
};

export const Timeout: StoryObj = {
  render: TimeoutExample,
};

export default meta;
