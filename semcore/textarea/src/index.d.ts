import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { WithAutoFocusEnhanceProps } from '@semcore/core/lib/utils/enhances/autoFocusEnhance';
import type { Property } from 'csstype';
import type { SyntheticEvent } from 'react';

export type TextareaProps = BoxProps &
  WithAutoFocusEnhanceProps & {
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
  };

declare const Textarea: Intergalactic.Component<'textarea', TextareaProps>;

export default Textarea;
