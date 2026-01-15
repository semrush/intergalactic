import type { Box, FlexProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type { TIllustrationNamesWidgetEmpty } from '@semcore/illustration';

export type iconNamesWidgetEmpty = TIllustrationNamesWidgetEmpty;

export type WidgetEmptyProps = FlexProps & {
  /**
   * URL before the icon or the whole component
   */
  icon?: React.ReactNode;
};

export type WidgetErrorProps = WidgetEmptyProps &
  WithI18nEnhanceProps & {
    /** Error description. If it is absent, use the local default one */
    description?: React.ReactNode;
  };

export type WidgetNoDataProps = WidgetEmptyProps &
  WithI18nEnhanceProps & {
    /** Error description. If it is absent, use the local default one */
    description?: React.ReactNode;
    /** Data types */
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
