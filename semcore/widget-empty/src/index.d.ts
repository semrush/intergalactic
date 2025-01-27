import type { Intergalactic, UnknownProperties } from '@semcore/core';
import type { Box, FlexProps } from '@semcore/flex-box';
import type { TIllustrationNamesWidgetEmpty } from '@semcore/illustration';
import type { WithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export type iconNamesWidgetEmpty = TIllustrationNamesWidgetEmpty;

/** @deprecated */
export interface IWidgetEmptyProps extends WidgetEmptyProps, UnknownProperties {}
export type WidgetEmptyProps = FlexProps & {
  /**
   * URL before the icon or the whole component
   */
  icon?: React.ReactNode;
};

/** @deprecated */
export interface IWidgetErrorProps extends WidgetErrorProps, UnknownProperties {}
export type WidgetErrorProps = WidgetEmptyProps &
  WithI18nEnhanceProps & {
    /** Error description. If it is absent, use the local default one */
    description?: React.ReactNode;
  };

/** @deprecated */
export interface IWidgetNoDataProps extends WidgetNoDataProps, UnknownProperties {}
export type WidgetNoDataProps = WidgetEmptyProps &
  WithI18nEnhanceProps & {
    /** Error description. If it is absent, use the local default one */
    description?: React.ReactNode;
    /* Data types */
    type?: iconNamesWidgetEmpty;
  };

declare const WidgetEmpty: Intergalactic.Component<'div', WidgetEmptyProps> & {
  Title: typeof Box;
  Description: typeof Box;
};

export declare const NoData: Intergalactic.Component<'div', WidgetNoDataProps>;
export declare const Error: Intergalactic.Component<'div', WidgetErrorProps>;
export declare const getIconPath: (name: string) => string;

export default WidgetEmpty;
