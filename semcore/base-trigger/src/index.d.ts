import type { Box, BoxProps, NeighborItemProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { WithAnimatedSizeEnhanceProps } from '@semcore/core/lib/utils/enhances/animatedSizeEnhance';
import type { CounterProps } from '@semcore/counter';
import type { LinkProps, Link } from '@semcore/link';
import type { Text } from '@semcore/typography';
import type React from 'react';

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
  };

export type ButtonTriggerProps = Omit<BaseTriggerProps, 'theme'> & {
  /** Sets the loading state */
  loading?: boolean;
  /**
   * Display the dropdowns chevron icon
   * @default true
   */
  chevron?: boolean;
};

export type LinkTriggerProps = Omit<LinkProps, 'size'> & {
  /**
   * Trigger size
   * @default m
   */
  size?: 'm' | 'l';
  /** Trigger state */
  state?: 'normal' | 'valid' | 'invalid';
  /** Sets the loading state */
  loading?: boolean;
  /** Placeholder text */
  placeholder?: React.ReactNode;
  /** Responsible for placeholder displaying */
  empty?: boolean;
};

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
  Text: typeof Text;
  Addon: typeof Box;
};

declare const ButtonTrigger: Intergalactic.Component<'div', ButtonTriggerProps> & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
};

declare const LinkTrigger: Intergalactic.Component<'div', LinkTriggerProps> & {
  Text: typeof Link.Text;
  Addon: typeof Link.Addon;
};

declare const FilterTrigger: Intergalactic.Component<'div', FilterTriggerProps> & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
  Counter: Intergalactic.Component<'div', CounterProps & FilterTriggerCounterProps>;
  TriggerButton: typeof BaseTrigger;
  ClearButton: typeof BaseTrigger;
};

export default BaseTrigger;
export { ButtonTrigger, LinkTrigger, FilterTrigger };
