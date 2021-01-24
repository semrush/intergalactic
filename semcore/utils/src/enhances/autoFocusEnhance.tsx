/* eslint-disable */
import React, { useEffect } from 'react';
import { useForkRef } from '../ref';

function notUsingNativeAutoFocus(autoFocus) {
  return typeof autoFocus === 'boolean' || typeof autoFocus === 'number';
}

export interface IWithAutoFocusEnhanceProps {
  /** Нативный автофокус, но с поддержкой внутри модальных окон, так же можно передать количество ms до срабатывания фокуса */
  autoFocus?: Boolean | Number;
}

function autoFocusEnhance() {
  return (props) => {
    const { autoFocus, ref, ...other } = props;
    if (!notUsingNativeAutoFocus(autoFocus)) {
      return props;
    }
    const nodeRef = React.createRef<HTMLElement>();
    useEffect(() => {
      if (autoFocus === false) return;
      const { current: inputNode } = nodeRef;
      if (!inputNode || !inputNode.focus) return;
      const timer = setTimeout(() => inputNode?.focus(), (autoFocus as number) || 0);
      return () => {
        clearTimeout(timer);
      };
    }, [autoFocus]);
    return {
      ref: useForkRef(ref, nodeRef),
      ...other,
    };
  };
}

export default autoFocusEnhance;
