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
  static defaultProps = ({ behavior }) => ({
    size: 'm',
    defaultValue: null,
    behavior: behavior ?? 'tabs',
    tabIndex: behavior === 'tabs' ? -1 : 1,
  });
  itemRefs = [];
  itemValues = [];
  static enhance = [keyboardFocusEnhance()];

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  bindHandlerClick = (value) => (e) => {
    this.handlers.value(value, e);
  };

  getItemProps(props, index) {
    const { value, size, disabled, behavior } = this.asProps;
    this.itemValues[index] = props.value;
    return {
      ref: (node) => (this.itemRefs[index] = node),
      index: index,
      size,
      disabled,
      selected: value === props.value,
      behavior,
      tabIndex: behavior === 'tabs' ? 1 : -1,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  handleKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (this.asProps.behavior === 'tabs') {
      let focusedIndex = this.itemRefs.findIndex((item) => item === document.activeElement);
      if (focusedIndex === -1) return;

      if (event.key === 'ArrowLeft') focusedIndex--;
      if (event.key === 'ArrowRight') focusedIndex++;

      this.itemRefs[focusedIndex]?.focus();
    } else {
      let selectedIndex = this.itemValues.findIndex((value) => value === this.asProps.value);
      if (selectedIndex === -1) return;

      if (event.key === 'ArrowLeft') selectedIndex--;
      if (event.key === 'ArrowRight') selectedIndex++;
      if (selectedIndex < 0 || selectedIndex >= this.itemValues.length) return;

      this.handlers.value(this.itemValues[selectedIndex], event);
    }
  };

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength, disabled, behavior } = this.asProps;

    return sstyled(styles)(
      <SPills
        render={Box}
        role={behavior === 'tabs' ? 'tablist' : 'radiogroup'}
        aria-disabled={disabled}
        onKeyDown={this.handleKeyDown}
      >
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
      </SPills>,
    );
  }
}

function Pill(props) {
  const SPill = Root;
  const { Children, styles, addonLeft, addonRight, selected, disabled, index, behavior } = props;
  const neighborLocation = useNeighborLocationDetect(index);
  return sstyled(styles)(
    <SPill
      render={Box}
      tag="button"
      type="button"
      role={behavior === 'tabs' ? 'tab' : 'radio'}
      neighborLocation={neighborLocation}
      aria-checked={selected}
      aria-disabled={disabled}
      aria-posinset={index + 1}
      aria-selected={selected}
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
