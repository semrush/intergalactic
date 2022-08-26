import { SyntheticEvent, TextareaHTMLAttributes } from 'react';
import { Property } from 'csstype';
import { IBoxProps } from '@semcore/flex-box';
import { ReturnEl, Merge } from '@semcore/core';
import { IWithAutoFocusEnhanceProps } from '@semcore/utils/lib/enhances/autoFocusEnhance';

export interface ITextareaProps extends IBoxProps, IWithAutoFocusEnhanceProps {
  /**
   * Text value of textarea
   */
  value?: string;
  /**
   * Default value if `value` property is not provided
   */
  defaultValue?: string;
  /** Textarea size
   * @default m
   */
  size?: 'm' | 'l' | false;
  /** The value responsible for the component state
   * @default normal
   */
  state?: 'normal' | 'invalid' | 'valid' | false;
  /** Value responsible for resizing textarea
   * @default none
   */
  resize?: Property.Resize | 'auto';
  /** Value responsible for the minimum number of rows in recalculation
   * @default 2
   * */
  minRows?: number;
  /** Value responsible for the maximum number of rows in recalculation */
  maxRows?: number;
  /**
   * Handler to change the value
   */
  onChange?: (value: string, event: SyntheticEvent<HTMLTextAreaElement>) => void;
}

declare const Textarea: <T>(
  props: Merge<ITextareaProps & T, TextareaHTMLAttributes<HTMLTextAreaElement>>,
) => ReturnEl;

export default Textarea;
