import React from 'react';
import assignProps from '../assignProps';
import { UnknownProperties } from '../../core-types/UnknownProperties';
import { lastInteraction } from '../../LastInteractionType';

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

export const enforcedKeyboardFocusEnhanceContext = React.createContext(false);

export type KeyboardFocusEnhanceHook = (props: {
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

const keyboardFocusEnhance = (makeFocusable = true): KeyboardFocusEnhanceHook => {
  return (props) => {
    const { autoFocus } = props;
    const disabled = props.disabled || props.loading;
    const tabIndex = props.tabIndex ?? (makeFocusable ? 0 : undefined);
    const [keyboardFocused, setKeyboardFocused] = React.useState(false);
    const ref = React.useRef<HTMLElement>(null);

    const handleFocus = React.useCallback((event: React.FocusEvent) => {
      if (event.isTrusted === true) {
        if (!lastInteraction.isKeyboard()) return;
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
    React.useEffect(() => {
      if (disabled) {
        setKeyboardFocused(false);
      }
    }, [disabled]);

    const enforcedKeyboardFocus = React.useContext(enforcedKeyboardFocusEnhanceContext);

    return assignProps(props, {
      tabIndex: disabled ? -1 : tabIndex,
      keyboardFocused: (keyboardFocused || enforcedKeyboardFocus) && !disabled,
      onFocus: handleFocus,
      onBlur: handlerBlur,
      ref,
    });
  };
};

export default keyboardFocusEnhance;
