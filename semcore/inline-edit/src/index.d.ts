import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';
import type { FadeInOutProps } from '@semcore/animation';

/** @deprecated */
export interface IInlineEditProps extends InlineEditProps, UnknownProperties {}
export type InlineEditProps = BoxProps & {
  /**
   * Determines which children should be displayed
   */
  editable?: boolean;

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
  locale?: string;
};

/** @deprecated */
export interface IInlineEditViewProps extends InlineEditViewProps, UnknownProperties {}
export type InlineEditViewProps = BoxProps & FadeInOutProps & {};
/** @deprecated */
export interface IInlineEditEditProps extends InlineEditEditProps, UnknownProperties {}
export type InlineEditEditProps = BoxProps & FadeInOutProps & {};

type InputCtx = {
  getViewProps: PropGetterFn;
  getEditProps: PropGetterFn;
};

declare const InlineEdit: Intergalactic.Component<'div', InlineEditProps, InputCtx> & {
  View: Intergalactic.Component<'div', InlineEditViewProps, InlineEditProps>;
  Edit: Intergalactic.Component<'div', InlineEditEditProps, InlineEditProps>;
};
export default InlineEdit;
