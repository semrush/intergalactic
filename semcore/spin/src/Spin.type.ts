import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSSpin {
  /**
   * @deprecated. Dark and custom themes are deprecated. Use default theme instead of dark.
   */
  type DeprecatedTheme = 'dark' | string;
  type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  type Props = Pick<NSBox.Props, 'm' | 'mb' | 'ml' | 'mr' | 'mt' | 'mx' | 'my'> & {
    /** Spinner size
     * @default m
     **/
    size?: NSSpin.Size;
    /** Spinner theme. Your own color is deprecated, use only `default` or `invert`.
     * @default default
     **/
    theme?: DeprecatedTheme | 'default' | 'invert';
    /** Whether the spinner should be in the center of the parent.
     * This works for a nested spinner in flex,
     * otherwise only horizontal alignment will occur.
     * */
    centered?: boolean;
    /** Specifies the locale for i18n support */
    locale?: string;
  };
  type DefaultProps = {
    size: 'm';
    theme: 'default';
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type SpinSize = NSSpin.Size;
/** @deprecated It will be removed in v18. */
export type SpinProps = NSSpin.Props;

export type { NSSpin };
