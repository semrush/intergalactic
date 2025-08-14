import FeedbackForm from '@semcore/feedback-form';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/feedback_form_theme_loading';

const meta: Meta<typeof FeedbackForm> = {
  title: 'Components/FeedbackForm/Tests',
  component: FeedbackForm,
};

export default meta;
type Story = StoryObj<typeof FeedbackForm>;

export const Basic: Story = {
  render: BasicExample,
};
