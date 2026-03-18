import type { BulkTextareaInputFieldProps } from '../../BulkTextarea.types';

export type PasteProps = {
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

export type InputFieldProps<T extends string | string[]> =
  BulkTextareaInputFieldProps<T>
  & Required<
    Pick<
      BulkTextareaInputFieldProps<T>,
      'value' | 'onBlur' | 'size' | 'state' | 'minRows' | 'maxRows' | 'validateOn' | 'maxLines' | 'pasteProps'
    >
  >
  & {
    prevError: ErrorItem;
    currentLineIndex: number;
    linesCount: number;
    onChangeLineIndex: (newIndex: number) => void;
    onChangeLinesCount: (rowsCount: number) => void;
    showErrors: boolean;
    /** List of errors in rows */
    errors: ErrorItem[];
    /** Select row with error */
    errorIndex: number;
    /** Flag for select all row */
    highlightErrorIndex: boolean;
    onErrorsChange: (errors: ErrorItem[]) => void;
    onShowErrorsChange: (showErrors: boolean) => void;
    onErrorIndexChange: (errorIndex: number) => void;
    /**
     * Return lines from textarea immediately they changed (uses mutation observer on textarea node under the hood)
     * Throttling may be required during processing this cb
     */
    onImmediatelyChange?: (lines: string[], value: string) => void;
  }
  & { 'aria-describedby'?: string };
