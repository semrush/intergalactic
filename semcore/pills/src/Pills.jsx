import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { useNeighborLocationDetect } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
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

  getItemProps(props, i) {
    const { value, size, disabled } = this.asProps;
    return {
      index: i,
      size,
      disabled,
      selected: value === props.value,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength, disabled } = this.asProps;

    return sstyled(styles)(
      <SPills render={Box} role="radiogroup" aria-disabled={disabled}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SPills>,
    );
  }
}

function Pill(props) {
  const SPill = Root;
  const { Children, styles, addonLeft, addonRight, selected, disabled, index } = props;
  const neighborLocation = useNeighborLocationDetect(index);
  return sstyled(styles)(
    <SPill
      render={Box}
      tag="button"
      type="button"
      role="radio"
      neighborLocation={neighborLocation}
      aria-checked={selected}
      aria-disabled={disabled}
    >
      {addonLeft ? <Pills.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon)}
      {addonRight ? <Pills.Item.Addon tag={addonRight} /> : null}
    </SPill>,
  );
}

Pill.enhance = [keyboardFocusEnhance()];

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
