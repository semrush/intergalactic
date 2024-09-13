import React from 'react';
import assignProps from '../assignProps';

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

export type FocusSourceEnhanceHook = (props: {
  tabIndex?: number;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
}) => {
  tabIndex: number;
  keyboardFocused: boolean;
  onFocus: (e: React.FocusEvent) => void;
  onBlur: () => void;
};

const focusSourceEnhance = (): FocusSourceEnhanceHook => {
  return (props) => {
    const focusSourceRef = useFocusSource();

    return assignProps(props, {
      focusSourceRef,
    });
  };
};

export default focusSourceEnhance;
