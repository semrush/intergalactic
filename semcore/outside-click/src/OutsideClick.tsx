import React, { cloneElement, useEffect } from 'react';
import createComponent, { IFunctionProps } from '@semcore/core';
import { getNodeByRef, NodeByRef, useForkRef } from '@semcore/utils/lib/ref';
import ownerDocument from '@semcore/utils/lib/ownerDocument';
import useEventCallback from '@semcore/utils/lib/use/useEventCallback';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

export interface IOutsideClickProps {
  /**
   * Функция вызывающаяся при клике за пределами компонента из excludeRefs
   * @default () => {}
   */
  onOutsideClick?: (e?: React.SyntheticEvent) => void;

  /**
   * Список refs, клики на которые не будут вызывать `onOutsideClick`
   * @default []
   */
  excludeRefs?: Array<NodeByRef>;

  /** Рутовый элемент
   * @default document
   *  */
  root?: NodeByRef;
}

function OutsideClick(props: IFunctionProps<IOutsideClickProps>) {
  const { Children, forwardRef, root, excludeRefs, onOutsideClick } = props;
  const children = getOriginChildren(Children);
  const nodeRef = React.useRef(null);
  const targetRef = React.useRef(null);

  const handleRef = useForkRef(children ? children.ref : null, nodeRef, forwardRef);

  const handleOutsideClick = useEventCallback((e) => {
    const isTargetEvent = [...excludeRefs, nodeRef]
      .filter((node) => getNodeByRef(node))
      .some((node) => getNodeByRef(node).contains(targetRef.current || e.target));

    if (!isTargetEvent) {
      onOutsideClick(e);
    }
  });

  const handleMouseDown = useEventCallback((e) => (targetRef.current = e.target));

  useEffect(() => {
    const outsideRoot = root ? getNodeByRef(root) : ownerDocument(nodeRef.current);

    // true стоит что бы перехватить событие быстрее всех, так как если таргет по которому кликнули будет удален из дома то сработает OutsideClick даже если елемент был в exclude
    outsideRoot.addEventListener('mouseup', handleOutsideClick, true);
    outsideRoot.addEventListener('mousedown', handleMouseDown, true);

    return () => {
      outsideRoot.removeEventListener('mouseup', handleOutsideClick, true);
      outsideRoot.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, [root]);

  return children ? cloneElement(children, { ref: handleRef }) : null;
}

OutsideClick.displayName = 'OutsideClick';

OutsideClick.defaultProps = {
  excludeRefs: [],
  onOutsideClick: () => {},
};

export default createComponent<IOutsideClickProps>(OutsideClick);
