import type { Meta, StoryObj } from '@storybook/react';

import FlexGapsExample from './examples/flex-gaps-test';
import BoxWigthHeightExamples from './examples/flex-box-width-height-test';
import BoxMarginsPaddingsExample from './examples/box-margins-and-paddings';

const meta: Meta = {
  title: 'Components/FlexBox/Tests',
};

export const FlexGaps: StoryObj = {
  render: FlexGapsExample,
};

export const BoxWigthHeight: StoryObj = {
    render: BoxWigthHeightExamples,
  };
  export const BoxMarginsPaddings: StoryObj = {
    render: BoxMarginsPaddingsExample,
  };

export default meta;
