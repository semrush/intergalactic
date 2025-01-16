import React from 'react';
import { Intergalactic, PropGetterFn, UnknownProperties } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { NeighborItemProps, NeighborLocationProps } from '@semcore/neighbor-location';
import { WithAutoFocusEnhanceProps } from '@semcore/core/lib/utils/enhances/autoFocusEnhance';

export type InputSize = 'm' | 'l';

/** @deprecated */
export interface IInputProps extends InputProps, UnknownProperties {}
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

/** @deprecated */
export interface IInputValueProps extends InputValueProps, UnknownProperties {}
export type InputValueProps = BoxProps &
  NeighborItemProps &
  WithAutoFocusEnhanceProps & {
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
     * @deprecated Set `disabled` on `Input` instead.
     * */
    disabled?: boolean;
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
  };

/** @deprecated */
export interface IInputAddonProps extends InputAddonProps, UnknownProperties {}
export type InputAddonProps = BoxProps &
  NeighborItemProps & {
    /**
     * Adds styles for interactive icons
     */
    interactive?: boolean;
    /**
     * Blocks the addon
     * */
    disabled?: boolean;
    /**
     * Input size
     * @default m
     */
    size?: InputSize;
  };

/** @deprecated */
export interface IInputCtx extends InputCtx, UnknownProperties {}
export type InputCtx = {
  getValueProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};

declare const Input: Intergalactic.Component<'div', InputProps, InputCtx> & {
  Value: Intergalactic.Component<'input', InputValueProps>;
  Addon: Intergalactic.Component<'div', InputAddonProps>;
};
export default Input;
