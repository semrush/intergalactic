import WidgetEmpty from '@semcore/ui/widget-empty';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample, {
  type BasicWidgetEmptyProps,
  defaultProps as BasicExampleProps,
} from './examples/basic_usage';
import CustomIconSizeExample, {
  type CustomIconSizeProps,
  defaultProps as CustomIconSizeExampleProps,
} from './examples/custom_icon_size';
import ErrorExample, {
  type BasicWidgetErrorProps,
  defaultProps as ErrorExampleProps,
} from './examples/widget_error_usage';
import NoDataExample, {
  type BasicWidgetNoDataProps,
  defaultProps as NoDataExampleProps,
} from './examples/widget_nodata_usage';

const meta: Meta<typeof WidgetEmpty> = {
  title: 'Components/WidgetEmpty/Tests',
  component: WidgetEmpty,
};

export default meta;

const iconOptions = [
  'area-chart',
  'choropleth-map-chart',
  'coffee',
  'combined-chart',
  'congrats',
  'deleted-page',
  'donut-chart',
  'duplicates',
  'funnel-chart',
  'good',
  'heat-map-chart',
  'horizontal-bar-chart',
  'kagi-chart',
  'line-chart',
  'lollipop-chart',
  'nexttime',
  'nothing-found',
  'other-data',
  'pie-chart',
  'processing',
  'radar-chart',
  'radial-tree-chart',
  'sankey-chart',
  'scatter-plot-chart',
  'stacked-area-chart',
  'suggestion',
  'suggestions',
  'table',
  'tag-cloud',
  'text-links-etc',
  'under-construction',
  'venn-chart',
  'vertical-bar-chart',
  'warning',
];

export const Basic: StoryObj<BasicWidgetEmptyProps> = {
  render: BasicExample,
  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: iconOptions,
    },
    showTitle: {
      control: { type: 'boolean' },
    },
    showDescription: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
  },
  args: BasicExampleProps,
};

export const CustomIconSize: StoryObj<CustomIconSizeProps> = {
  render: CustomIconSizeExample,
  argTypes: {
    iconWidth: {
      control: { type: 'number' },
    },
    iconHeight: {
      control: { type: 'number' },
    },
  },
  args: CustomIconSizeExampleProps,
};

export const ErrorWidget: StoryObj<BasicWidgetErrorProps> = {
  render: ErrorExample,
  argTypes: {
    showDescription: {
      control: { type: 'boolean' },
    },
    customDescription: {
      control: { type: 'text' },
    },
    showChildren: {
      control: { type: 'boolean' },
    },
  },
  args: ErrorExampleProps,
};

export const NoDataWidget: StoryObj<BasicWidgetNoDataProps> = {
  render: NoDataExample,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: iconOptions,
    },
    showDescription: {
      control: { type: 'boolean' },
    },
    customDescription: {
      control: { type: 'text' },
    },
    showChildren: {
      control: { type: 'boolean' },
    },
  },
  args: NoDataExampleProps,
};
