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
  type Props = NSBadge.Margins & {
    /**
     * Type of badge.
     */
    type?: NSBadge.Type;
    /**
     * Flag to render inverted badge.
     */
    inverted?: boolean;

    /**
     * @deprecated. Use just type with predefined texts. You should not use badge with custom text inside.
     */
    children?: any;

    /** Fill color
     * @deprecated. Use just type property.
     * @default gray-400
     * */
    bg?: 'mist' | 'cyan' | 'red' | 'orange' | 'green' | 'white' | string;

    /** Text color
     * @deprecated. Use just type property.
     * @default white
     * */
    color?: 'white' | 'gray20' | string;
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
