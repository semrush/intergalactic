import { Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import Button from '@semcore/button';
import { InputFieldProps } from './components/InputField/InputField';
import { CounterProps } from './components/Counter';
import { ErrorsNavigationProps } from './components/ErrorsNavigation';

export type BulkTextareaProps<T extends string | string[]> = {
  value?: InputFieldProps<T>['value'];
  onChange?: InputFieldProps<T>['onBlur'];
  placeholder?: InputFieldProps<T>['placeholder'];
  size?: InputFieldProps<T>['size'];
  state?: InputFieldProps<T>['state'];
  disabled?: InputFieldProps<T>['disabled'];
  readonly?: InputFieldProps<T>['readonly'];

  minRows?: InputFieldProps<T>['minRows'];
  maxRows?: InputFieldProps<T>['maxRows'];

  validateOn?: InputFieldProps<T>['validateOn'];
  lineValidation?: InputFieldProps<T>['lineValidation'];
  linesDelimiters?: InputFieldProps<T>['linesDelimiters'];
  pasteProps?: InputFieldProps<T>['pasteProps'];

  maxLines?: InputFieldProps<T>['maxLines'];
  lineProcessing?: InputFieldProps<T>['lineProcessing'];

  errors?: InputFieldProps<T>['errors'];
  showErrors?: boolean;

  onErrorsChange?: InputFieldProps<T>['onErrorsChange'];
  onShowErrorsChange?: InputFieldProps<T>['onShowErrorsChange'];
};

type BulkTextareaComponent = (<T extends string | string[]>(
  props: Intergalactic.InternalTypings.ComponentProps<
    'div',
    'div',
    BoxProps & BulkTextareaProps<T>
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', {}>;

export type BulkTextareaType<T extends string | string[]> = BulkTextareaComponent & {
  InputField: Intergalactic.Component<
    'div',
    Pick<InputFieldProps<T>, 'commonErrorMessage' | 'id'> & Partial<BulkTextareaProps<T>> & BoxProps
  >;
  Counter: Intergalactic.Component<'div', Partial<CounterProps>>;
  ClearAll: typeof Button;
  ErrorsNavigation: Intergalactic.Component<'div', Partial<ErrorsNavigationProps>>;
};
