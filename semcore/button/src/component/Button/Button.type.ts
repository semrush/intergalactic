import type { BoxProps, NeighborItemProps, SimpleHintPopperProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { NSText } from '@semcore/typography';
import type React from 'react';

export type ButtonProps = BoxProps &
  NeighborItemProps & {
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
    hintPlacement?: SimpleHintPopperProps['placement'];

    /** Button size.
   * @default `m`
   */
    size?: 'l' | 'm';
    /** Button usage.
   * @default `primary`
   */
    use?: 'primary' | 'secondary' | 'tertiary';
    /** Button theme.
   * @default undefined
   */
    theme?: 'info' | 'success' | 'brand' | 'danger' | 'muted' | 'invert';
  };

export type ButtonTextProps = NSText.Props;

export type ButtonAddonProps = BoxProps;

export type ButtonContext = {
  getTextProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};

export type ButtonChildren = {
  Text: Intergalactic.Component<'span', ButtonTextProps>;
  Addon: Intergalactic.Component<'span', ButtonAddonProps>;
};

export type ButtonComponent = Intergalactic.Component<'button', ButtonProps, ButtonContext> & ButtonChildren;
