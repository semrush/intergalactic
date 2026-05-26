import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { InputProps } from '@semcore/input';

import type { NSColorPicker } from './ColorPicker.type';
import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSPaletteManager {
  type Props = {
    /**
     * Array of color items. Should be used with `onColorsChange` property together
     * @default []
     */
    colors?: string[];
    /**
     * Default value if `colors` property is not provided
     * @default []
     */
    defaultColors?: string[];
    /**
     * Fired when user adds or removes color items. Should be used with `colors` property together
     */
    onColorsChange?: (value: string[], event: React.ChangeEvent) => void;
  };
  type DefaultProps = {
    defaultColors: Props['defaultColors'];
    i18n: LocalizedMessages;
    locale: 'en';
  };
  type Ctx = {
    getInputColorProps: PropGetterFn;
    getColorsProps: PropGetterFn;
    getItemProps: PropGetterFn;
  };
  type Handlers = { colors: Props['colors'] };

  namespace Colors {
    type Props = NSColorPicker.Colors.Props & {
      /**
       * Fired when user clicks on the plus icon in Palette Manager - focuses the input component
       */
      onPlusButtonClick?: React.MouseEventHandler;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace InputColor {
    type Props = InputProps & {
      /**
       * Text value of input
       */
      value?: string;
      /**
       * Default value if `value` property is not provided
       * @default null
       */
      defaultValue?: string | null;
      /**
       * Uncontrolled visual state of input
       * @default normal
       */
      state?: 'normal' | 'valid' | 'invalid';
      /**
       * Array of color items
       */
      colors?: string[];
      /**
       * Fired with entered value when user clicks on the check icon or hits `Enter` or `Space`
       */
      onAdd?: (value: string, event: React.MouseEvent | React.KeyboardEvent) => void;
      /**
       * Handle changes of state
       */
      onStateChange?: (state: 'normal' | 'valid' | 'invalid') => void;
    };
    type DefaultProps = {
      defaultValue: '';
      defaultState: 'normal';
    };
    type Handlers = { value: string; state: null };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]> & {
    Colors: Colors.Component;
    InputColor: InputColor.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type PaletteManagerProps = NSPaletteManager.Props;
/** @deprecated It will be removed in v18. */
export type PaletteManagerHandlers = NSPaletteManager.Handlers;
/** @deprecated It will be removed in v18. */
export type ColorsCustomProps = NSPaletteManager.Colors.Props;
/** @deprecated It will be removed in v18. */
export type InputColorProps = NSPaletteManager.InputColor.Props;

export type { NSPaletteManager };
