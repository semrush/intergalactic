import type { EllipsisSettings, SimpleHintPopperProps } from '@semcore/base-components';
import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { WithAnimatedSizeEnhanceProps } from '@semcore/core/lib/utils/enhances/animatedSizeEnhance';
import type { DotProps } from '@semcore/dot';
import type { Box, BoxProps } from '@semcore/flex-box';
import type { NeighborItemProps } from '@semcore/neighbor-location';
import type React from 'react';

/** @deprecated */
export interface IBaseTriggerProps extends BaseTriggerProps, UnknownProperties {}
export type BaseTriggerProps = BoxProps &
  NeighborItemProps &
  WithAnimatedSizeEnhanceProps & {
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
  /**
   * Display the dropdowns chevron icon
   * @default true
   */
  chevron?: boolean;
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
  /** Specifies the locale for i18n support */
  locale?: string;
  /** List of props that will be added to the select inside of filter */
  includeInputProps?: string[];
  /** Normal `ref` prop refers to FilterTrigger wrapper while `triggerRef` refers explicitly to trigger button */
  triggerRef?: React.Ref<HTMLButtonElement>;
};

export type FilterTriggerCounterProps = {
  /** Count for render */
  count?: number;
};

declare const BaseTrigger: Intergalactic.Component<'div', BaseTriggerProps> & {
  Text: Intergalactic.Component<typeof Box, { ellipsis?: EllipsisSettings | true; hintProps?: SimpleHintPopperProps }>;
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
  Counter: Intergalactic.Component<'div', BoxProps & DotProps & FilterTriggerCounterProps>;
  TriggerButton: typeof BaseTrigger;
  ClearButton: typeof BaseTrigger;
};

export default BaseTrigger;
export { ButtonTrigger, LinkTrigger, FilterTrigger };
