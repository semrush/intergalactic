type PasteProps = {
  /**
   * @default '\n'
   */
  delimiter?: string;
  /**
   * @default row.trim();
   */
  rowProcessing?: (row: string) => string;
  /**
   * @default true
   */
  skipEmptyRows?: boolean;
};

export type ErrorItem = {
  rowIndex: number;
  rowNode: Node;
  errorMessage: string;
};

export type InputFieldProps = {
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
  value: string;
  /**
   * This component doesn't have default onChange callback, because we think that you need only the result after every changes/fixes
   */
  onBlur: (value: string, e: Event) => void;

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
  validateOn: ('blur' | 'enterNextRow' | 'paste')[];

  /**
   * Function to validate row
   */
  rowValidation?: (row: string, rows: string[]) => { isValid: boolean; errorMessage: string };

  /**
   * Message for display error about whole field, not only one row
   */
  commonErrorMessage: string;

  /**
   * Delimiters (event.key) for rows
   * @default Enter
   */
  rowsDelimiters?: string[];

  /**
   * Count of max rows in badge
   * @default 100
   */
  ofRows?: number;

  /**
   * @default true
   */
  skipEmptyRowsInCounter?: boolean;

  /**
   * Paste props
   */
  pasteProps: PasteProps;

  /**
   * Internal
   */
  lastError: ErrorItem;

  /**
   * Internal
   */
  currentRowIndex: number;

  /**
   * Internal
   */
  onEnterNextRow: () => void;
  /**
   * Internal
   */
  onChangeRowsCount: (rowsCount: number) => void;

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
   */
  onErrorsChange: (errors: ErrorItem[]) => void;
};
