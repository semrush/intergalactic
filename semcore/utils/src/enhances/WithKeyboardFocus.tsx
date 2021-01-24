/* eslint-disable */
import React, { PureComponent } from 'react';
import createHoc from '../createHoc';
import { internalSetState } from '../uncontroll';
import fire from '../fire';

export interface IEnhancedWithKeyboardFocusInjectedProps {
  tabIndex: number;
  keyboardFocused: boolean;

  onFocus(e: FocusEvent): void;

  onBlur(e: FocusEvent): void;

  onKeyDown(e: KeyboardEvent): void;

  onMouseDown(e: MouseEvent): void;
}

export interface IEnhancedWithKeyboardFocusProps {
  keyboardFocused?: boolean;
  tabIndex?: number;
  disabled?: boolean;

  children(props: IEnhancedWithKeyboardFocusInjectedProps): React.ReactNode;
}

export interface IEnhancedWithKeyboardFocusState {
  keyboardFocused: boolean;
}

let usingKeyBoard = true;

export class EnhancedWithKeyboardFocus extends PureComponent<
  IEnhancedWithKeyboardFocusProps,
  IEnhancedWithKeyboardFocusState
> {
  static displayName = 'EnhancedWithKeyboardFocus';

  static defaultProps = {
    tabIndex: 0,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.keyboardFocused !== undefined) {
      return {
        keyboardFocused: props.keyboardFocused,
      };
    }
    return state;
  }

  state = {
    keyboardFocused: false,
  };

  handlerFocus = (e: FocusEvent) => {
    fire(this, 'onFocus', e);
    if (usingKeyBoard) {
      internalSetState(this, { keyboardFocused: true });
    }
  };

  handlerBlur = (e: FocusEvent) => {
    fire(this, 'onBlur', e);
    internalSetState(this, { keyboardFocused: false });
  };

  handlerKeyDown = (e: KeyboardEvent) => {
    fire(this, 'onKeyDown', e);
    usingKeyBoard = true;
  };

  handlerMouseDown = (e: MouseEvent) => {
    fire(this, 'onMouseDown', e);
    usingKeyBoard = false;
  };

  render() {
    const { children, tabIndex, disabled } = this.props;
    const { keyboardFocused } = this.state;
    return children({
      tabIndex: disabled ? -1 : tabIndex,
      keyboardFocused,
      onFocus: this.handlerFocus,
      onBlur: this.handlerBlur,
      onKeyDown: this.handlerKeyDown,
      onMouseDown: this.handlerMouseDown,
    });
  }
}

export default createHoc(EnhancedWithKeyboardFocus);
