import React from 'react';
import assignProps from '../assignProps';

export interface IKeyboardFocusProps {
  /* Property responsible for displaying "keyboard" focus */
  keyboardFocused?: boolean;
}

const focusSourceListeners = [];
export const useFocusSource = () => {
  const handleMouseDown = React.useCallback(
    () => focusSourceListeners.forEach((listener) => listener.setFocusSource('mouse')),
    [],
  );
  const handleKeyDown = React.useCallback(
    () => focusSourceListeners.forEach((listener) => listener.setFocusSource('keyboard')),
    [],
  );
  const focusSourceRef = React.useRef<'none' | 'mouse' | 'keyboard'>('none');
  const setFocusSource = React.useCallback((source) => (focusSourceRef.current = source), []);
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
  return (props) => {
    const { tabIndex = 0, disabled } = props;
    const [keyboardFocused, setKeyboardFocused] = React.useState(false);
    const focusSourceRef = useFocusSource();

    const handlerFocus = React.useCallback(() => {
      if (focusSourceRef.current !== 'keyboard') return;
      setKeyboardFocused(true);
    }, []);
    const handlerBlur = React.useCallback(() => setKeyboardFocused(false), []);

    return assignProps(props, {
      tabIndex: disabled ? -1 : tabIndex,
      keyboardFocused,
      onFocus: handlerFocus,
      onBlur: handlerBlur,
    });
  };
};

export default keyboardFocusEnhance;
