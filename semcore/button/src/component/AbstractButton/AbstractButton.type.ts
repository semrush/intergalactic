import type { BoxProps, NeighborItemProps, SimpleHintPopperProps } from '@semcore/base-components';
import type { PropGetterFn } from '@semcore/core';
import type { TextProps } from '@semcore/typography';
import type React from 'react';

export type AbstractButtonProps<S, U, T> = BoxProps &
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

    /** Button size. Defined in Button.type or ButtonLink.type */
    size?: S;
    /** Button usage. Defined in Button.type or ButtonLink.type */
    use?: U;
    /** Button theme. Defined in Button.type or ButtonLink.type */
    theme?: T;
  };

export type AbstractButtonAddonProps = BoxProps;

export type AbstractButtonTextProps<S> = TextProps & {
  size?: S;
};

export type AbstractButtonContext = {
  getTextProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};
