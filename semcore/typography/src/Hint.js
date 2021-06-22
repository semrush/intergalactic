import React from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonText from '@semcore/utils/lib/addonText';

import Text from './Text';

import style from './style/hint.shadow.css';

class RootHint extends Component {
  static displayName = 'Hint';
  static style = style;
  static enhance = [keyboardFocusEnhance()];

  render() {
    const SHint = Text;
    const { styles, forwardRef, children, ...other } = this.asProps;
    return sstyled(styles)(
      <SHint tag="abbr" ref={forwardRef} {...other}>
        {addonText(children, Hint.Text, Hint.Addon)}
      </SHint>,
    );
  }
}

function Addon(props) {
  const SAddon = Box;
  const { styles, forwardRef, ...other } = props;
  return sstyled(styles)(<SAddon tag="span" ref={forwardRef} {...other} />);
}

function HintText(props) {
  const SText = Box;
  const { styles, forwardRef, ...other } = props;
  return sstyled(styles)(<SText tag="span" ref={forwardRef} {...other} />);
}

const Hint = createComponent(RootHint, {
  Text: HintText,
  Addon,
});

export default Hint;
