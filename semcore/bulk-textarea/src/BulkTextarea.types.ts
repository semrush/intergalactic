import type { BoxProps } from '@semcore/base-components';
import type { NSButton } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type { NSCounter } from '@semcore/counter';

declare namespace NSBulktextarea {
  type Props<T extends string | string[]> = {
    /** The current value */
    value?: NSBulktextarea.InputField.Props<T>['value'];
    /** Callback triggered when the onBlur event is emmited */
    onChange?: NSBulktextarea.InputField.Props<T>['onBlur'];
    /** Placeholder text */
    placeholder?: NSBulktextarea.InputField.Props<T>['placeholder'];
    /** Component size */
    size?: NSBulktextarea.InputField.Props<T>['size'];
    /** State for show errors or valid(green) borders */
    state?: NSBulktextarea.InputField.Props<T>['state'];
    /** Defines whether the textarea is disabled */
    disabled?: NSBulktextarea.InputField.Props<T>['disabled'];
    /** Defines whether the textarea is readonly */
    readonly?: NSBulktextarea.InputField.Props<T>['readonly'];
    /** Minimum number of rows to display */
    minRows?: NSBulktextarea.InputField.Props<T>['minRows'];
    /** Maximum number of rows to display */
    maxRows?: NSBulktextarea.InputField.Props<T>['maxRows'];
    /** An event when a validation occurs */
    validateOn?: NSBulktextarea.InputField.Props<T>['validateOn'];
    /** A function to valide the line */
    lineValidation?: NSBulktextarea.InputField.Props<T>['lineValidation'];
    /** Line delimeters */
    linesDelimiters?: NSBulktextarea.InputField.Props<T>['linesDelimiters'];
    /** Defines the props for paste action */
    pasteProps?: NSBulktextarea.InputField.Props<T>['pasteProps'];
    /** Maximum number of allowed lines/values */
    maxLines?: NSBulktextarea.InputField.Props<T>['maxLines'];
    /** Function to process individual lines during input */
    lineProcessing?: NSBulktextarea.InputField.Props<T>['lineProcessing'];
    /** List of errors */
    errors?: Array<NSBulktextarea.ErrorItem>;
    /** Defines whether to show errors or not */
    showErrors?: boolean;
    /** Internal */
    onErrorsChange?: (errors: NSBulktextarea.ErrorItem[]) => void;
    /** Internal */
    onShowErrorsChange?: (showErrors: boolean) => void;
    /** Internal */
    onImmediatelyChange?: (lines: string[], value: string) => void;
  };
  type DefaultProps<T extends string | string[]> = {
    defaultValue: T;
    size: 'm';
    defaultState: 'normal';
    minRows: 2;
    maxRows: 10;
    maxLines: 100;
    validateOn: NSBulktextarea.Props<T>['validateOn'];
    locale: 'en';
    defaultErrors: NSBulktextarea.Props<T>['errors'];
    defaultShowErrors: false;
  };
  type State = {
    linesCount: number;
    isEmptyText: boolean;
    errorIndex: number;
    highlightErrorIndex: boolean;
    prevError?: NSBulktextarea.ErrorItem;
  };
  type Handlers = {
    value: null;
    state: null;
    showErrors: null;
    errors: null;
  };
  type ErrorItem = {
    lineIndex: number;
    lineNode?: Node;
    errorMessage: string;
  };

  namespace InputField {
    type Props<T extends string | string[] = string | string[]> = BoxProps & {
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
      pasteProps?: {
        /**
         * @default '\n'
         */
        delimiter?: string | RegExp;
        /**
         * @default row.trim();
         */
        lineProcessing?: (line: string, lineIndex: number, totalLinesCount: number) => string;
        /**
         * @default true
         */
        skipEmptyLines?: boolean;
      };
      /**
       * Function for process line after it was blurred
       */
      lineProcessing?: (line: string, lines: string[]) => string;
    };
    type DefaultProps = {
      defaultValue: '';
      size: 'm';
      state: 'normal';
      minRows: 2;
      maxRows: 10;
      defaultShowErrors: false;
      defaultErrorIndex: -1;
      defaultLinesCount: 0;
    };
    type Handlers = {
      value: null;
      linesCount: null;
      errorIndex: null;
    };
    type State = {
      keyboardLineIndex: number;
      mouseLineIndex: number;
      visibleErrorPopper: boolean;
    };

    type Component<T extends string | string[] = string | string[]> = Intergalactic.Component<'div', Props<T>>;
  }

  namespace Counter {
    type Props = {
      theme?: NSCounter.Props['theme'];
      linesCount?: number;
      maxLines?: number;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace ClearAll {
    type Component = NSButton.Component;
  }

  namespace ErrorsNavigation {
    type Props = {
      errorIndex?: number;
      onPrevError?: () => void;
      onNextError?: () => void;
      errorsCount?: number;
      size?: 'm' | 'l';
      showErrors?: boolean;
      disabled?: boolean;
      nextButtonRef?: React.RefObject<HTMLButtonElement>;
      prevButtonRef?: React.RefObject<HTMLButtonElement>;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type RootComponent = (<T extends string | string[]>(
    props: Intergalactic.InternalTypings.ComponentProps<'div', 'div', BoxProps & NSBulktextarea.Props<T>>,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', {}>;

  type Component<T extends string | string[]> = RootComponent & {
    InputField: InputField.Component<T>;
    Counter: Counter.Component;
    ClearAll: ClearAll.Component;
    ErrorsNavigation: ErrorsNavigation.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type BulkTextareaProps<T extends string | string[]> = NSBulktextarea.Props<T>;
/** @deprecated It will be removed in v18. */
export type BulkTextareaDefaultProps<T extends string | string[]> = NSBulktextarea.DefaultProps<T>;
/** @deprecated It will be removed in v18. */
export type BulkTextareaInputFieldProps<T extends string | string[] = string | string[]> =
  NSBulktextarea.InputField.Props<T>;
/** @deprecated It will be removed in v18. */
export type BulkTextareaType<T extends string | string[]> = NSBulktextarea.Component<T>;
/** @deprecated It will be removed in v18. */
export type ErrorItem = NSBulktextarea.ErrorItem;

export type { NSBulktextarea };
