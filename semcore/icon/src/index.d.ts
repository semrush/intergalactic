import { BoxProps } from '@semcore/flex-box';
import { Intergalactic, UnknownProperties } from '@semcore/core';
import { KeyboardFocusProps } from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';

/** @deprecated */
export interface IIconProps extends IconProps, UnknownProperties {}
export type IconProps = BoxProps &
  KeyboardFocusProps & {
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    /** Make an icon interactive */
    interactive?: boolean;
    /** Icon color */
    color?: string;
  };

declare const Icon: Intergalactic.Component<'svg', IconProps>;

export default Icon;
