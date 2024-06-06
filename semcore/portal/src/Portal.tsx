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

  portalRendering?: 'prepend' | 'append';
};

const PortalContext = register.get(
  'portal-context',

  React.createContext<NodeByRef>((canUseDOM() ? document.body : null) as any),
);

const key = 'intergalactic-portal-prepend-mount-node';
const prependMountNode = (mountNode: Element) => {
  const firstChildren = mountNode.children[0];
  if ((firstChildren as HTMLElement)?.dataset?.portal === key) return firstChildren as HTMLElement;
  const node = document.createElement('div');
  node.dataset.portal = key;
  mountNode.prepend(node);
  return node as HTMLElement;
};

function Portal(props: PortalProps & { Children: React.FC }) {
  const { Children, disablePortal, ignorePortalsStacking, onMount, portalRendering } = props;
  const container = React.useContext(PortalContext);
  const [mountNode, setMountNode] = React.useState<Element | null>(null);

  React.useEffect(() => {
    if (disablePortal) return;
    onMount?.(true);
    if (ignorePortalsStacking) {
      if (!canUseDOM()) return;
      let mountNode = document.body;
      if (portalRendering === 'prepend') {
        mountNode = prependMountNode(mountNode);
      }
      setMountNode(document.body);
      return;
    }

    let mountNode = getNodeByRef(container);
    if (portalRendering === 'prepend' && mountNode) {
      mountNode = prependMountNode(mountNode);
    }
    setMountNode(mountNode);
  }, [container, disablePortal, onMount, portalRendering]);

  if (disablePortal) {
    return <Children />;
  }

  return mountNode ? createPortal(<Children />, mountNode) : null;
}

Portal.displayName = 'Portal';

const { Provider: PortalProvider } = PortalContext;
export { PortalProvider };
export default createComponent(Portal) as Intergalactic.Component<Intergalactic.Tag, PortalProps>;
