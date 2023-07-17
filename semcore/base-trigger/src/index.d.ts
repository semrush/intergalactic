import React from 'react';
import { UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { DotProps } from '@semcore/dot';
import { INeighborItemProps } from '@semcore/neighbor-location';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { IWithAnimatedSizeEnhanceProps } from '@semcore/utils/lib/enhances/animatedSizeEnhance';

/** @deprecated */
export interface IBaseTriggerProps extends BaseTriggerProps, UnknownProperties {}
export type BaseTriggerProps = BoxProps &
  INeighborItemProps &
  KeyboardFocusProps &
  IWithAnimatedSizeEnhanceProps & {
    /**
     * Trigger size
     * @default m
     */
    size?: 'm' | 'l';
    /**
     * Trigger state
     */
    state?: 'normal' | 'valid' | 'invalid';
    /**
     * Sets active state to trigger
     */
    active?: boolean;
    /**
     * Responsible for placeholder displaying
     */
    empty?: boolean;
    /**
     * Placeholder text
     */
    placeholder?: React.ReactNode;
    /**
     * Sets disabled state to trigger
     */
    disabled?: boolean;
    /** Trigger theme
     * @deprecated
     * @use IBaseTriggerProps.state
     * */
    theme?: 'normal' | 'valid' | 'invalid' | false;
  };

/** @deprecated */
export interface IButtonTriggerProps extends ButtonTriggerProps, UnknownProperties {}
export type ButtonTriggerProps = Omit<BaseTriggerProps, 'theme'> & {
  /** Sets the loading state */
  loading?: boolean;
};

/** @deprecated */
export interface ILinkTriggerProps extends LinkTriggerProps, UnknownProperties {}
export type LinkTriggerProps = Omit<BaseTriggerProps, 'theme'> & {
  /** Sets the loading state */
  loading?: boolean;
  /** Text color */
  color?: string;
};

/** @deprecated */
export interface IFilterTriggerProps extends FilterTriggerProps, UnknownProperties {}
export type FilterTriggerProps = BaseTriggerProps & {
  /** Click on the filter cleaning cross */
  onClear?: (event: React.SyntheticEvent) => void;
  locale?: string;
  /** List of props that will be added to the select inside of filter */
  includeInputProps?: string[];
};

declare const BaseTrigger: Intergalactic.Component<'div', BaseTriggerProps> & {
  Text: typeof Box;
  Addon: typeof Box;
};

declare const ButtonTrigger: Intergalactic.Component<'div', ButtonTriggerProps> & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
};

declare const LinkTrigger: Intergalactic.Component<'div', LinkTriggerProps> & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
};

declare const FilterTrigger: Intergalactic.Component<'div', FilterTriggerProps> & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
  Counter: Intergalactic.Component<'div', BoxProps & DotProps>;
};

export default BaseTrigger;
export { ButtonTrigger, LinkTrigger, FilterTrigger };
