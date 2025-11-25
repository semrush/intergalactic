import Tooltip from '@semcore/ui/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TooltipInteractionsExample from './examples/basic_usage';
import ConfigurableTooltipExample, {
  defaultProps as ConfigurableTooltipProps,
} from './examples/configurable_tooltip';
import InteractiveInTooltipsExample from './examples/interactive-in-tooltip';
import TooltipStatesExample from './examples/tooltip-styles';
import ValidationErrorsExample from './examples/validation-error';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tests',
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const ConfigurableTooltip: StoryObj<typeof ConfigurableTooltipProps> = {
  render: ConfigurableTooltipExample,
  argTypes: {
    tooltipTitle: {
      control: { type: 'text' },
    },
    tooltipTheme: {
      control: { type: 'select' },
      options: ['default', 'warning', 'invert'],
    },
    tooltipInteraction: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus', 'none'],
    },
    tooltipPlacement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    tooltipTimeout: {
      control: { type: 'number' },
    },
    hintTitle: {
      control: { type: 'text' },
    },
    hintTheme: {
      control: { type: 'select' },
      options: ['default', 'invert'],
    },
    descriptionTheme: {
      control: { type: 'select' },
      options: ['default', 'warning', 'invert'],
    },
    descriptionInteraction: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus', 'none'],
    },
  },
  args: ConfigurableTooltipProps,
};

export const InteractiveInTooltips: Story = {
  render: InteractiveInTooltipsExample,
};

export const TooltipStates: Story = {
  render: TooltipStatesExample,
};

export const TooltipInteractions: Story = {
  render: TooltipInteractionsExample,
};

export const ValidationErrors: Story = {
  render: ValidationErrorsExample,
};
