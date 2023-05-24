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
    tabIndex: behavior === 'tabs' ? -1 : 0,
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
      tabIndex: behavior === 'tabs' ? 0 : -1,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  handleKeyDown = (event) => {
    if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight') return;
    if (this.asProps.behavior === 'radio') {

      let selectedIndex = this.itemValues.findIndex((value) => value === this.asProps.value);
      if (selectedIndex === -1) return;

      if (event.code === 'ArrowLeft') selectedIndex--;
      if (event.code === 'ArrowRight') selectedIndex++;
      if (selectedIndex < 0 || selectedIndex >= this.itemValues.length) return;

      this.handlers.value(this.itemValues[selectedIndex], event);
    } else {
      let focusedIndex = this.itemRefs.findIndex((item) => item === document.activeElement);
      if (focusedIndex === -1) return;

      if (event.code === 'ArrowLeft') focusedIndex--;
      if (event.code === 'ArrowRight') focusedIndex++;

      this.itemRefs[focusedIndex]?.focus();
    }
  };

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength, disabled, behavior } = this.asProps;

    return sstyled(styles)(
      <SPills
        render={Box}
        role={behavior === 'radio' ? 'radiogroup' : 'tablist'}
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
  const roleAreaProps = {};
  if (behavior === 'radio') {
    roleAreaProps.role = 'radio';
    roleAreaProps['aria-checked'] = selected;
  } else {
    roleAreaProps.role = 'tab';
    roleAreaProps['aria-selected'] = selected;
  }
  return sstyled(styles)(
    <SPill
      render={Box}
      tag='button'
      type='button'
      neighborLocation={neighborLocation}
      aria-disabled={disabled}
      aria-posinset={index + 1}
      {...roleAreaProps}
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
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

const Pills = createComponent(RootPills, {
  Item: [Pill, { Text, Addon }],
});

export default Pills;
