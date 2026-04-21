import type { Meta, StoryObj } from '@storybook/react-vite';

import BoxAllPropsExample, { defaultProps as BoxAllProps } from './examples/box-all-props';
import BoxMarginsPaddingsExample from './examples/box-margins-and-paddings';
import BoxWigthHeightExamples from './examples/flex-box-width-height-test';
import FlexGapsExample from './examples/flex-gaps-test';

const meta: Meta = {
  title: 'Components/Base Components/Flex-Box/Tests',
};

export const BoxAllPropsConfigurable: StoryObj<typeof BoxAllProps> = {
  render: BoxAllPropsExample,
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: ['div', 'button', 'span', 'section', 'article', 'main', 'header', 'footer', 'aside', 'nav'],
    },
    display: {
      control: { type: 'select' },
      options: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'],
    },
    inline: { control: { type: 'boolean' } },
    boxSizing: { control: { type: 'boolean' } },
    flex: {
      control: { type: 'text' },
    },
    w: { control: { type: 'text' } },
    wMin: { control: { type: 'text' } },
    wMax: { control: { type: 'text' } },
    h: { control: { type: 'text' } },
    hMin: { control: { type: 'text' } },
    hMax: { control: { type: 'text' } },
    m: { control: { type: 'number' } },
    mt: { control: { type: 'number' } },
    mr: { control: { type: 'number' } },
    mb: { control: { type: 'number' } },
    ml: { control: { type: 'number' } },
    mx: { control: { type: 'number' } },
    my: { control: { type: 'number' } },
    p: { control: { type: 'number' } },
    pt: { control: { type: 'number' } },
    pr: { control: { type: 'number' } },
    pb: { control: { type: 'number' } },
    pl: { control: { type: 'number' } },
    px: { control: { type: 'number' } },
    py: { control: { type: 'number' } },
    focusRingTopOffset: { control: { type: 'text' } },
    focusRingBottomOffset: { control: { type: 'text' } },
    focusRingLeftOffset: { control: { type: 'text' } },
    focusRingRightOffset: { control: { type: 'text' } },
    scaleIndent: { control: { type: 'number' } },
    position: {
      control: { type: 'select' },
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    },
    top: { control: { type: 'text' } },
    left: { control: { type: 'text' } },
    bottom: { control: { type: 'text' } },
    right: { control: { type: 'text' } },
    inset: { control: { type: 'text' } },
    zIndex: { control: { type: 'number' } },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    innerOutline: { control: { type: 'boolean' } },
    invertOutline: { control: { type: 'boolean' } },
    inAfterOutline: { control: { type: 'boolean' } },
    hoverCursor: { control: { type: 'text' } },
  },
  args: BoxAllProps,
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
