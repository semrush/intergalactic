import type { Meta, StoryObj } from '@storybook/react';

import BulkTextarea from '@semcore/bulk-textarea';

import NoCommonErrorExample from './examples/no-common-error';
import EmptyValuesInPasteRowExample from './examples/empty-values-in-paste-row';

const meta: Meta<typeof BulkTextarea> = {
  title: 'Components/BulkTextarea/Advanced',
  component: BulkTextarea,
};

export default meta;

export const NoCommonError: StoryObj<typeof BulkTextarea> = {
  render: NoCommonErrorExample,
};

export const EmptyValuesInPasteRow: StoryObj<typeof BulkTextarea> = {
  render: EmptyValuesInPasteRowExample,
};
