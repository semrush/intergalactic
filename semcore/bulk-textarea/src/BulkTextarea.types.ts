import type { BoxProps } from '@semcore/base-components';
import type { NSButton } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

import type { CounterProps } from './components/Counter';
import type { ErrorsNavigationProps } from './components/ErrorsNavigation';
import type { InputFieldProps } from './components/InputField/InputField';
import type { PasteProps } from './components/InputField/InputField.types';

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
  showErrors?: InputFieldProps<T>['showErrors'];
  /** Internal */
  onErrorsChange?: InputFieldProps<T>['onErrorsChange'];
  /** Internal */
  onShowErrorsChange?: InputFieldProps<T>['onShowErrorsChange'];
  /** Internal */
  onImmediatelyChange?: InputFieldProps<T>['onImmediatelyChange'];
};

export type BulkTextareaDefaultProps<T extends string | string[]> = {
  defaultValue: T;
  size: 'm';
  defaultState: 'normal';
  minRows: 2;
  maxRows: 10;
  maxLines: 100;
  validateOn: BulkTextareaProps<T>['validateOn'];
  locale: 'en';
  defaultErrors: BulkTextareaProps<T>['errors'];
  defaultShowErrors: false;
};

type BulkTextareaComponent = (<T extends string | string[]>(
  props: Intergalactic.InternalTypings.ComponentProps<
    'div',
    'div',
    BoxProps & BulkTextareaProps<T>
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', {}>;

export type BulkTextareaInputFieldProps<T extends string | string[] = string | string[]> = BoxProps & {
  /**
   * Unique id
   */
  id?: string;
  /**
   * Placeholder for field
   */
  placeholder?: string;
  /**
   * String to render in textarea. OnChanging value, it will go throw paste pipeline
   */
  value?: T;
  /**
   * This component doesn't have default onChange callback, because we think that you need only the result after every changes/fixes
   */
  onBlur?: (value: T, e: Event) => void;
  /**
   * Size of component
   * @default m
   */
  size?: 'm' | 'l';
  /**
   * State for show errors or valid(green) borders
   * @default normal
   */
  state?: 'normal' | 'valid' | 'invalid';
  /**
   * Flag for disabling field
   * @default false
   */
  disabled?: boolean;
  /**
   * Flag for readonly field
   * @default false
   */
  readonly?: boolean;
  /**
   * Min rows
   * @default 2
   */
  minRows?: number;
  /**
   * Max rows
   * @default 10
   */
  maxRows?: number;
  /**
   * List of available points to validate value
   * @default blur
   */
  validateOn?: ('blur' | 'blurLine' | 'paste')[];
  /**
   * Function to validate line
   */
  lineValidation?: (line: string, lines: string[]) => { isValid: boolean; errorMessage: string };
  /**
   * Message for display error about whole field, not only one line.
   * If set empty string, field will not have invalid state.
   */
  commonErrorMessage: string;
  /**
   * Delimiters (event.key) for lines
   * @default Enter
   */
  linesDelimiters?: string[];
  /**
   * Count of max lines in badge
   * @default 100
   */
  maxLines?: number;
  /**
   * Paste props
   */
  pasteProps?: PasteProps;
  /**
   * Function for process line after it was blurred
   */
  lineProcessing?: (line: string, lines: string[]) => string;
};

export type BulkTextareaType<T extends string | string[]> = BulkTextareaComponent & {
  InputField: Intergalactic.Component<
    'div',
    BulkTextareaInputFieldProps<T>
  >;
  Counter: Intergalactic.Component<'div', Partial<CounterProps>>;
  ClearAll: NSButton.Component;
  ErrorsNavigation: Intergalactic.Component<'div', Partial<ErrorsNavigationProps>>;
};
