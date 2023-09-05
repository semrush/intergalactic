import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps, Flex } from '@semcore/flex-box';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { Text } from '@semcore/typography';

export type RadioSize = 'm' | 'l';
export type RadioState = 'normal' | 'invalid';
export type RadioValue = string | number | boolean;

/** @deprecated */
export interface IRadioProps extends RadioProps, UnknownProperties {}
export type RadioProps = BoxProps & {
  /**
   * The value displaying the state of the component
   * @default normal
   */
  state?: RadioState;
  /**
   * Radio button size
   * @default m
   **/
  size?: RadioSize;
  /** The theme of the radio button that you can send your color to */
  theme?: string;
};

/** @deprecated */
export interface IRadioGroupProps extends RadioGroupProps, UnknownProperties {
  /**
   *  HTML tag name for the displayed item
   */
  tag?: React.ElementType | string;
}
export type RadioGroupProps<T extends RadioValue = RadioValue> = {
  /** Radio group name */
  name?: string;
  /** Active default value */
  defaultValue?: T;
  /** Active value */
  value?: T;
  /** Called when the selected element is changed */
  onChange?:
    | ((value: T, e?: React.SyntheticEvent<HTMLInputElement>) => void)
    | React.Dispatch<React.SetStateAction<T>>;
  /** Radio button size */
  size?: RadioSize;
  /** The theme of the radio button that you can send your color to */
  theme?: string;
  /** Blocks access and changes to the form field */
  disabled?: boolean;
};

/** @deprecated */
export interface IRadioValueProps extends RadioValueProps, UnknownProperties {}
export type RadioValueProps = BoxProps &
  KeyboardFocusProps & {
    /** List of elements that can be put on a hidden input */
    includeInputProps?: string[];
    /**
     * The value displaying the state of the component
     * @default normal
     */
    state?: RadioState;
    /** The theme of the radio button that you can send your color to */
    theme?: string;
    /** Radio button size */
    size?: RadioSize;
    /** The element value is required for RadioGroup */
    value?: RadioValue;
    /** Default value if `value` property is not provided */
    defaultValue?: RadioValue;
    /** Called when the value changes */
    onChange?: (value: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
    /** Blocks access and changes to the form field */
    disabled?: boolean;
  };

/** @deprecated */
export interface IRadioCtx extends RadioCtx, UnknownProperties {}
export type RadioCtx = {
  getValueProps: PropGetterFn;
  getTextProps: PropGetterFn;
};

type IntergalacticRadioGroupComponent = (<
  Value extends RadioValue,
  Tag extends Intergalactic.Tag = typeof Flex,
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, typeof Flex, RadioGroupProps<Value>>,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div'>;

declare const RadioGroup: IntergalacticRadioGroupComponent;

export { RadioGroup };

declare const Radio: Intergalactic.Component<'label', RadioProps, RadioCtx> & {
  Value: Intergalactic.Component<'input', RadioValueProps>;
  Text: typeof Text;
};

export default Radio;
