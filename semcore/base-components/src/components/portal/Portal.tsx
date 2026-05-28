import { createComponent, register, type Intergalactic } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import React from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
  /** Disables children rendering in React portal */
  disablePortal?: boolean;
  /** Disabled attaching portals to the parent portals and enabling attaching directly to document.body */
  ignorePortalsStacking?: boolean;
  /** Called when portal mount state changes */
  onMount?: (mounted: boolean) => void;
  /** Manually set node to mount portal content */
  nodeToMount?: HTMLElement;
};

type PortalContextType = React.RefObject<HTMLElement | null> | HTMLElement | null;

type PortalComponent = Intergalactic.Component<Intergalactic.Tag, PortalProps>;

const PortalContext = register.get(
  'portal-context',

  React.createContext<PortalContextType>(canUseDOM() ? document.body : null),
);

function Portal(props: PortalProps & { Children: React.FC }) {
  const { Children, disablePortal, ignorePortalsStacking, onMount, nodeToMount } = props;
  const container = React.useContext(PortalContext);
  const [mountNode, setMountNode] = React.useState<Element | null>(null);

  React.useEffect(() => {
    if (disablePortal) return;
    onMount?.(true);
    if (ignorePortalsStacking) {
      setMountNode(canUseDOM() ? document.body : null);
      return;
    }
    if (nodeToMount) {
      setMountNode(nodeToMount);
      return;
    }
    setMountNode((container && 'current' in container) ? container.current : container);
  }, [container, disablePortal, onMount, nodeToMount]);

  if (disablePortal) {
    return <Children />;
  }

  return mountNode ? createPortal(<Children />, mountNode) : null;
}

Portal.displayName = 'Portal';

const { Provider: PortalProvider } = PortalContext;
export { PortalProvider, PortalContext };
export default createComponent<
  PortalComponent,
  typeof Portal
>(Portal);
