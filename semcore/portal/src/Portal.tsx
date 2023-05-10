import React, { useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import createComponent, { IFunctionProps, register } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { getNodeByRef, NodeByRef } from '@semcore/utils/lib/ref';

export interface IPortalProps {
  /** Disables children rendering in React portal */
  disablePortal?: boolean;
  /** Disabled attaching portals to the parent portals and enabling attaching directly to document.body */
  ignorePortalsStacking?: boolean;
}

const PortalContext = register.get(
  'portal-context',
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  React.createContext<NodeByRef>(canUseDOM() ? document.body : null),
);

function Portal(props: IFunctionProps<IPortalProps>) {
  const { Children, disablePortal, ignorePortalsStacking } = props;
  const container = useContext(PortalContext);
  const initialMountNode = useMemo(() => {
    if (!ignorePortalsStacking) return getNodeByRef(container);
    if (canUseDOM()) return document.body;
    return null;
  }, [ignorePortalsStacking, container]);
  const [mountNode, setMountNode] = useState(initialMountNode);

  useEffect(() => {
    if (!disablePortal) {
      setMountNode(initialMountNode);
    }
  }, [disablePortal, initialMountNode]);

  if (disablePortal) {
    return <Children />;
  }

  return mountNode ? createPortal(<Children />, mountNode) : null;
}

Portal.displayName = 'Portal';

const { Provider: PortalProvider } = PortalContext;
export { PortalProvider };
export default createComponent(Portal) as <T>(props: IPortalProps & T) => React.ReactElement;
