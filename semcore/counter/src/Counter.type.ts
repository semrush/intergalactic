import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSCounter {
  type Props = BoxProps & {
    /** Counter theme or custom color */
    theme?: 'warning' | 'danger' | 'info' | string;

    /** Counter size
     * @default s */
    size?: 's' | 'm' | 'l';
  };
  type DefaultProps = {
    size: 's';
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type CounterProps = NSCounter.Props;

export type { NSCounter };
