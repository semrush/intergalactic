import Carousel from '@semcore/ui/carousel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/carousel_with_default_indicators';
import WithIndicatorsExample from './examples/carousel_with_indicators_only';
import WithPreviewExample from './examples/carousel_with_preview_indicators';
import WithoutModalExample from './examples/carousel_without_modal_window';
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel/Documentation',
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof Carousel>;
export const Basic: Story = {
  render: BasicExample,

};
export const WithIndicators: Story = {
  render: WithIndicatorsExample,

};
export const WithPreview: Story = {
  render: WithPreviewExample,

};
export const WithoutModal: Story = {
  render: WithoutModalExample,

};
