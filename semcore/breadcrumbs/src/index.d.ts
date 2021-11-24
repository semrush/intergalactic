import { CProps, ReturnEl, PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

export interface IBreadcrumbsProps extends IBoxProps {
  /**
   * Links divider
   * */
  separator?: React.ReactNode;
}

export interface IBreadcrumbsItemProps extends IBoxProps, IKeyboardFocusProps {
  /** The property is responsible for the activity of the element */
  active?: boolean;
}

export interface IBreadcrumbsContext extends IBreadcrumbsProps {
  getItemProps: PropGetterFn;
}

declare const Breadcrumbs: (<T>(
  props: CProps<IBreadcrumbsProps & T, IBreadcrumbsContext>,
) => ReturnEl) & {
  Item: <T>(props: IBreadcrumbsItemProps & T) => ReturnEl;
};

export default Breadcrumbs;
