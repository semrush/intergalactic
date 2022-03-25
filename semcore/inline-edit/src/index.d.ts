import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactElement) | React.ReactElement;
};
/* utils type */

export interface IInlineEditProps extends IBoxProps {
  /**
   * Determines which children should be displayed
   */
  editable?: boolean;
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
}

export interface IInlineEditViewProps extends IBoxProps {}
export interface IInlineEditEditProps extends IBoxProps {}

interface IInputCtx {
  getViewProps: PropGetterFn;
  getEditProps: PropGetterFn;
}

declare const InlineEdit: (<T>(
  props: CProps<IInlineEditProps & T, IInputCtx>,
) => React.ReactElement) & {
  View: <T>(props: CProps<IInlineEditViewProps & T, IInlineEditProps>) => React.ReactElement;
  Edit: <T>(props: CProps<IInlineEditEditProps & T, IInlineEditProps>) => React.ReactElement;
};
export default InlineEdit;
