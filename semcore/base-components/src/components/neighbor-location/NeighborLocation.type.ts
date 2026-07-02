import type { Intergalactic } from '@semcore/core';

declare namespace NSNeighborLocation {
  type Union = 'right' | 'both' | 'left';
  type Props = {
  /** Number of elements in a group */
    controlsLength?: number;
  };

  namespace Detect {
    type Props = {
      /** Determines from which side the component has neighbors */
      neighborLocation?: NeighborLocationUnion | false;
    };

    type Component = Intergalactic.Component<'div', Props, 'right' | 'both' | 'left' | undefined>;
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Detect: Detect.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type NeighborLocationUnion = NSNeighborLocation.Union;
/** @deprecated It will be removed in v18. */
export type NeighborLocationProps = NSNeighborLocation.Props;
/** @deprecated It will be removed in v18. */
export type NeighborItemProps = NSNeighborLocation.Detect.Props;

export type { NSNeighborLocation };
