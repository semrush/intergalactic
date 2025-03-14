import type { Meta, StoryObj } from '@storybook/react';

import Accrordion from '@semcore/accordion';

import BasicExample from './examples/basic_usage';
import CustomStylesExample from './examples/custom_styles';
import HeadingTagExample from './examples/heading_tag';
import NonCompactExample from './examples/non_compact';
import OneSectionOpeningExample from './examples/one_section_opening';
import SeoExample from './examples/seo';

import { BasicUsageTest } from './__tests__/basic-usage.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Accrordion> = {
  title: 'Components/Accrordion/Documentation',
  component: Accrordion,
};

export default meta;
type Story = StoryObj<typeof Accrordion>;

export const BasicUsage: Story = {
  render: BasicExample,
  play: playWrapper(BasicUsageTest),
};

export const CustomStyles: Story = {
  render: CustomStylesExample,
};

export const HeadingTag: Story = {
  render: HeadingTagExample,
};

export const NonCompact: Story = {
  render: NonCompactExample,
};

export const OneSectionOpening: Story = {
  render: OneSectionOpeningExample,
};

export const Seo: Story = {
  render: SeoExample,
};
