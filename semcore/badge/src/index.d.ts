import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface IBadgeProps extends BadgeProps, UnknownProperties {}
export type BadgeProps = BoxProps & {
  /** Fill color
   * @default gray-400
   * */
  bg?: 'mist' | 'cyan' | 'red' | 'orange' | 'green' | 'white' | string;

  /** Text color
   * @default white
   * */
  color?: 'white' | 'gray20' | string;
};

declare const Badge: Intergalactic.Component<'div', BadgeProps>;

export default Badge;
