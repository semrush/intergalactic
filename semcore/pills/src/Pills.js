import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, {
  Component,
  Merge,
  PropGetterFn,
  PropsAndRef,
  sstyled,
  Root,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import NeighborLocation, {
  INeighborItemProps,
  INeighborLocationProps,
  neighborLocationEnhance,
} from '@semcore/neighbor-location';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';

import style from './style/pills.shadow.css';

class RootPills extends Component {
  static displayName = 'Pills';
  static style = style;
  static defaultProps = {
    size: 'm',
    defaultValue: null,
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  bindHandlerClick = (value) => (e) => {
    this.handlers.value(value, e);
  };

  getItemProps(props) {
    const { value, size, disabled } = this.asProps;
    return {
      size,
      disabled,
      selected: value === props.value,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength } = this.asProps;

    return sstyled(styles)(
      <SPills render={Box}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SPills>,
    );
  }
}

function Pill(props) {
  const SPill = Root;
  const { Children, styles, addonLeft, addonRight } = props;

  return sstyled(styles)(
    <SPill render={Box} type="button" tag="button">
      {addonLeft ? <Pills.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon)}
      {addonRight ? <Pills.Item.Addon tag={addonRight} /> : null}
    </SPill>,
  );
}

Pill.enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

function Text(props) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag="span" />);
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag="span" />);
}

const Pills = createComponent(RootPills, {
  Item: [Pill, { Text, Addon }],
});

export default Pills;
