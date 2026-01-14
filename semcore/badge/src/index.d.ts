import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

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

/**
 * @deprecated. Use StatusBadge from @semcore/status-badge package.
 */
declare const Badge: Intergalactic.Component<'div', BadgeProps>;

export default Badge;
