import { ScrollArea } from '@semcore/ui/base-components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ScrollAreaExampleProps } from './examples/scroll-props';
import HorizontalScrollWithShadowAndOffsetExample, {
  defaultProps as BasicExampleProps,
} from './examples/scroll-props';
import WithObserveParentSizeExample from './examples/with-observe-parent-size';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Base Components/ScrollArea/Tests',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Basic: StoryObj<ScrollAreaExampleProps> = {
  render: HorizontalScrollWithShadowAndOffsetExample,
  argTypes: {
    shadow: { control: { type: 'boolean' } },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    topOffset: { control: { type: 'number' } },
    bottomOffset: { control: { type: 'number' } },
    leftOffset: { control: { type: 'number' } },
    rightOffset: { control: { type: 'number' } },
    shadowSize: { control: { type: 'number' } },
    shadowTheme: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
    focusRingTopOffset: { control: { type: 'text' } },
    focusRingRightOffset: { control: { type: 'text' } },
    focusRingBottomOffset: { control: { type: 'text' } },
    focusRingLeftOffset: { control: { type: 'text' } },
  },
  args: {
    ...BasicExampleProps,
  },
};

export const WithObserveParentSize: Story = {
  render: WithObserveParentSizeExample,
};
