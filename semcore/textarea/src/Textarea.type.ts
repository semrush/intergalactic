import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { Property } from 'csstype';
import type { SyntheticEvent } from 'react';

declare namespace NSTextarea {
  type Props = NSBox.Props & {
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
  type DefaultProps = {
    size: 'm';
    state: 'normal';
    resize: 'none';
    minRows: 2;
    defaultValue: '';
  };
  type Handlers = {
    value: [
      (e: React.ChangeEvent<HTMLTextAreaElement>) => string,
      () => undefined,
    ];
  };

  type Component = Intergalactic.Component<'textarea', Props>;
}

/** @deprecated It will be removed in v18. */
export type TextareaProps = NSTextarea.Props;

export type { NSTextarea };
