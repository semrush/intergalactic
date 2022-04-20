import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import Text from './Text';

import style from './style/hint.shadow.css';

class RootHint extends Component {
  static displayName = 'Hint';
  static style = style;
  static enhance = [keyboardFocusEnhance()];

  render() {
    const SHint = Root;
    const { styles, Children, addonLeft, addonRight } = this.asProps;
    return sstyled(styles)(
      <SHint render={Text} tag="abbr">
        {addonLeft ? <Hint.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Hint.Text, Hint.Addon)}
        {addonRight ? <Hint.Addon tag={addonRight} /> : null}
      </SHint>,
    );
  }
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag="span" />);
}

function HintText(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag="span" />);
}

const Hint = createComponent(RootHint, {
  Text: HintText,
  Addon,
});

export default Hint;
