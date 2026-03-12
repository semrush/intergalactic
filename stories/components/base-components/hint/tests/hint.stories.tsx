import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './__tests__/hoverlink.test';
import HintExample, { defaultProps } from './examples/base-example-props';
import CursorAnchoringExample from './examples/cursor_anchoring';
import WordWrapExample from './examples/word-wrap';
import { playWrapper } from '../../../../utils/playWrapper';

const meta: Meta = {
  title: 'Components/Base Components/Hint/Tests',
};

export default meta;

export const CursorAnchoring: StoryObj = {
  render: CursorAnchoringExample,
  play: playWrapper(Link),
};

export const WordWrap: StoryObj = {
  render: WordWrapExample,
};

export const Hint: StoryObj<typeof defaultProps> = {
  render: HintExample,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end'],
    },
    timeout: {
      control: { type: 'number' },
    },
    visible: {
      control: { type: 'boolean' },
    },
    defaultVisible: {
      control: { type: 'boolean' },
    },
  },
  args: defaultProps,
};
