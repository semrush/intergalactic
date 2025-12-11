import { BoxProps } from '@semcore/base-components';
import { Intergalactic } from '@semcore/core';
import { KeyboardFocusProps } from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';

export type IconProps = BoxProps &
  KeyboardFocusProps & {
    /** Icon width */
    width?: string | number;
    /** Icon height */
    height?: string | number;
    /** SVG viewBox attribute */
    viewBox?: string;
    /** Make an icon interactive */
    interactive?: boolean;
    /** Icon color */
    color?: string;
  };

declare const Icon: Intergalactic.Component<'svg', IconProps>;

export default Icon;
