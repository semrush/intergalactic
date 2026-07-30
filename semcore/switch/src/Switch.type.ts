import type { NSBox, NSNeighborLocation } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type React from 'react';

declare namespace NSSwitch {
  type Theme = 'info' | 'success' | string;
  type Ctx = {
    getAddonProps: PropGetterFn;
    getValueProps: PropGetterFn;
  };
  type Props = NSBox.Props &
    NSNeighborLocation.Props & {
      /** Switch size
       * @default m
       */
      size?: 'm' | 'l' | 'xl';
      /** Switch theme
       * @default info
       */
      theme?: NSSwitch.Theme;
      /** Disabled state  */
      disabled?: boolean;
    };
  type DefaultProps = {
    theme: 'info';
    size: 'm';
  };

  namespace Value {
    type Props = NSBox.Props &
      NSNeighborLocation.Detect.Props & {
        /** Handler on change */
        onChange?: (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
        /** Control state  */
        checked?: boolean;
        /** Initial state for uncontrolled mode
         * @default false */
        defaultChecked?: boolean;
        /** The list of properties that can be placed in the hidden input */
        includeInputProps?: string[];
        /** Switch theme */
        theme?: NSSwitch.Theme;
      };
    type Handlers = {
      checked: [
        ((e: React.ChangeEvent<HTMLInputElement>) => Props['checked']),
        ((value: Props['checked'], event: React.SyntheticEvent<HTMLInputElement>) => void)
      ];
    };
    type Component = Intergalactic.Component<'input', Props, Ctx>;
  }

  namespace Addon {
    type Props = NSBox.Props & NSNeighborLocation.Detect.Props;
    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Value: Value.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type SwitchTheme = NSSwitch.Theme;
/** @deprecated It will be removed in v19. */
export type SwitchProps = NSSwitch.Props;
/** @deprecated It will be removed in v19. */
export type SwitchValueProps = NSSwitch.Value.Props;
/** @deprecated It will be removed in v19. */
export type SwitchAddonProps = NSSwitch.Addon.Props;

export type { NSSwitch };
