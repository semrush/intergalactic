import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export type RadioSize = 'm' | 'l';
export type RadioState = 'normal' | 'invalid';
export type RadioValue = string | number | boolean;

/** @deprecated */
export interface IRadioProps extends RadioProps, UnknownProperties {}
export type RadioProps = BoxProps & {
  /** Radio item value **/
  value?: RadioValue;

  /** Radio item checked flag **/
  checked?: boolean;

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
  /** Radio item text **/
  label?: string;
  /** Blocks access and changes to the radio item **/
  disabled?: boolean;
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
export type RadioValueProps = BoxProps & {
  /** List of elements that can be put on a hidden input */
  includeInputProps?: string[];
  /**
   * @deprecated set `state` on root Radio instead
   * The value displaying the state of the component
   * @default normal
   */
  state?: RadioState;
  /**
   * @deprecated
   * The theme of the radio button that you can send your color to
   */
  theme?: string;
  /**
   * @deprecated set `size` on root RadioGroup instead
   * Radio button size
   */
  size?: RadioSize;
  /**
   * @deprecated set `value` on root Radio instead
   * The element value is required for RadioGroup
   */
  value?: RadioValue;
  /**
   * @deprecated set `defaultValue` on root RadioGroup instead
   * Default value if `value` property is not provided
   */
  defaultValue?: RadioValue;
  /**
   * @deprecated set `onChange` on root RadioGroup instead
   * Called when the value changes
   */
  onChange?: (value: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
  /**
   * @deprecated set `disabled` on root Radio instead
   * Blocks access and changes to the form field
   */
  disabled?: boolean;
};

/** @deprecated */
export interface IRadioCtx extends RadioCtx, UnknownProperties {}
export type RadioCtx = {
  getValueProps: PropGetterFn;
  getTextProps: PropGetterFn;
};

type IntergalacticRadioGroupComponent<PropsExtending = {}> = (<
  Value extends RadioValue,
  Tag extends Intergalactic.Tag = typeof Flex,
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, typeof Flex, RadioGroupProps<Value>> &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', typeof Flex, RadioGroupProps>;

export type RadioValueControlProps = {};
export type RadioValueMarkProps = {};

declare const RadioGroup: IntergalacticRadioGroupComponent;

export { RadioGroup };

declare const Radio: Intergalactic.Component<'label', RadioProps, RadioCtx> & {
  Value: Intergalactic.Component<'input', RadioValueProps> & {
    Control: Intergalactic.Component<'input', RadioValueControlProps>;
    RadioMark: Intergalactic.Component<typeof Box, RadioValueMarkProps>;
  };
  Text: typeof Text;
};

declare const wrapRadioGroup: <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticRadioGroupComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
) => IntergalacticRadioGroupComponent<PropsExtending>;
export { wrapRadioGroup };

export default Radio;
