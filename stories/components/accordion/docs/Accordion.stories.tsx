import Accrordion from '@semcore/ui/accordion';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { BasicUsageTest } from './__tests__/basic-usage.test';
import BasicExample, { defaultProps as BasicExampleProps } from './examples/basic_usage';
import HeadingTagExample from './examples/heading_tag';
import OneSectionOpeningExample from './examples/one_section_opening';
import PrimaryAccordionExample from './examples/primary_accordion';
import SeoExample from './examples/seo';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Accrordion> = {
  title: 'Components/Accordion/Documentation',
  component: Accrordion,
};

export default meta;
type Story = StoryObj<typeof Accrordion>;

export const Basic: StoryObj<typeof BasicExampleProps> = {
  render: BasicExample,
  argTypes: {
    w: {
      control: { type: 'number' },
    },
    h: {
      control: { type: 'number' },
    },
    duration: {
      control: { type: 'number' },
    },
    overflowHidden: {
      control: { type: 'boolean' },
    },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    defaultHeight: {
      control: { type: 'select' },
      options: ['auto', '100%'],
    },
  },
  args: BasicExampleProps,
  play: playWrapper(BasicUsageTest),
};

export const HeadingTag: Story = {
  render: HeadingTagExample,
};

export const PrimaryAccordion: Story = {
  name: 'Primary accordion',
  render: PrimaryAccordionExample,
};

export const OneSectionOpening: Story = {
  render: OneSectionOpeningExample,
};

export const Seo: Story = {
  render: SeoExample,
};
