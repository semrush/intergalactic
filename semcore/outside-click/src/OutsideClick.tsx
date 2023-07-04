import React, { cloneElement, useEffect } from 'react';
import createComponent, { IFunctionProps, Intergalactic, UnknownProperties } from '@semcore/core';
import { getNodeByRef, NodeByRef, useForkRef } from '@semcore/utils/lib/ref';
import ownerDocument from '@semcore/utils/lib/ownerDocument';
import useEventCallback from '@semcore/utils/lib/use/useEventCallback';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

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

function OutsideClick(props: IFunctionProps<IOutsideClickProps>) {
  const { Children, forwardRef, root, excludeRefs, onOutsideClick } = props;
  const children = getOriginChildren(Children);
  const nodeRef = React.useRef(null);
  const targetRef = React.useRef(null);

  const handleRef = useForkRef(children ? children.ref : null, nodeRef, forwardRef!);

  const handleOutsideClick = useEventCallback((event: any) => {
    const isTargetEvent = [...(excludeRefs as any), nodeRef]
      .filter((node) => getNodeByRef(node))
      .some((node) => getNodeByRef(node)?.contains(targetRef.current || event.target));

    if (!isTargetEvent) {
      onOutsideClick?.(event);
    }
  });

  const handleMouseDown = useEventCallback((event: any) => {
    targetRef.current = event.target;
  });

  useEffect(() => {
    const outsideRoot = root ? getNodeByRef(root) : ownerDocument(nodeRef.current as any);

    // Using capture to handle event faster than OutsideClick handler
    outsideRoot?.addEventListener('mouseup', handleOutsideClick, true);
    outsideRoot?.addEventListener('mousedown', handleMouseDown, true);

    return () => {
      outsideRoot?.removeEventListener('mouseup', handleOutsideClick, true);
      outsideRoot?.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, [root]);

  return children ? cloneElement(children, { ref: handleRef }) : null;
}

OutsideClick.displayName = 'OutsideClick';

OutsideClick.defaultProps = {
  excludeRefs: [],
  onOutsideClick: () => {},
};

export default createComponent(OutsideClick) as Intergalactic.Component<
  Intergalactic.InternalTypings.ComponentTag,
  OutsideClickProps
>;
