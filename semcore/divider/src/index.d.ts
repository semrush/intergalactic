import { IBoxProps } from '@semcore/flex-box';
import { ReturnEl } from '@semcore/core';

export interface IDividerProps extends IBoxProps {
  /**
   * Type of the divider
   * @default primary
   */
  use?: 'primary' | 'secondary';
  /**
   * Theme of the divider
   */
  theme?: 'invert';
  /**
   * Orientation of the divider
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
}

declare const Divider: <T>(props: IDividerProps & T) => ReturnEl;

export default Divider;
