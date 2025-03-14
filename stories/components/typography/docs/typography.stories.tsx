import type { Meta, StoryObj } from '@storybook/react';

import AdditionalInformationExample from './examples/additional-information';
import BasicUsageExample from './examples/basic-usage';
import FontSizeAndLineHeightExample from './examples/font-size-and-line-height';
import FormatTextNestedListExample from './examples/formattext-nested-lists';
import HeadingMainExample from './examples/headings-main';
import HeadingOtherExample from './examples/headings-other';
import ListWithCustomBulletsExample from './examples/list-with-custom-bullets';
import ListWithCustomContentExample from './examples/list-with-custom-content';
import NativeTypographyTagExample from './examples/native-typography-tags';
import ParagraphMarginExample from './examples/paragraph-margins';
import ParagraphsExample from './examples/paragraphs';
import TextColorsExample from './examples/text-colors';
import TextStylesExample from './examples/text-styles';

const meta: Meta = {
  title: 'Components/Typography/Documentation',
};
export default meta;

type Story = StoryObj;

export const AdditionalInformation: Story = {
  render: AdditionalInformationExample,
};

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const FontSizeAndLineHeight: Story = {
  render: FontSizeAndLineHeightExample,
};

export const FormatTextNestedList: Story = {
  render: FormatTextNestedListExample,
};

export const HeadingMain: Story = {
  render: HeadingMainExample,
};

export const HeadingOther: Story = {
  render: HeadingOtherExample,
};

export const ListWithCustomBullets: Story = {
  render: ListWithCustomBulletsExample,
};

export const ListWithCustomContent: Story = {
  render: ListWithCustomContentExample,
};

export const NativeTypographyTag: Story = {
  render: NativeTypographyTagExample,
};

export const ParagraphMargins: Story = {
  render: ParagraphMarginExample,
};

export const Paragraps: Story = {
  render: ParagraphsExample,
};

export const TextColors: Story = {
  render: TextColorsExample,
};

export const TextStyles: Story = {
  render: TextStylesExample,
};
