import Accrordion from '@semcore/ui/accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccordionAllPropsExample, { defaultAccordionAllProps } from './examples/accordion-all-props';
import AccordionAnimationExample from './examples/accordion-collapse-duration';
import ButtonsOnToggleExample from './examples/button-on-toggle';
import ValuesExample from './examples/values';

const meta: Meta<typeof Accrordion> = {
  title: 'Components/Accordion/Tests',
  component: Accrordion,
};

export default meta;
type Story = StoryObj<typeof Accrordion>;

export const ButtonsOnToggle: Story = {
  render: ButtonsOnToggleExample,
};

export const Values: Story = {
  render: ValuesExample,
};

export const AccordionAnimation: StoryObj = {
  render: AccordionAnimationExample,
};

const allPropsArgTypes = {
  // Accordion
  use: { control: { type: 'select' }, options: ['primary', 'secondary'] },
  defaultValue: {
    control: 'select',
    options: ['none ([])', 'first ([0])', 'all ([0, 1, 2])', 'single mode (null)', 'single mode (0)'],
    mapping: {
      'none ([])': [],
      'first ([0])': [0],
      'all ([0, 1, 2])': [0, 1, 2],
      'single mode (null)': null,
      'single mode (0)': 0,
    },
    description: 'Array value keeps several items open, non-array value switches to one-section mode',
  },
  duration: {
    control: { type: 'number' },
    description: 'Leave empty to fall back to the --intergalactic-duration-accordion CSS variable',
  },

  // Accordion.Item.Toggle
  toggleTag: { control: { type: 'select' }, options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },

  // Accordion.Item.Chevron
  chevronSize: { control: { type: 'select' }, options: ['m', 'l'] },

  // Accordion.Item.Collapse
  collapseDuration: {
    control: { type: 'number' },
    description: 'Leave empty to inherit the Accordion duration',
  },
  initialAnimation: { control: { type: 'boolean' } },
  timingFunction: {
    control: { type: 'select' },
    options: ['ease-out', 'ease-in', 'ease-in-out', 'linear', 'cubic-bezier(0.5, 0, 0, 1.12)'],
  },
  animationsDisabled: { control: { type: 'boolean' } },
  overflowHidden: { control: { type: 'boolean' } },
  defaultHeight: { control: { type: 'select' }, options: ['auto', '100%'] },
  preserveNode: { control: { type: 'boolean' } },

  // Per-item content
  item1Label: { control: { type: 'text' } },
  item1Content: { control: { type: 'text' } },
  item1Disabled: { control: { type: 'boolean' } },
  item2Label: { control: { type: 'text' } },
  item2Content: { control: { type: 'text' } },
  item2Disabled: { control: { type: 'boolean' } },
  item3Label: { control: { type: 'text' } },
  item3Content: { control: { type: 'text' } },
  item3Disabled: { control: { type: 'boolean' } },
} as const;

export const AccordionAllProps: StoryObj<typeof defaultAccordionAllProps> = {
  render: AccordionAllPropsExample,
  argTypes: allPropsArgTypes,
  args: defaultAccordionAllProps,
};
