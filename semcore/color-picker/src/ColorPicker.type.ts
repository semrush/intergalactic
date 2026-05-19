import type { BoxProps } from '@semcore/base-components';
import type Popper from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { DropdownProps } from '@semcore/dropdown';
import type Dropdown from '@semcore/dropdown';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSColorPicker {
  type Props = DropdownProps & {
    /**
     * Selected color item. Should be used with `onChange` property together
     */
    value?: string | null;
    /**
     * Fired when user selects color item. Should be used with `value` property together
     */
    onChange?: (value: string, event: React.ChangeEvent) => void;
    /**
     * Default value if `value` property is not provided
     * @default null
     */
    defaultValue?: string | null;
    /**
     * Array of color items. Should be used with `onColorsChange` property together
     * @default defaultColors
     */
    colors?: (string | null)[];
    /**
     * Fired when user changes color items. Should be used with `colors` property together
     */
    onColorsChange?: (value: string[], event: React.ChangeEvent) => void;
    /**
     * Shows label `A` as text color icon inside all color items
     * @default false
     */
    displayLabel?: boolean;
  };
  type DefaultProps = {
    defaultVisible: false;
    defaultValue: null;
    colors: Props['colors'];
    i18n: LocalizedMessages;
    locale: 'en';
    children: React.JSX.Element;
  };
  type Ctx = {
    getTriggerProps: PropGetterFn;
    getColorsProps: PropGetterFn;
    getItemProps: PropGetterFn;
  };
  type Handlers = {
    value: Props['value'];
    visible: boolean;
  };

  namespace Trigger {
    type Component = typeof Dropdown.Trigger;
  }

  namespace Popper {
    type Component = typeof Popper.Popper;
  }

  namespace Colors {
    type Props = BoxProps & {
      /**
       * Array of color items
       */
      colors?: Array<string | null>;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]> & {
    Trigger: Trigger.Component;
    Popper: Popper.Component;
    Colors: Colors.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type ColorsProps = NSColorPicker.Colors.Props;
/** @deprecated It will be removed in v18. */
export type ColorPickerProps = NSColorPicker.Props;
/** @deprecated It will be removed in v18. */
export type ColorPickerHandlers = NSColorPicker.Handlers;

export type { NSColorPicker };
