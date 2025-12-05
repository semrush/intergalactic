import type { Box, BoxProps, Flex } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { Text } from '@semcore/typography';
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
