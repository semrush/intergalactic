import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSSpin {
  type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  type Props = NSBox.Props & {
    /** Spinner size
     * @default m
     **/
    size?: NSSpin.Size;
    /** Spinner theme. There are several default themes or you can use your own color
     * @default dark
     **/
    theme?: 'dark' | 'invert' | string;
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
    theme: 'dark';
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type SpinSize = NSSpin.Size;
/** @deprecated It will be removed in v18. */
export type SpinProps = NSSpin.Props;

export type { NSSpin };
