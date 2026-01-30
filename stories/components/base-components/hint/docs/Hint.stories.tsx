import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './__tests__/hoverbtn.test';
import { Link } from './__tests__/hoverlink.test';
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
  play: playWrapper(Button),
};

export const CursorAnchoring: StoryObj = {
  render: CursorAnchoringExample,
  play: playWrapper(Link),
};

export const Placement: StoryObj = {
  render: PlacementExample,
  play: playWrapper(Button),
};

export const Timeout: StoryObj = {
  render: TimeoutExample,
  play: playWrapper(Link),
};

export default meta;
