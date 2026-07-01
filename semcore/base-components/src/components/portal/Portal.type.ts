import { type Intergalactic } from '@semcore/core';

declare namespace NSPortal {
    type Props = {
      /** Disables children rendering in React portal */
      disablePortal?: boolean;
      /** Disabled attaching portals to the parent portals and enabling attaching directly to document.body */
      ignorePortalsStacking?: boolean;
      /** Called when portal mount state changes */
      onMount?: (mounted: boolean) => void;
      /** Manually set node to mount portal content */
      nodeToMount?: HTMLElement;
    };

    type Component = Intergalactic.Component<Intergalactic.Tag, Props>;
}

/** @deprecated It will be removed in v18. */
export type PortalProps = NSPortal.Props;

export type { NSPortal };
