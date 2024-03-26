import React from 'react';
import { createPortal } from 'react-dom';
import createComponent, {
  IFunctionProps,
  register,
  UnknownProperties,
  Intergalactic,
} from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { getNodeByRef, NodeByRef } from '@semcore/utils/lib/ref';
import { useUncontrolledProp } from '@semcore/utils/lib/use/useUncontrolledProp';

/** @deprecated */
export interface IPortalProps extends PortalProps, UnknownProperties {}
export type PortalProps = {
  /** Disables children rendering in React portal */
  disablePortal?: boolean;
  /** Disabled attaching portals to the parent portals and enabling attaching directly to document.body */
  ignorePortalsStacking?: boolean;
  /** Controls under which node protal should be mounted */
  mountNode?: Element | null;
  onMountNodeChange?: (node: Element | null) => void;
};

const PortalContext = register.get(
  'portal-context',

  React.createContext<NodeByRef>((canUseDOM() ? document.body : null) as any),
);

function Portal(props: PortalProps & { Children: React.FC }) {
  const { Children, disablePortal, ignorePortalsStacking } = props;
  const container = React.useContext(PortalContext);
  const [mountNode, setMountNode] = useUncontrolledProp(
    props.mountNode ?? null,
    null,
    props.onMountNodeChange,
  );

  React.useEffect(() => {
    if (disablePortal) return;
    if (ignorePortalsStacking) {
      setMountNode(canUseDOM() ? document.body : null);
      return;
    }
    setMountNode(getNodeByRef(container));
  }, [container, disablePortal]);

  if (disablePortal) {
    return <Children />;
  }

  return mountNode ? createPortal(<Children />, mountNode) : null;
}

Portal.displayName = 'Portal';

const { Provider: PortalProvider } = PortalContext;
export { PortalProvider };
export default createComponent(Portal) as Intergalactic.Component<Intergalactic.Tag, PortalProps>;
