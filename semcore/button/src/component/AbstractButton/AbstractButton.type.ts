import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { NeighborItemProps } from '@semcore/neighbor-location';
import { TooltipHintProps } from '@semcore/tooltip';

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
    hintPlacement?: TooltipHintProps['placement'];

    /** Button type. Defined in Button.type or ButtonLink.type */
    size?: S;
    /** Button usage. Defined in Button.type or ButtonLink.type */
    use?: U;
    /** Button theme. Defined in Button.type or ButtonLink.type */
    theme?: T;
  };

export type AbstractButtonAddonProps<S> = BoxProps & {
  size?: S;
};

export type AbstractButtonTextProps<S> = BoxProps & {
  size?: S;
};

export type AbstractButtonContext = {
  getTextProps: PropGetterFn;
  getAddonProps: PropGetterFn;
};
