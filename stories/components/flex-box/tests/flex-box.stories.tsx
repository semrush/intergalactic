import type { Meta, StoryObj } from '@storybook/react';

import TestExample from './examples/flex-gaps-test';
import TestExample2 from './examples/flex-box-width-height-test';
import TestExample3 from './examples/box-margins-and-paddings';

const meta: Meta = {
  title: 'Components/FlexBox/Tests',
};

export const Test: StoryObj = {
  render: TestExample,
};

export const Test2: StoryObj = {
    render: TestExample2,
  };
  export const Test3: StoryObj = {
    render: TestExample3,
  };

export default meta;
