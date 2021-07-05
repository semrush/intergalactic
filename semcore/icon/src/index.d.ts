import { IBoxProps } from '@semcore/flex-box';
import { IKeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import { ReturnEl } from '@semcore/core';

export interface IIconProps extends IBoxProps, IKeyboardFocusProps {
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  /** Make an icon interactive */
  interactive?: boolean;
  /** Icon color */
  color?: string;
}

declare const Icon: <T>(props: IIconProps & T) => ReturnEl;

export default Icon;
