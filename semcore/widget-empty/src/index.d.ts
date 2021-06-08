import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IFlexProps } from '@semcore/flex-box';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export type iconNames =
  | 'area-chart'
  | 'choropleth-map-chart'
  | 'combined-chart'
  | 'congrats'
  | 'deleted-page'
  | 'donut-chart'
  | 'duplicates'
  | 'funnel-chart'
  | 'good'
  | 'horizontal-bar-chart'
  | 'line-chart'
  | 'lollipop-chart'
  | 'nexttime'
  | 'nothing-found'
  | 'other-data'
  | 'pie-chart'
  | 'processing'
  | 'radar-chart'
  | 'sankey-chart'
  | 'scatter-plot-chart'
  | 'stacked-area-chart'
  | 'suggestions'
  | 'table'
  | 'tag-cloud'
  | 'text-links-etc'
  | 'venn-chart'
  | 'vertical-bar-chart'
  | 'warning';

export interface IWidgetEmptyProps extends IFlexProps {
  /**
   * URL before the icon or the whole component
   */
  icon?: iconNames | React.ReactNode;
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


declare const WidgetEmpty: ((props: CProps<IWidgetEmptyProps>) => ReturnEl) & {
  Title: typeof Box
  Description: typeof Box
};

declare const NoData: ((props: CProps<IWidgetNoDataProps>) => ReturnEl);
declare const Error: ((props: CProps<IWidgetErrorProps>) => ReturnEl);

export default WidgetEmpty;
export {
  NoData,
  Error,
};