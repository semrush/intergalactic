import type { Meta, StoryObj } from '@storybook/react-vite';

import AdvancedFeaturesDemoExample from './examples/advanced_features_demo';
import AsyncInitExample from './examples/async_init';
import CopyFullTextExample from './examples/copy_full_text';
import TableLinkExample from './examples/in_table_with_link';
import LinkExample, { defaultProps as LinkExampleProps } from './examples/link_with_ellipsis';
import ObserveChildrenMutationsExample from './examples/observe_children_mutations';
import TextExample from './examples/text_cases';
import TrimWithTextSizeExample, { defaultProps as TextSizeExampleProps } from './examples/trim_with_special_text_size';

const meta: Meta = {
  title: 'Components/Base Components/Ellipsis/Tests',
};

export default meta;

const commonArgTypes = {
  ellipsis: {
    control: 'select',
    options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
    mapping: {
      'false': { ellipsis: false },
      'true': { ellipsis: true },
      'cropPosition:middle': { 'ellipsis:cropPosition': 'middle' },
      'cropPosition:end': { 'ellipsis:cropPosition': 'end' },
      'cropPosition:end maxLine:2': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 },
      'cropPosition:end maxLine:6': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 6 },
      'cropPosition:middle lastRequiredSymbols:3': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 3 },
      'cropPosition:middle lastRequiredSymbols:0': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 0 },
    },
  },
  w: {
    control: { type: 'number' },
  },
  // UIK-4923: hint=false skips ellipsis calculation for cropPosition=end (CSS-only),
  // but still calculates for cropPosition=middle (needs JS). No hint shown in either case.
  hintProps: {
    control: 'select',
    options: ['default', 'false'],
    mapping: {
      default: undefined,
      false: false,
    },
  },
  hintPlacement: {
    control: { type: 'select' },
    options: ['top', 'bottom', 'left', 'right'],
  },
  size: {
    control: { type: 'select' },
    options: [undefined, 100, 200, 300, 350, 400, 500, 600, 700, 800],
  },
} as const;

export const TableLink: StoryObj = {
  render: TableLinkExample,
};

export const Link: StoryObj<typeof LinkExampleProps> = {
  render: LinkExample,
  argTypes: {
    ...commonArgTypes,
    color: {
      control: { type: 'select' },
      options: [
        undefined,
        'text-primary',
        'text-secondary',
        'text-success',
        'text-critical',
      ],
      description: 'Text color',
    },
    active: {
      control: { type: 'boolean' },
      description: 'Active state of the link',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state of the link',
    },

  },
  args: LinkExampleProps,
};

export const TrimWithTextSize: StoryObj<typeof TextSizeExampleProps> = {
  render: TrimWithTextSizeExample,
  argTypes: {
    ...commonArgTypes,

  },
  args: TextSizeExampleProps,
};

export const Text = {
  render: TextExample,
};

export const CopyFullText: StoryObj = {
  render: CopyFullTextExample,
};

export const AdvancedFeaturesDemo: StoryObj = {
  render: AdvancedFeaturesDemoExample,
};

export const ObserveChildrenMutations: StoryObj = {
  render: ObserveChildrenMutationsExample,
};

export const AsyncInit: StoryObj = {
  render: AsyncInitExample,
};
