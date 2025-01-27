import type { BoxProps } from '@semcore/flex-box';
import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { AnimationProps } from '@semcore/animation';

/** @deprecated */
export interface IDotProps extends DotProps, UnknownProperties {}
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

declare const Dot: Intergalactic.Component<'div', DotProps>;

export default Dot;
