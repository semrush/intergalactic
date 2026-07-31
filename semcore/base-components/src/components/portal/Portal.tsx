import { createComponent, register, type Intergalactic } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import React from 'react';
import { createPortal } from 'react-dom';

import type { NSPortal } from './Portal.type';

type PortalContextType = React.RefObject<HTMLElement | null> | HTMLElement | null;

const PortalContext = register.get(
  'portal-context',
  React.createContext<PortalContextType>(canUseDOM() ? document.body : null),
);

function Portal(
  props: Intergalactic.InternalTypings.InferComponentProps<NSPortal.Component>,
) {
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

/**
 * Portal
 *
 * {@link https://developer.semrush.com/intergalactic/utils/portal/portal-api|API}
 */
export default createComponent<
  NSPortal.Component,
  typeof Portal
>(Portal);
