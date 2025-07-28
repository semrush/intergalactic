import FeaturePopover from '@semcore/feature-popover';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FeaturePopoverExample, {
  defaultProps as ExampleProps,
} from './examples/base-usage-with-all-props';
import FeaturePopoverMediumIllustrationExample, {
  defaultProps as Example2Props,
} from './examples/base-usage-with-medium-illustration';

const meta: Meta<typeof FeaturePopover> = {
  title: 'Components/FeaturePopover/Tests',
  component: FeaturePopover,
};

export default meta;

const baseArgTypes = {
  disabled: { control: { type: 'boolean' } },
  placement: {
    control: { type: 'select' },
    options: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],
  },
  interaction: {
    control: { type: 'select' },
    options: ['none', 'hover', 'focus', 'click'],
  },
  timeout: { control: { type: 'number' } },
  disableEnforceFocus: { control: { type: 'boolean' } },
  focusLoop: { control: { type: 'boolean' } },
  explicitTriggerSet: { control: { type: 'boolean' } },
  cursorAnchoring: { control: { type: 'boolean' } },
  popperMargin: { control: { type: 'number' } },
  closeIcon: { control: { type: 'boolean' } },
  duration: { control: { type: 'number' } },
};

export const FeaturePopoverProps: StoryObj<typeof ExampleProps> = {
  render: FeaturePopoverExample,
  argTypes: {
    ...baseArgTypes,
    autoFocus: {
      control: { type: 'select' },
      options: [true, false, 'enforced'] as (boolean | 'enforced')[],
    },
  },
  args: ExampleProps,
};

export const FeaturePopoverMediumIllustration: StoryObj<typeof Example2Props> = {
  render: FeaturePopoverMediumIllustrationExample,
  argTypes: {
    ...baseArgTypes,
    defaultVisible: { control: { type: 'boolean' } },
  },
  args: Example2Props,
};
