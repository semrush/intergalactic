import type { NSBox, NSNeighborLocation, NSHint } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSButton {
  type Size = 'l' | 'm';
  type Theme = 'info' | 'success' | 'brand' | 'danger' | 'muted' | 'invert';
  type Use = 'primary' | 'secondary' | 'tertiary';
  type Props = NSBox.Props &
    NSNeighborLocation.Detect.Props & {
      /** Button activity state */
      active?: boolean;
      /** Disabled button state */
      disabled?: boolean;
      /** Loading button state */
      loading?: boolean;
      /** Tag for the left Addon */
      addonLeft?: React.ElementType;
      /** Tag for the right Addon */
      addonRight?: React.ElementType;
      /**
       * Placement for hint
       * @default top
       */
      hintPlacement?: NSHint.Props['placement'];

      /** Button size.
       * @default `m`
       */
      size?: NSButton.Size;
      /** Button usage.
       * @default `primary`
       */
      use?: 'primary' | 'secondary' | 'tertiary';
      /** Button theme.
       * @default undefined
       */
      theme?: NSButton.Theme;
    };
  type DefaultProps = {
    use: 'secondary';
    size: 'm';
  };
  type State = {
    ariaLabelledByContent: null | string;
  };
  type Ctx = {
    getTextProps: PropGetterFn;
    getAddonProps: PropGetterFn;
  };

  namespace Text {
    type Props = NSText.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  namespace Addon {
    type Props = NSBox.Props;

    type Component = Intergalactic.Component<'span', Props>;
  }

  type Component = Intergalactic.Component<'button', Props, Ctx> & {
    Text: Text.Component;
    Addon: Addon.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type ButtonProps = NSButton.Props;
/** @deprecated It will be removed in v19. */
export type ButtonDefaultProps = NSButton.DefaultProps;
/** @deprecated It will be removed in v19. */
export type ButtonTextProps = NSButton.Text.Props;
/** @deprecated It will be removed in v19. */
export type ButtonAddonProps = NSButton.Addon.Props;
/** @deprecated It will be removed in v19. */
export type ButtonContext = NSButton.Ctx;
/** @deprecated It will be removed in v19. */
export type ButtonComponent = NSButton.Component;

export type { NSButton };
