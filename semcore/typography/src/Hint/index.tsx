import React, { HTMLAttributes } from 'react';
import createComponent, { Component, IFunctionProps, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import WithKeyboardFocus from '@semcore/utils/lib/enhances/WithKeyboardFocus';
import addonText from '@semcore/utils/lib/addonText';

import Text, { ITextProps } from '../Text';

import style from './style/hint.shadow.css';

export interface IHintProps extends ITextProps {
  /** The value responsible for the activity of the element
   * @default false
   */
  disabled?: boolean;
  /**
   * @ignore
   **/
  keyboardFocused?: boolean;
  /** Enable `active` state */
  active?: boolean;
}

class RootHint extends Component<IHintProps> {
  static displayName = 'Hint';
  static style = style;
  static enhance = [WithKeyboardFocus()];

  render() {
    const SHint = Text;
    const {
      styles,
      forwardRef,
      children,
      keyboardFocused,
      disabled,
      active,
      ...other
    } = this.asProps;
    return styled(styles)(
      <SHint
        tag="abbr"
        active={active}
        keyboardFocused={keyboardFocused}
        disabled={disabled}
        ref={forwardRef}
        {...other}
      >
        {addonText(children, Hint.Text, Hint.Addon)}
      </SHint>,
    );
  }
}

function Addon(props: IFunctionProps<IBoxProps>) {
  const SAddon = Box;
  const { styles, forwardRef, ...other } = props;
  return styled(styles)(<SAddon tag="span" ref={forwardRef} {...other} />);
}

function HintText(props: IFunctionProps<IBoxProps>) {
  const SText = Box;
  const { styles, forwardRef, ...other } = props;
  return styled(styles)(<SText tag="span" ref={forwardRef} {...other} />);
}

const Hint = createComponent<
  Merge<IHintProps, HTMLAttributes<HTMLElement>>,
  {
    Addon: Merge<IBoxProps, HTMLAttributes<HTMLSpanElement>>;
    Text: Merge<IBoxProps, HTMLAttributes<HTMLSpanElement>>;
  }
>(RootHint, {
  Text: HintText,
  Addon,
});

export default Hint;
