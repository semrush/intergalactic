type PasteProps = {
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

export type ErrorItem = {
  lineIndex: number;
  lineNode?: Node;
  errorMessage: string;
};

export type InputFieldProps<T extends string | string[]> = {
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
  value: T;
  /**
   * This component doesn't have default onChange callback, because we think that you need only the result after every changes/fixes
   */
  onBlur: (value: T, e: Event) => void;

  /**
   * Size of component
   * @default m
   */
  size: 'm' | 'l';
  /**
   * State for show errors or valid(green) borders
   * @default normal
   */
  state: 'normal' | 'valid' | 'invalid';

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
  minRows: number;
  /**
   * Max rows
   * @default 10
   */
  maxRows: number;

  /**
   * List of available points to validate value
   * @default blur
   */
  validateOn: ('blur' | 'blurLine' | 'paste')[];

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
  maxLines: number;

  /**
   * Paste props
   */
  pasteProps: PasteProps;

  /**
   * Function for process line after it was blurred
   */
  lineProcessing?: (line: string, lines: string[]) => string;

  /**
   * Internal
   */
  prevError: ErrorItem;

  /**
   * Internal
   */
  currentLineIndex: number;

  /**
   * Internal
   */
  linesCount: number;
  /**
   * Internal
   */
  onChangeLineIndex: (newIndex: number) => void;
  /**
   * Internal
   */
  onChangeLinesCount: (rowsCount: number) => void;

  /**
   * Internal
   */
  showErrors: boolean;
  /**
   * Internal
   * List of errors in rows
   */
  errors: ErrorItem[];
  /**
   * Internal
   * Select row with error
   */
  errorIndex: number;
  /**
   * Internal
   * Flag for select all row
   */
  highlightErrorIndex: boolean;
  /**
   * Internal
   */
  onErrorsChange: (errors: ErrorItem[]) => void;
  /**
   * Internal
   */
  onShowErrorsChange: (showErrors: boolean) => void;
  /**
   * Internal
   */
  onErrorIndexChange: (errorIndex: number) => void;

  /**
   * Internal
   */
  'aria-describedby'?: string;
};
