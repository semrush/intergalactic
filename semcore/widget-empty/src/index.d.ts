import { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IFlexProps } from '@semcore/flex-box';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export type iconNames =
  | 'area-chart'
  | 'choropleth-map-chart'
  | 'coffee'
  | 'combined-chart'
  | 'congrats'
  | 'deleted-page'
  | 'donut-chart'
  | 'duplicates'
  | 'funnel-chart'
  | 'good'
  | 'heat-map-chart'
  | 'horizontal-bar-chart'
  | 'kagi-chart'
  | 'line-chart'
  | 'lollipop-chart'
  | 'nexttime'
  | 'nothing-found'
  | 'other-data'
  | 'pie-chart'
  | 'processing'
  | 'radar-chart'
  | 'radial-tree-chart'
  | 'sankey-chart'
  | 'scatter-plot-chart'
  | 'stacked-area-chart'
  | 'suggestion'
  | 'suggestions'
  | 'table'
  | 'tag-cloud'
  | 'text-links-etc'
  | 'under-construction'
  | 'venn-chart'
  | 'vertical-bar-chart'
  | 'warning';

export interface IWidgetEmptyProps extends IFlexProps {
  /**
   * URL before the icon or the whole component
   */
  icon?: React.ReactNode;
}

export interface IWidgetErrorProps extends IWidgetEmptyProps, IWithI18nEnhanceProps {
  /** Error description. If it is absent, use the local default one */
  description?: React.ReactNode;
}

export interface IWidgetNoDataProps extends IWidgetEmptyProps, IWithI18nEnhanceProps {
  /** Error description. If it is absent, use the local default one */
  description?: React.ReactNode;
  /* Data types */
  type?: iconNames;
}

declare const WidgetEmpty: (<T>(props: CProps<IWidgetEmptyProps> & T) => ReturnEl) & {
  Title: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
  Description: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

declare const NoData: <T>(props: CProps<IWidgetNoDataProps> & T) => ReturnEl;
declare const Error: <T>(props: CProps<IWidgetErrorProps> & T) => ReturnEl;
declare const getIconPath: (name: string) => string;

export default WidgetEmpty;
export { getIconPath, NoData, Error };
