import { useState } from 'react';
// @ts-ignore
import { register } from '@semcore/core';
import assignProps from '../assignProps';
import useEventCallback from '../use/useEventCallback';

const KEY_REGISTER = 'keyboard-focus-enhance-using';

export interface IKeyboardFocusProps {
  /* Property responsible for displaying "keyboard" focus */
  keyboardFocused?: boolean;
}

function keyboardFocusEnhance() {
  return (props) => {
    const { tabIndex = 0, disabled } = props;
    const [keyboardFocused, setKeyboardFocused] = useState(false);

    const handlerFocus = useEventCallback(() => {
      if (register.get(KEY_REGISTER, true)) {
        setKeyboardFocused(true);
      }
    });

    const handlerBlur = useEventCallback(() => {
      setKeyboardFocused(false);
    });

    const handlerKeyDown = useEventCallback(() => {
      register.set(KEY_REGISTER, true);
    });

    const handlerMouseDown = useEventCallback(() => {
      register.set(KEY_REGISTER, false);
    });

    return assignProps(props, {
      tabIndex: disabled ? -1 : tabIndex,
      keyboardFocused,
      onFocus: handlerFocus,
      onBlur: handlerBlur,
      onKeyDown: handlerKeyDown,
      onMouseDown: handlerMouseDown,
    });
  };
}

export default keyboardFocusEnhance;
