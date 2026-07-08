import React from 'react';
import { createPortal } from 'react-dom';
import createComponent, { register, UnknownProperties, Intergalactic } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { getNodeByRef, NodeByRef } from '@semcore/utils/lib/ref';

/** @deprecated */
export interface IPortalProps extends PortalProps, UnknownProperties {}
export type PortalProps = {
  /** Disables children rendering in React portal */
  disablePortal?: boolean;
  /** Disabled attaching portals to the parent portals and enabling attaching directly to document.body */
  ignorePortalsStacking?: boolean;
  /** Called when portal mount state changes */
  onMount?: (mounted: boolean) => void;
};

const PortalContext = register.get(
  'portal-context',

  React.createContext<NodeByRef>((canUseDOM() ? document.body : null) as any),
);

const RootPortalContext = React.createContext<NodeByRef>(
  canUseDOM() ? document.body : () => ({ current: null }),
);

function Portal(props: PortalProps & { Children: React.FC }) {
  const { Children, disablePortal, ignorePortalsStacking, onMount } = props;
  const rootContainer = React.useContext(RootPortalContext);
  const container = React.useContext(PortalContext);
  const [mountNode, setMountNode] = React.useState<Element | null>(null);

  React.useEffect(() => {
    if (disablePortal) return;
    onMount?.(true);
    if (ignorePortalsStacking) {
      setMountNode(getNodeByRef(rootContainer));
      return;
    }
    setMountNode(getNodeByRef(container));
  }, [container, disablePortal, onMount]);

  if (disablePortal) {
    return <Children />;
  }

  return mountNode ? createPortal(<Children />, mountNode) : null;
}

Portal.displayName = 'Portal';

const { Provider: RootPortalProvider } = RootPortalContext;
const { Provider: PortalProvider } = PortalContext;
export { PortalProvider, RootPortalProvider };
export default createComponent(Portal) as Intergalactic.Component<Intergalactic.Tag, PortalProps>;
