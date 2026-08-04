import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSBadge {
  type Type = 'admin' | 'alpha' | 'beta' | 'new' | 'soon' | 'unavailable';
  type Margins = {
    m?: BoxProps['m'];
    ml?: BoxProps['ml'];
    mt?: BoxProps['mt'];
    mr?: BoxProps['mr'];
    mb?: BoxProps['mb'];
    mx?: BoxProps['mx'];
    my?: BoxProps['my'];
  };
  type Props = NSBadge.Margins & ({
    /**
     * Flag to render inverted badge.
     */
    invert?: true;
    /**
     * Flag to render inverted badge.
     * @deprecated use invert instead.
     */
    inverted?: true;
    light?: never | false;
  } | {
    /**
     * Flag to render light badge.
     */
    light?: true;
    /**
     * @deprecated use invert instead.
     */
    inverted?: never | false;
    invert?: never | false;
  }) & {
    /**
     * Type of badge.
     */
    type: NSBadge.Type;
  };

  type Component = Intergalactic.Component<'span', Props>;
}

/** @deprecated It will be removed in v19. */
export type BadgeType = NSBadge.Type;
/** @deprecated It will be removed in v19. */
export type BadgeMargins = NSBadge.Margins;
/** @deprecated It will be removed in v19. */
export type BadgeProps = NSBadge.Props;

export type { NSBadge };
