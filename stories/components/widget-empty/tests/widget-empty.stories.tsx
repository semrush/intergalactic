import type { Meta, StoryObj } from '@storybook/react';

import WidgetEmpty from '@semcore/widget-empty';

import WidgetEmptyCasesExample from './examples/widget-empty-states';
import WidgetEmptyWithControlsCasesExample from './examples/widget-empty-with-controls';
import WidgetEmptyWithLinksExample from './examples/widget-empty-withlink';
import ErrorStatesExample from './examples/error-states';
import NoDataExample from './examples/nodata-states';



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
