import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { IconComponent } from '@semcore/icon';

declare namespace NSMetric {
  type DiffUse = 'good' | 'bad' | 'neutral';
  type DiffIcon = IconComponent;

  type Props = NSBox.Props & {
    /**
     * Value to render in the Metric
     */
    value: string;

    /**
     * Value to render in diff
     */
    diffValue: string;

    /**
     * Diff color
     */
    diffUse: DiffUse;

    /**
     * Link to another tool or whatever
     */
    href?: string;

    /**
     * Diff arrow direction
     * @default no icon
     */
    diffIcon?: DiffIcon;
  };

  type Component = Intergalactic.Component<'span', Props>;
}

export {
  type NSMetric,
};
