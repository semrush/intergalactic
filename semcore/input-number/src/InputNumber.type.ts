import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { NSInput } from '@semcore/input';
import type React from 'react';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSInputNumber {
  type Value = string;
  type ValueNumber = number | null;
  type CalculatedValue<V> = V extends Value ? Value : ValueNumber;
  type Size = 'm' | 'l';
  type Props = NSInput.Props & {
    /** Input size
     * @default m
     * */
    size?: NSInputNumber.Size;
    /**
     * Locale value
     */
    locale?: string;
  };
  type DefaultProps = {
    size: 'm';
    i18n: LocalizedMessages;
    locale: 'en';
  };
  type Ctx = {
    getValueProps: PropGetterFn;
    getControlsProps: PropGetterFn;
    getAddonProps: PropGetterFn;
  };

  namespace Value {
    type Props<V extends Value | ValueNumber> = Intergalactic.InternalTypings.EfficientOmit<NSInput.Value.Props, 'value' | 'onChange'> & {
      /** Minimum value
       * @default Number.MIN_SAFE_INTEGER
       */
      min?: number;
      /** Maximum value
       * @default Number.MAX_SAFE_INTEGER
       */
      max?: number;
      /** Value change step
       * @default 1
       */
      step?: number;
      /** Numeric value */
      value?: CalculatedValue<V>;
      /** Called when the input value changes, it returns its current value in numeric format */
      onChange?: (value: CalculatedValue<V>, event?: React.SyntheticEvent<HTMLInputElement>) => void;
    };
    type DefaultProps = {
      defaultValue: '';
      step: 1;
    };
    type State = {
      displayValue: NSInputNumber.Value;
    };
    type Handlers<V extends Value | ValueNumber> = {
      value: [
        null,
        (value: Props<V>['value'], event: React.SyntheticEvent | WheelEvent) => void,
      ];
    };

    type Component<V extends Value | ValueNumber> = Intergalactic.Component<'input', Props<V>>;
  }

  namespace Controls {
    type Props = NSInput.Addon.Props & {
      /** Always displays controls (steppers)
       * @default false
       */
      showControls?: boolean;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Addon {
    type Component = Intergalactic.Component<'div', NSInput.Addon.Props>;
  }

  type Component<V extends Value | ValueNumber> = Intergalactic.Component<'div', Props, Ctx> & {
    Value: Value.Component<V>;
    Controls: Controls.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type InputNumberValue = NSInputNumber.Value;
/** @deprecated It will be removed in v18. */
export type InputNumberSize = NSInputNumber.Size;
/** @deprecated It will be removed in v18. */
export type InputNumberProps = NSInputNumber.Props;
/** @deprecated It will be removed in v18. */
export type InputNumberValueProps = NSInputNumber.Value.Props<string>;
/** @deprecated It will be removed in v18. */
export type InputNumberControlsProps = NSInputNumber.Controls.Props;
/** @deprecated It will be removed in v18. */
export type InputNumberCtx = NSInputNumber.Ctx;

export type { NSInputNumber };
