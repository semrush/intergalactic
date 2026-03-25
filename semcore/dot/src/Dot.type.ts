import type { AnimationProps, BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

export type DotProps = BoxProps &
  AnimationProps & {
    /** Size of the dot
     * @default m
     */
    size?: 'm' | 'l';
    /** Property for placing the Dot in the upper right corner of the component
     * @default false
     * */
    up?: boolean;
    /** The property for Dot visibility control */
    hidden?: boolean;
  };

export type DotComponent = Intergalactic.Component<'div', DotProps>;
