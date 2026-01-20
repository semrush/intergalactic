import type { Meta, StoryObj } from '@storybook/react-vite';

import { Focus } from './__tests__/focus.test';
import BasicUsageExample from './examples/basic-usage';
import CursorAnchoringExample from './examples/cursor_anchoring';
import PlacementExample from './examples/placement';
import TimeoutExample from './examples/timeout';
import { playWrapper } from '../../../../utils/playWrapper';
const meta: Meta = {
  title: 'Components/Base Components/Hint/Docs',
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
  play: playWrapper(Focus),

};

export const CursorAnchoring: StoryObj = {
  render: CursorAnchoringExample,
};

export const Placement: StoryObj = {
  render: PlacementExample,
};

export const Timeout: StoryObj = {
  render: TimeoutExample,
  play: playWrapper(Focus),

};

export default meta;
