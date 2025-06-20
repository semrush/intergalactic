import WidgetEmpty from '@semcore/widget-empty';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorStatesExample from './examples/error-states';
import NoDataExample from './examples/nodata-states';
import WidgetEmptyCasesExample from './examples/widget-empty-states';
import WidgetEmptyWithControlsCasesExample from './examples/widget-empty-with-controls';
import WidgetEmptyWithLinksExample from './examples/widget-empty-withlink';

const meta: Meta<typeof WidgetEmpty> = {
  title: 'Components/WidgetEmpty/Tests',
  component: WidgetEmpty,
};
export default meta;

type Story = StoryObj<typeof WidgetEmpty>;

export const WidgetEmptyCases: Story = {
  render: WidgetEmptyCasesExample,
};

export const WidgetEmptyWithControlsCases: Story = {
  render: WidgetEmptyWithControlsCasesExample,
};

export const WidgetEmptyWithLinks: Story = {
  render: WidgetEmptyWithLinksExample,
};

export const ErrorStates: Story = {
  render: ErrorStatesExample,
};

export const NoData: Story = {
  render: NoDataExample,
};
