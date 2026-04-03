import type { BoxProps, NeighborItemProps, NeighborLocationProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type React from 'react';

export type InputSize = 'm' | 'l';

export type InputProps = BoxProps &
  NeighborItemProps &
  NeighborLocationProps & {
    /**
     * Sets the input and addons to the disabled state
     * */
    disabled?: boolean;
    /**
     * Input size
     * @default m
     */
    size?: InputSize;
    /**
     * Sets the input state
     * @default normal
     */
    state?: 'normal' | 'invalid' | 'valid';
  };

export type InputValueProps = BoxProps &
  NeighborItemProps & {
    /**
     * Input value
     */
    value?: string;
    /**
     * Default value if `value` property is not provided
     */
    defaultValue?: string;
    /**
     * Handler for changing the value
     */
    onChange?: (value: string, event: React.SyntheticEvent<HTMLInputElement>) => void;
    /**
     * Sets the input to the read-only state
     * */
    readOnly?: boolean;
    /**
     * Input size
     * @default m
     */
    size?: InputSize;
    /**
     * Placeholder for input
     */
    placeholder?: string;
    /**
     * Flag to enable autofocusing after component mounting
     * @default false
     */
    autoFocus?: boolean;
  };

export type InputAddonProps = BoxProps & NeighborItemProps;

export type InputCtx = {
  getValueProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};

declare const Input: Intergalactic.Component<'div', InputProps, InputCtx> & {
  Value: Intergalactic.Component<'input', InputValueProps>;
  Addon: Intergalactic.Component<'div', InputAddonProps>;
};
export default Input;
