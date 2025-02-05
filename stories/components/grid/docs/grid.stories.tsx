import type { Meta, StoryObj } from '@storybook/react';

import AutomaticColumnSizeDetectionExample from './examples/automatic-column-size-detection';
import ChangeInGeneralOffsetExamples from './examples/change-in-general-offset';
import ChangeInGeneralGlutterBetweenColumnsExample from './examples/change-in-the-general-gutter-between-the-columns';
import ExampleUseExample from './examples/example-use';
import ResponsiveAlternativeApiExample from './examples/responsive-alternative-api';
import ResponsiveExample from './examples/responsive';

const meta: Meta = {
  title: 'Components/Grid/Documentation',
};

export const AutomaticColumnSizeDetection: StoryObj = {
  render: AutomaticColumnSizeDetectionExample,
};

export const ChangeInGeneralOffset: StoryObj = {
    render: ChangeInGeneralOffsetExamples,
  };
  export const ChangeInGeneralGlutterBetweenColumns: StoryObj = {
    render: ChangeInGeneralGlutterBetweenColumnsExample,
  };

  export const ExampleUse: StoryObj = {
    render: ExampleUseExample,
  };

  export const ResponsiveAlternativeApi: StoryObj = {
    render: ResponsiveAlternativeApiExample,
  };

  export const Responsive: StoryObj = {
    render: ResponsiveExample,
  };

export default meta;
