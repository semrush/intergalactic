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

function keyboardFocusEnhance(
  options = {
    isDisabled: (props) => props.disabled,
    propName: '',
    focusMethod: 'onFocus',
    blurMethod: 'onBlur',
    isCurrent: false,
  },
) {
  return (props) => {
    const { tabIndex = 0, disabled } = props;
    const [keyboardFocused, setKeyboardFocused] = useState(false);

    const handlerFocus = (e) => {
      if (register.get(KEY_REGISTER, true)) {
        if (!options.isCurrent || e.currentTarget == e.target) {
          if (document.activeElement == e.currentTarget || document.activeElement == e.target) {
            setKeyboardFocused(true);
          }
        }
      }
    };

    const handlerBlur = (e) => {
      if (!options.isCurrent || e.currentTarget == e.target) {
        setKeyboardFocused(false);
      }
    };

    const handlerKeyDown = useEventCallback((e) => {
      if (!options.isCurrent || e.currentTarget == e.target) {
        register.set(KEY_REGISTER, true);
      }
    });

    const handlerMouseDown = useEventCallback((e) => {
      register.set(KEY_REGISTER, false);
    });

    const extends_props = {
      tabIndex: options.isDisabled(props) ? -1 : tabIndex,
      // tabIndex: disabled ? -1 : tabIndex,
      keyboardFocused,
      [options.focusMethod]: handlerFocus,
      [options.blurMethod]: handlerBlur,
      onKeyDown: handlerKeyDown,
      onMouseDown: handlerMouseDown,
    };

    return assignProps(
      props,
      options.propName
        ? {
            [options.propName]: extends_props,
          }
        : extends_props,
    );
  };
}

export default keyboardFocusEnhance;
