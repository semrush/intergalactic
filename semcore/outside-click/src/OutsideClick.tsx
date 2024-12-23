import React, { cloneElement, useEffect } from 'react';
import createComponent, { IFunctionProps, Intergalactic, UnknownProperties } from '@semcore/core';
import { getNodeByRef, NodeByRef, useForkRef } from '@semcore/utils/lib/ref';
import ownerDocument from '@semcore/utils/lib/ownerDocument';
import useEventCallback from '@semcore/utils/lib/use/useEventCallback';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import { getEventTarget } from '@semcore/utils/lib/getEventTarget';

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

const noop = () => {};
function OutsideClick(props: IFunctionProps<IOutsideClickProps>) {
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

  React.useEffect(() => {
    const outsideRoot = root ? getNodeByRef(root) : ownerDocument(nodeRef.current as any);

    // disable previous events
    const prevEvents = OutsideClick.eventsMap[OutsideClick.eventsMap.length - 1];

    if (prevEvents) {
      Object.entries(prevEvents[1]).forEach(([eventName, handler]) => {
        prevEvents[0].removeEventListener(eventName, handler, true);
      });
    }

    // Using capture to handle event faster than OutsideClick handler
    outsideRoot?.addEventListener('mouseup', handleOutsideClick, true);
    outsideRoot?.addEventListener('mousedown', handleMouseDown, true);

    if (outsideRoot) {
      OutsideClick.eventsMap.push([
        outsideRoot,
        {
          mouseup: handleOutsideClick,
          mousedown: handleMouseDown,
        },
      ]);
    }

    return () => {
      if (outsideRoot) {
        OutsideClick.eventsMap.pop();
      }

      outsideRoot?.removeEventListener('mouseup', handleOutsideClick, true);
      outsideRoot?.removeEventListener('mousedown', handleMouseDown, true);

      // enable previous events
      const prevEvents = OutsideClick.eventsMap[OutsideClick.eventsMap.length - 1];

      if (prevEvents) {
        Object.entries(prevEvents[1]).forEach(([eventName, handler]) => {
          prevEvents[0].addEventListener(eventName, handler, true);
        });
      }
    };
  }, [root]);

  return children ? cloneElement(children, { ref: handleRef }) : null;
}

OutsideClick.displayName = 'OutsideClick';

OutsideClick.eventsMap = [] as [
  Element | Document,
  Record<string, EventListenerOrEventListenerObject>,
][];

export default createComponent(OutsideClick) as Intergalactic.Component<
  Intergalactic.Tag,
  OutsideClickProps
>;
