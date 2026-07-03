import type { FadeInOutProps, NSBox } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

export type InlineEditProps = NSBox.Props & {
  /**
   * Determines which children should be displayed
   */
  editable?: boolean;
  /** Callback for editable states changes */
  onEditableChange?: (editable: boolean, event?: React.SyntheticEvent) => void;
  /**
   * Default value if `editable` property is not provided
   * @default false
   */
  defaultEditable?: boolean;
  /**
   * Fired when user clicks on view children, expects `editable` property be switched to `true` value.
   * Note: there not pair callback that expects switch to edit mode, you should be handled by yourself
   */
  onEdit?: () => void;
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type InlineEditViewProps = NSBox.Props & FadeInOutProps & {};

export type InlineEditEditProps = NSBox.Props & FadeInOutProps & {};

type InputCtx = {
  getViewProps: PropGetterFn;
  getEditProps: PropGetterFn;
};

declare const InlineEdit: Intergalactic.Component<'div', InlineEditProps, InputCtx> & {
  View: Intergalactic.Component<'div', InlineEditViewProps, InlineEditProps>;
  Edit: Intergalactic.Component<'div', InlineEditEditProps, InlineEditProps>;
};
export default InlineEdit;
