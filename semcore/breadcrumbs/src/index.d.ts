import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';

export type BreadcrumbsProps = BoxProps & {
  /**
   * Links divider
   * */
  separator?: React.ReactNode;
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type BreadcrumbsItemProps = BoxProps & {
  /** The property is responsible for the activity of the element */
  active?: boolean;
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type BreadcrumbsContext = BreadcrumbsProps & {
  getItemProps: PropGetterFn;
};

declare const Breadcrumbs: Intergalactic.Component<'div', BreadcrumbsProps, BreadcrumbsContext> & {
  Item: Intergalactic.Component<'a', BreadcrumbsItemProps>;
};

export default Breadcrumbs;
