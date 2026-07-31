import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { NSInput } from '@semcore/input';
import type React from 'react';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSInputNumber {
  type Value = string;
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
    type Props = NSInput.Value.Props & {
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
      value?: NSInputNumber.Value;
      /** Called when the input value changes, it returns its current value in numeric format */
      onChange?: (value: NSInputNumber.Value, event?: React.SyntheticEvent<HTMLInputElement>) => void;
    };
    type DefaultProps = {
      defaultValue: '';
      step: 1;
    };
    type State = {
      displayValue: NSInputNumber.Value;
    };
    type Handlers = {
      value: [
        null,
        (value: Props['value'], event: React.SyntheticEvent | WheelEvent) => void,
      ];
    };

    type Component = Intergalactic.Component<'input', Props>;
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

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Value: Value.Component;
    Controls: Controls.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type InputNumberValue = NSInputNumber.Value;
/** @deprecated It will be removed in v19. */
export type InputNumberSize = NSInputNumber.Size;
/** @deprecated It will be removed in v19. */
export type InputNumberProps = NSInputNumber.Props;
/** @deprecated It will be removed in v19. */
export type InputNumberValueProps = NSInputNumber.Value.Props;
/** @deprecated It will be removed in v19. */
export type InputNumberControlsProps = NSInputNumber.Controls.Props;
/** @deprecated It will be removed in v19. */
export type InputNumberCtx = NSInputNumber.Ctx;

export type { NSInputNumber };
