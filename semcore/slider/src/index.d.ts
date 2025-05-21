import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps, FlexProps } from '@semcore/flex-box';

type SliderValue = string | number;

type SliderContext = {
  getOptionsProps: PropGetterFn;
  getItemProps: PropGetterFn;
};
type SliderHandlers = {
  value: (index: SliderValue) => void;
};

export type SliderOption<OptionValue extends SliderValue> = {
  value: OptionValue;
  label: React.ReactNode;
};

/** @deprecated */
export interface ISliderProps<Value extends SliderValue = SliderValue>
  extends SliderProps<Value>,
    UnknownProperties {}
export type SliderProps<Value extends SliderValue = SliderValue> = BoxProps & {
  /** Numeric value
   */
  value?: Value;
  /** Numeric default value
   * @default 0
   */
  defaultValue?: Value;
  /** Minimum value
   * @default 0
   */
  min?: number;
  /** Maximum value
   * @default 100
   */
  max?: number;
  /** Value change step
   * @default 1
   */
  step?: number;
  /**
   * Handler for changing the value
   */
  onChange?:
    | ((value: Value, event: React.SyntheticEvent) => void)
    | React.Dispatch<React.SetStateAction<Value>>;
  /**
   * Disable element
   */
  disabled?: boolean;

  options?: SliderOption<Value>[];
};

type SliderOptionsProps = FlexProps;
type SliderItemProps = BoxProps;

type IntergalacticSliderComponent<PropsExtending = {}> = (<
  Value extends SliderValue,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', SliderProps<Value>> &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', SliderProps>;

declare const Slider: IntergalacticSliderComponent & {
  Knob: typeof Box;
  Bar: typeof Box;
  Options: Intergalactic.Component<
    'div',
    SliderOptionsProps,
    SliderContext,
    [handlers: SliderHandlers]
  >;
  Item: Intergalactic.Component<'div', SliderItemProps, SliderContext, [handlers: SliderHandlers]>;
};

declare const wrapSlider: <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticSliderComponent>
    > &
      PropsExtending,
  ) => React.ReactNode,
) => IntergalacticSliderComponent<PropsExtending>;
export { wrapSlider };

export default Slider;
