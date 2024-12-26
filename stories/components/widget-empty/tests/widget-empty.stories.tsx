import type { Meta, StoryObj } from '@storybook/react';

import WidgetEmpty from '@semcore/widget-empty';

import WidgetEmptyPositiveCasesExample from './examples/positive-widget-empty-states';
import WidgetEmptyWithControlsPositiveCasesExample from './examples/positive-widget-empty-with-controls';
import TestExample from './examples/positive-widget-empty-description-withlink';


const meta: Meta<typeof WidgetEmpty> = {
  title: 'Components/WidgetEmpty/Tests',
  component: WidgetEmpty,
};
export default meta;

type Story = StoryObj<typeof WidgetEmpty>;


export const WidgetEmptyPositiveCases: Story = {
    render: WidgetEmptyPositiveCasesExample,
  };

  export const WidgetEmptyWithControlsPositiveCases: Story = {
    render: WidgetEmptyWithControlsPositiveCasesExample,
  };

  export const Test: Story = {
    render: TestExample,
  };

