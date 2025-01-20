import type { Meta, StoryObj } from '@storybook/react';

import WidgetEmpty from '@semcore/widget-empty';

import CustomWithActionsExample from './examples/custom_examples_actions';
import CustomExample from './examples/custom-examples';
import ErrorExample from './examples/error_example';
import NoDataExample from './examples/nodata_example';

import { CustomExampleTest } from './__tests__/custom_example-test.test';
import { CustomExamplesActionsTest } from './__tests__/custom_examples_actions-test.test';
import { ErrorExamplesTest } from './__tests__/error_example-test.test';
import { NoDataExamplesTest } from './__tests__/nodata_examples-test.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof WidgetEmpty> = {
  title: 'Components/WidgetEmpty/Documentation',
  component: WidgetEmpty,
};
export default meta;

type Story = StoryObj<typeof WidgetEmpty>;

export const CustomWithActions: Story = {
  render: CustomWithActionsExample,
  play: playWrapper(CustomExamplesActionsTest),
};

export const Custom: Story = {
  render: CustomExample,
  play: playWrapper(CustomExampleTest),
};

export const Error: Story = {
  render: ErrorExample,
  play: playWrapper(ErrorExamplesTest),
};

export const NoData: Story = {
  render: NoDataExample,
  play: playWrapper(NoDataExamplesTest),
};
