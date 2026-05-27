import { createComponent, type Intergalactic, type IRootComponentProps } from '@semcore/core';
import { getEventTarget } from '@semcore/core/lib/utils/getEventTarget';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import ownerDocument from '@semcore/core/lib/utils/ownerDocument';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import useEventCallback from '@semcore/core/lib/utils/use/useEventCallback';
import React, { cloneElement } from 'react';

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
  excludeRefs?: Array<React.RefObject<HTMLElement>>;

  /** Root element
   * @default document
   *  */
  root?: React.RefObject<HTMLElement>;
};

type OutsideClickComponent = Intergalactic.Component<
  Intergalactic.Tag,
  OutsideClickProps
>;

type OutsideClickEvents = { [key in 'mouseup' | 'mousedown']: EventListenerOrEventListenerObject };
type RootEventsPair = [Element | Document, OutsideClickEvents];

const noop = () => {};
function OutsideClickRoot(props: OutsideClickProps & IRootComponentProps) {
  const { Children, forwardRef, root, excludeRefs = [], onOutsideClick = noop } = props;
  const children = getOriginChildren(Children);
  const nodeRef = React.useRef<Node | null>(null);
  const mouseDownInside = React.useRef<boolean>(false);

  const handleRef = useForkRef(children ? children.ref : null, nodeRef, forwardRef!);

  const handleOutsideClick = useEventCallback((event: any) => {
    const nodesToCheck = [...excludeRefs, nodeRef].map((ref) => ref?.current);
    const eventTarget = getEventTarget(event) as Node | null;

    const isTargetEvent = nodesToCheck.some(
      (node) => mouseDownInside.current || node?.contains(eventTarget),
    );

    if (!isTargetEvent) {
      onOutsideClick?.(event);
    }
  });

  const handleMouseDown = useEventCallback((event: any) => {
    const nodesToCheck = [...excludeRefs, nodeRef].map((ref) => ref?.current);
    const eventTarget = getEventTarget(event) as Node | null;

    mouseDownInside.current = nodesToCheck.some((node) => node?.contains(eventTarget));
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
    const outsideRoot = root ? root.current : ownerDocument(nodeRef.current as any);

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

export const OutsideClick = createComponent<
  OutsideClickComponent,
  typeof OutsideClickRoot
>(OutsideClickRoot);
