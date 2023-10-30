import React, { MutableRefObject, Ref, RefObject } from 'react';
import { findDOMNode } from 'react-dom';

export function setRef<T>(ref: Ref<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref?.hasOwnProperty('current')) {
    // @ts-ignore
    ref['current'] = value;
  }
}

export function getRef(ref: RefObject<Element> | Element): Element | null {
  if (!ref) return null;
  return 'current' in ref ? ref.current : ref;
}

export function useCallbackRef<T>(
  initialValue: T | null,
  callback: (newValue: T | null, lastValue: T | null) => void,
): MutableRefObject<T | null> {
  const [ref] = React.useState(() => ({
    // value
    value: initialValue,
    // last callback
    callback,
    // "memoized" public interface
    facade: {
      get current() {
        return ref.value;
      },
      set current(value) {
        const last = ref.value;
        if (last !== value) {
          ref.value = value;
          ref.callback(value, last);
        }
      },
    },
  }));
  // update callback
  ref.callback = callback;

  return ref.facade;
}

export function useForkRef<T>(...refs: Ref<T>[]): Ref<T> {
  return React.useCallback((refValue: any) => {
    const uniqueRefs = [...new Set(refs)];
    uniqueRefs.forEach((ref) => setRef(ref, refValue));
  }, refs);
}

export function forkRef<T>(...refs: Ref<T>[]): Ref<T> {
  if (refs.every((ref) => ref == null)) {
    return null;
  }
  return (refValue) => {
    const uniqueRefs = [...new Set(refs)];
    uniqueRefs.forEach((ref) => setRef(ref, refValue));
  };
}

export type NodeByRef = RefObject<Element> | Element | (() => RefObject<Element> | Element);

export function getNodeByRef(ref: NodeByRef): Element | null {
  if (typeof ref === 'function') {
    ref = ref();
  }
  if (!ref) return null;

  const node = getRef(ref);
  if (!node) return null;
  if (node.nodeType === 1) return node;

  return findDOMNode(node) as Element;
}
