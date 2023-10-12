import React from 'react';
import assignProps from '../assignProps';
import { UnknownProperties } from '@semcore/core';

/** @deprecated */
export interface IKeyboardFocusProps extends KeyboardFocusProps, UnknownProperties {}
export type KeyboardFocusProps = {
  /* Property responsible for displaying "keyboard" focus */
  keyboardFocused?: boolean;
  /**
   * Makes component to catch browser focus on component mount
   * @default false
   */
  autoFocus?: boolean;
};

let lastFocusSource: 'mouse' | 'keyboard' | 'none' = 'none';
const focusSourceListeners: {
  setFocusSource: (source: 'mouse' | 'keyboard' | 'none') => void;
  subscribeListeners: () => void;
}[] = [];
export const useFocusSource = () => {
  const handleMouseDown = React.useCallback(
    () => focusSourceListeners.forEach((listener) => listener.setFocusSource('mouse')),
    [],
  );
  const handleKeyDown = React.useCallback(
    () => focusSourceListeners.forEach((listener) => listener.setFocusSource('keyboard')),
    [],
  );
  const focusSourceRef = React.useRef<'none' | 'mouse' | 'keyboard'>(lastFocusSource);
  const setFocusSource = React.useCallback((source: 'none' | 'mouse' | 'keyboard') => {
    focusSourceRef.current = source;
    lastFocusSource = source;
  }, []);
  const subscribeListeners = React.useCallback(() => {
    document.addEventListener('mousedown', handleMouseDown, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });
  }, []);
  const unsubscribeListeners = React.useCallback(() => {
    document.removeEventListener('mousedown', handleMouseDown, { capture: true });
    document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  React.useEffect(() => {
    const needToAddListeners = focusSourceListeners.length === 0;
    const sourceListener = { setFocusSource, subscribeListeners };
    focusSourceListeners.push(sourceListener);
    if (needToAddListeners) subscribeListeners();
    const needToRemoveListeners = needToAddListeners;

    return () => {
      const sourceListenerIndex = focusSourceListeners.indexOf(sourceListener);
      focusSourceListeners.splice(sourceListenerIndex, 1);
      if (needToRemoveListeners) unsubscribeListeners();
      if (needToRemoveListeners && focusSourceListeners.length > 0) {
        focusSourceListeners[0].subscribeListeners();
      }
    };
  }, []);

  return focusSourceRef;
};

const keyboardFocusEnhance = () => {
  return (props: any) => {
    const { tabIndex = 0, disabled, autoFocus } = props;
    const [keyboardFocused, setKeyboardFocused] = React.useState(false);
    const focusSourceRef = useFocusSource();
    const ref = React.useRef<HTMLElement>(null);

    const handleFocus = React.useCallback((event: React.FocusEvent) => {
      if (event.isTrusted === true) {
        if (focusSourceRef.current !== 'keyboard') return;
      }
      setKeyboardFocused(true);
    }, []);
    const handlerBlur = React.useCallback(() => setKeyboardFocused(false), []);
    React.useEffect(() => {
      if (typeof autoFocus !== 'number' && !autoFocus) return;
      const timer = setTimeout(() => {
        ref.current?.focus();
        setKeyboardFocused(true);
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }, [autoFocus]);

    return assignProps(props, {
      tabIndex: disabled ? -1 : tabIndex,
      keyboardFocused: keyboardFocused && !disabled,
      onFocus: handleFocus,
      onBlur: handlerBlur,
      ref,
    });
  };
};

export default keyboardFocusEnhance;
