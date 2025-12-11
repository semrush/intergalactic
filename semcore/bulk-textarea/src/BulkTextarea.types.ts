import type { BoxProps } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

import type { CounterProps } from './components/Counter';
import type { ErrorsNavigationProps } from './components/ErrorsNavigation';
import type { InputFieldProps } from './components/InputField/InputField';

export type BulkTextareaProps<T extends string | string[]> = {
  /** The current value */
  value?: InputFieldProps<T>['value'];
  /** Callback triggered when the onBlur event is emmited */
  onChange?: InputFieldProps<T>['onBlur'];
  /** Placeholder text */
  placeholder?: InputFieldProps<T>['placeholder'];
  /** Component size */
  size?: InputFieldProps<T>['size'];
  /** State for show errors or valid(green) borders */
  state?: InputFieldProps<T>['state'];
  /** Defines whether the textarea is disabled */
  disabled?: InputFieldProps<T>['disabled'];
  /** Defines whether the textarea is readonly */
  readonly?: InputFieldProps<T>['readonly'];
  /** Minimum number of rows to display */
  minRows?: InputFieldProps<T>['minRows'];
  /** Maximum number of rows to display */
  maxRows?: InputFieldProps<T>['maxRows'];
  /** An event when a validation occurs */
  validateOn?: InputFieldProps<T>['validateOn'];
  /** A function to valide the line */
  lineValidation?: InputFieldProps<T>['lineValidation'];
  /** Line delimeters */
  linesDelimiters?: InputFieldProps<T>['linesDelimiters'];
  /** Defines the props for paste action */
  pasteProps?: InputFieldProps<T>['pasteProps'];
  /** Maximum number of allowed lines/values */
  maxLines?: InputFieldProps<T>['maxLines'];
  /** Function to process individual lines during input */
  lineProcessing?: InputFieldProps<T>['lineProcessing'];
  /** List of errors */
  errors?: InputFieldProps<T>['errors'];
  /** Defines whether to show errors or not */
  showErrors?: boolean;
  /** Internal */
  onErrorsChange?: InputFieldProps<T>['onErrorsChange'];
  /** Internal */
  onShowErrorsChange?: InputFieldProps<T>['onShowErrorsChange'];
  /** Internal */
  onImmediatelyChange?: InputFieldProps<T>['onImmediatelyChange'];
};
