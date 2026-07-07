import type { BoxProps, NeighborItemProps, NeighborLocationProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type React from 'react';

declare namespace NSInput {
  type Size = 'm' | 'l';
  type Props = BoxProps &
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
      size?: NSInput.Size;
      /**
       * Sets the input state
       * @default normal
       */
      state?: 'normal' | 'invalid' | 'valid';
    };
  type DefaultProps = {
    size: 'm';
    state: 'normal';
  };
  type Ctx = {
    getValueProps: PropGetterFn;
    getAddonProps: PropGetterFn;
  };

  namespace Value {
    type Props = BoxProps &
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
        size?: NSInput.Size;
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
    type DefaultProps = {
      defaultValue: '';
    };
    type Handlers = {
      value: (e: React.ChangeEvent<HTMLInputElement>) => string;
    };

    type Component = Intergalactic.Component<'input', Props>;
  }

  namespace Addon {
    type Props = BoxProps & NeighborItemProps;

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Value: Value.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type InputSize = NSInput.Size;
/** @deprecated It will be removed in v18. */
export type InputProps = NSInput.Props;
/** @deprecated It will be removed in v18. */
export type InputValueProps = NSInput.Value.Props;
/** @deprecated It will be removed in v18. */
export type InputAddonProps = NSInput.Addon.Props;
/** @deprecated It will be removed in v18. */
export type InputCtx = NSInput.Ctx;

export type { NSInput };
