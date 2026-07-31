import type { NSBadge } from '@semcore/badge';
import type { Intergalactic } from '@semcore/core';

declare namespace NSBadgeFH {
  type Use = 'accent' | 'neutral';
  type Props = NSBadge.Margins & {
    /**
     * Type of feature badge.
     * @default accent
     */
    use?: NSBadgeFH.Use;
  };
  type DefaultProps = {
    use: NSBadgeFH.Use;
  };

  type Component = Intergalactic.Component<'span', Props>;
}

export type { NSBadgeFH };
