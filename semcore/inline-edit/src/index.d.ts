import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactElement) | React.ReactElement;
};
/* utils type */

export interface IInlineEditProps extends IBoxProps {
  defaultEditable?: boolean;
  editable?: boolean;
  onEdit?: () => void;
}

export interface IInlineEditViewProps extends IBoxProps {}
export interface IInlineEditEditProps extends IBoxProps {}

interface IInputCtx {
  getViewProps: PropGetterFn;
  getEditProps: PropGetterFn;
}

declare const Input: (<T>(props: CProps<IInlineEditProps & T, IInputCtx>) => React.ReactElement) & {
  View: <T>(props: CProps<IInlineEditViewProps & T, IInlineEditProps>) => React.ReactElement;
  Edit: <T>(props: CProps<IInlineEditEditProps & T, IInlineEditProps>) => React.ReactElement;
};
export default Input;
