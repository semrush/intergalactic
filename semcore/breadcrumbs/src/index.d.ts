import type { EllipsisSettings, SimpleHintPopperProps, BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

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
  /**
   * Ellipsis settings
   * @default false
   */
  ellipsis?: true | EllipsisSettings;
  hintProps?: SimpleHintPopperProps;
};

export type BreadcrumbsContext = BreadcrumbsProps & {
  getItemProps: PropGetterFn;
};

declare const Breadcrumbs: Intergalactic.Component<'div', BreadcrumbsProps, BreadcrumbsContext> & {
  Item: Intergalactic.Component<'a', BreadcrumbsItemProps>;
};

export default Breadcrumbs;
