import { Intergalactic } from '@semcore/utils/lib/core';
import { BoxProps } from '@semcore/flex-box';
import Button from '@semcore/button';
import { InputFieldProps } from './components/InputField/InputField';
import { CounterProps } from './components/Counter';
import { ErrorsNavigationProps } from './components/ErrorsNavigation';

export type BulkTextareaProps = {
  value?: InputFieldProps['value'];
  onChange?: InputFieldProps['onBlur'];
  placeholder?: InputFieldProps['placeholder'];
  size?: InputFieldProps['size'];
  state?: InputFieldProps['state'];
  disabled?: InputFieldProps['disabled'];
  readonly?: InputFieldProps['readonly'];

  minRows?: InputFieldProps['minRows'];
  maxRows?: InputFieldProps['maxRows'];

  validateOn?: InputFieldProps['validateOn'];
  lineValidation?: InputFieldProps['lineValidation'];
  linesDelimiters?: InputFieldProps['linesDelimiters'];
  pasteProps?: InputFieldProps['pasteProps'];

  maxLines?: InputFieldProps['maxLines'];
  lineProcessing?: InputFieldProps['lineProcessing'];

  errors?: InputFieldProps['errors'];
  showErrors?: boolean;

  onErrorsChange?: InputFieldProps['onErrorsChange'];
  onShowErrorsChange?: InputFieldProps['onShowErrorsChange'];
};

export type BulkTextareaType = Intergalactic.Component<'div', BoxProps & BulkTextareaProps> & {
  InputField: Intergalactic.Component<
    'div',
    Pick<InputFieldProps, 'commonErrorMessage' | 'id'> & Partial<BulkTextareaProps> & BoxProps
  >;
  Counter: Intergalactic.Component<'div', Partial<CounterProps>>;
  ClearAll: typeof Button;
  ErrorsNavigation: Intergalactic.Component<'div', Partial<ErrorsNavigationProps>>;
};
