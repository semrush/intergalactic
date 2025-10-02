import FeedbackForm from '@semcore/ui/feedback-form';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample from './examples/default_feedback_form';

const meta: Meta<typeof FeedbackForm> = {
  title: 'Components/FeedbackForm/Documentation',
  component: FeedbackForm,
};

export default meta;
type Story = StoryObj<typeof FeedbackForm>;

export const Basic: Story = {
  render: BasicExample,
};
