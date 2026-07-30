import type { BoxProps } from '@semcore/base-components';
import type { ButtonLinkComponent } from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSInputNumber } from '@semcore/input-number';
import type React from 'react';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSInlineInput {
  type Props = BoxProps & {
    /**
     * Visual state of inline input
     * @default normal
     */
    state?: 'normal' | 'valid' | 'invalid';
    /**
     * Disabled input and shows spinner instead of confirm control
     * @default false
     */
    loading?: boolean;
    /**
     * Disabled input and controls
     * @default false
     */
    disabled?: boolean;
    /**
     * Fired with entered value when user clicks confirm control or hits `Enter` or `Space`
     */
    onConfirm?: (value: string, event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent) => void;
    /**
     * Fired with value (or defaultValue) that was provided during component mount when user clicks cancel control or hits `Escape`
     */
    onCancel?: (prevValue: string, event: React.MouseEvent | React.FocusEvent | React.KeyboardEvent) => void;
    /**
     * defines callback (`onCancel` or `onConfirm`) triggered when `blur` event out of container fired
     * Triggered after all previous macrotasks completed (internally called inside of `setTimeout`)
     */
    onBlurBehavior?: 'cancel' | 'confirm' | 'none';
    /** Specifies the locale for i18n support */
    locale?: string;
  };
  type DefaultProps = {
    state: 'normal';
    onBlurBehavior: 'confirm';
    i18n: LocalizedMessages;
    locale: 'en';
  };
  type Ctx = {
    getAddonProps: PropGetterFn;
    getConfirmControlProps: PropGetterFn;
    getCancelControlProps: PropGetterFn;
    getValueProps: PropGetterFn;
  };

  namespace Addon {
    type Props = BoxProps;

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Value {
    type Props = BoxProps & {
      /**
       * id attribute of input tag
       */
      id?: string;
      /**
       * when `true`, element is focused immediately after mount
       */
      autoFocus?: boolean;
      /**
       * value of input tag
       */
      value?: string;
      /**
       * uncontrolled value of input tag
       */
      defaultValue?: string;
      /**
       * callback invoked on every change of input tag value
       */
      onChange?: (value: string, event: React.ChangeEvent) => void;
      /**
       * disables interactive elements
       */
      disabled?: boolean;
      /**
       * gray text in empty input tag
       */
      placeholder?: string;
    };
    type DefaultProps = {
      defaultValue: '';
    };
    type Handlers = {
      value: (event: React.ChangeEvent<HTMLInputElement>) => Props['value'];
    };

    type Component = Intergalactic.Component<'input', Props>;
  }

  namespace ConfirmControl {
    type Props = BoxProps & {
      /**
       * Text of tooltip
       * @default Confirm
       */
      title?: string;
      /**
       * Icon component
       * @default CheckM
       */
      icon?: React.FC;
    };

    type Component = Intergalactic.Component<ButtonLinkComponent, Props>;
  }

  namespace CancelControl {
    type Props = BoxProps & {
      /**
       * Text of tooltip
       * @default Cancel
       */
      title?: string;
      /**
       * Icon component
       * @default CloseM
       */
      icon?: React.FC;
    };

    type Component = Intergalactic.Component<ButtonLinkComponent, Props>;
  }

  namespace NumberValue {
    type Props = {};
    /*
     Looks like it should be `type Component = NSInputNumber.Value.Component;`.
     Leave it as it is, since the change to NSInputNumber breaks types for `defaultValue` and maybe others.
     It expects `string` (coming from NSInput.Props['defaultValue']) while at the moment `defaultValue` comes from React HTML Attributes.
    */
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace NumberControls {
    type Component = NSInputNumber.Controls.Component;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Addon: Addon.Component;
    Value: Value.Component;
    ConfirmControl: ConfirmControl.Component;
    CancelControl: CancelControl.Component;
    NumberValue: NumberValue.Component;
    NumberControls: NumberControls.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type InlineInputProps = NSInlineInput.Props;
/** @deprecated It will be removed in v19. */
export type InlineInputAddonProps = NSInlineInput.Addon.Props;
/** @deprecated It will be removed in v19. */
export type InlineInputValueProps = NSInlineInput.Value.Props;
/** @deprecated It will be removed in v19. */
export type InlineInputConfirmControlProps = NSInlineInput.ConfirmControl.Props;
/** @deprecated It will be removed in v19. */
export type InlineInputCancelControlProps = NSInlineInput.CancelControl.Props;
/** @deprecated It will be removed in v19. */
export type InlineInputComponent = NSInlineInput.Component;

export type { NSInlineInput };
