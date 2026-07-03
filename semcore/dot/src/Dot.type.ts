import type { NSAnimation, NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSDot {
  type Props = NSBox.Props & NSAnimation.Props & {
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
  type InnerProps = {
    keyframes: [string, string];
  };
  type DefaultProps = {
    size: 'm';
    keyframes: InnerProps['keyframes'];
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type DotProps = NSDot.Props;

export type { NSDot };
