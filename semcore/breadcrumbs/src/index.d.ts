import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';
import type { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

/** @deprecated */
export interface IBreadcrumbsProps extends BreadcrumbsProps, UnknownProperties {}
export type BreadcrumbsProps = BoxProps & {
  /**
   * Links divider
   * */
  separator?: React.ReactNode;
  locale?: string;
};

/** @deprecated */
export interface IBreadcrumbsItemProps extends BreadcrumbsItemProps, UnknownProperties {}
export type BreadcrumbsItemProps = BoxProps &
  KeyboardFocusProps & {
    /** The property is responsible for the activity of the element */
    active?: boolean;
    locale?: string;
  };

/** @deprecated */
export interface IBreadcrumbsContext extends BreadcrumbsContext, UnknownProperties {}
export type BreadcrumbsContext = BreadcrumbsProps & {
  getItemProps: PropGetterFn;
};

declare const Breadcrumbs: Intergalactic.Component<'div', BreadcrumbsProps, BreadcrumbsContext> & {
  Item: Intergalactic.Component<'a', BreadcrumbsItemProps>;
};

export default Breadcrumbs;
