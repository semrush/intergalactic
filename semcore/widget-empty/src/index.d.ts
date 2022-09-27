import { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IFlexProps } from '@semcore/flex-box';
import { TIllustrationNamesWidgetEmpty } from '@semcore/illustration';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export type iconNamesWidgetEmpty = TIllustrationNamesWidgetEmpty;

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
  type?: iconNamesWidgetEmpty;
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
