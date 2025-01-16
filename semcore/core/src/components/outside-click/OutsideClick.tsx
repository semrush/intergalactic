import React, { cloneElement } from 'react';
import { createComponent } from '../../coreFactory';
import { IFunctionProps, Intergalactic } from '../../types/Component';
import { UnknownProperties } from '../../types/UnknownProperties';
import { getNodeByRef, NodeByRef, useForkRef } from '../../utils/ref';
import ownerDocument from '../../utils/ownerDocument';
import getOriginChildren from '../../utils/getOriginChildren';
import { getEventTarget } from '../../utils/getEventTarget';
import useEventCallback from '../../utils/use/useEventCallback';

/** @deprecated */
export interface IOutsideClickProps extends OutsideClickProps, UnknownProperties {}
export type OutsideClickProps = {
  /**
   * Function called on click outside the component from excludeRefs
   * @default () => {}
   */
  onOutsideClick?: (e?: React.SyntheticEvent) => void;

  /**
   * List of refs that will not trigger `onOutsideClick` when clicked
   * @default []
   */
  excludeRefs?: Array<NodeByRef>;

  /** Root element
   * @default document
   *  */
  root?: NodeByRef;
};

type OutsideClickEvents = { [key in 'mouseup' | 'mousedown']: EventListenerOrEventListenerObject };
type RootEventsPair = [Element | Document, OutsideClickEvents];

const noop = () => {};
function OutsideClickRoot(props: IFunctionProps<IOutsideClickProps>) {
  const { Children, forwardRef, root, excludeRefs = [], onOutsideClick = noop } = props;
  const children = getOriginChildren(Children);
  const nodeRef = React.useRef<Node | null>(null);
  const targetRef = React.useRef<Node | null>(null);

  const handleRef = useForkRef(children ? children.ref : null, nodeRef, forwardRef!);

  const handleOutsideClick = useEventCallback((event: any) => {
    const isTargetEvent = [...(excludeRefs as any), nodeRef]
      .filter((node) => getNodeByRef(node))
      .some((node) =>
        getNodeByRef(node)?.contains(targetRef.current || (getEventTarget(event) as Node | null)),
      );

    if (!isTargetEvent) {
      onOutsideClick?.(event);
    }
  });

  const handleMouseDown = useEventCallback((event: any) => {
    targetRef.current = getEventTarget(event) as Node | null;
  });

  const toggleEvents = (status: boolean, outsideRoot: Element | Document | null) => {
    const isModalRoot =
      outsideRoot instanceof HTMLElement && outsideRoot.dataset.uiName === 'Modal.Overlay';
    if (!isModalRoot) {
      return;
    }

    OutsideClickRoot.eventsMap.forEach(([rootElement, events]) => {
      Object.entries(events).forEach(([eventName, handler]) => {
        const method = status ? 'addEventListener' : 'removeEventListener';
        rootElement[method](eventName, handler, true);
      });
    });
  };

  React.useEffect(() => {
    const outsideRoot = root ? getNodeByRef(root) : ownerDocument(nodeRef.current as any);

    // disable previous events
    toggleEvents(false, outsideRoot);

    // Using capture to handle event faster than OutsideClick handler
    outsideRoot?.addEventListener('mouseup', handleOutsideClick, true);
    outsideRoot?.addEventListener('mousedown', handleMouseDown, true);

    if (outsideRoot) {
      OutsideClickRoot.eventsMap.push([
        outsideRoot,
        {
          mouseup: handleOutsideClick,
          mousedown: handleMouseDown,
        },
      ]);
    }

    return () => {
      if (outsideRoot) {
        OutsideClickRoot.eventsMap.pop();
      }

      outsideRoot?.removeEventListener('mouseup', handleOutsideClick, true);
      outsideRoot?.removeEventListener('mousedown', handleMouseDown, true);

      // enabled previous events
      toggleEvents(true, outsideRoot);
    };
  }, [root]);

  return children ? cloneElement(children, { ref: handleRef }) : null;
}

OutsideClickRoot.displayName = 'OutsideClick';
OutsideClickRoot.eventsMap = [] as RootEventsPair[];

export const OutsideClick = createComponent(OutsideClickRoot) as Intergalactic.Component<
  Intergalactic.Tag,
  OutsideClickProps
>;
