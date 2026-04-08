import type { Box, BoxProps, Flex } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text, TextProps } from '@semcore/typography';
import type React from 'react';

export type RadioSize = 'm' | 'l';
export type RadioState = 'normal' | 'invalid';
export type RadioValue = string | number | boolean;

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

export type RadioValueProps = BoxProps & {
  /** List of elements that can be put on a hidden input */
  includeInputProps?: string[];
};

export type RadioCtx = {
  getValueProps: PropGetterFn;
  getTextProps: PropGetterFn;
};

export type IntergalacticRadioGroupComponent<PropsExtending = {}> = (<
  Value extends RadioValue,
  Tag extends Intergalactic.Tag = typeof Flex,
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, typeof Flex, RadioGroupProps<Value>> &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', typeof Flex, RadioGroupProps>;

export type RadioValueControlProps = {};
export type RadioValueMarkProps = {};
export type RadioTextProps = TextProps;

export type RadioValueControlComponent = Intergalactic.Component<'input', RadioValueControlProps>;
export type RadioValueRadioMarkComponent = Intergalactic.Component<typeof Box, RadioValueMarkProps>;

export type RadioValueComponent = Intergalactic.Component<'input', RadioValueProps> & {
  Control: RadioValueControlComponent;
  RadioMark: RadioValueRadioMarkComponent;
};

export type RadioTextComponent = typeof Text;

export type RadioRootComponent = Intergalactic.Component<'label', RadioProps, RadioCtx>;
export type RadioComponent = RadioRootComponent & {
  Value: RadioValueComponent;
  Text: RadioTextComponent;
};
