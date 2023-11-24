import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { useNeighborLocationDetect } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import log from '@semcore/utils/lib/logger';

import style from './style/pills.shadow.css';

class RootPills extends Component {
  static displayName = 'Pills';
  static style = style;
  static defaultProps = ({ behavior }) => ({
    size: 'm',
    defaultValue: null,
    behavior: behavior ?? 'auto',
    tabIndex: behavior === 'tabs' || behavior === 'manual' ? -1 : 0,
  });
  itemRefs = [];
  itemValues = [];
  static enhance = [keyboardFocusEnhance()];

  componentDidMount() {
    log.warn(
      this.asProps.behavior === 'tabs',
      'Use behavior `manual` instead of `tabs`. \n`tabs` is deprecated and will be removed in the next major release.',
      'Pills',
    );

    log.warn(
      this.asProps.behavior === 'radio',
      'Use behavior `auto` (or nothing, it is default value) instead of `radio`. \n`radio` is deprecated and will be removed in the next major release.',
      'Pills',
    );
  }

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
      ref: (node) => {
        this.itemRefs[index] = node;
      },
      index: index,
      size,
      disabled,
      selected: value === props.value,
      behavior,
      tabIndex: behavior === 'tabs' || behavior === 'manual' ? 0 : -1,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  changeIndex = (startIndex, type) => {
    let selectable = false;

    while (!selectable && startIndex >= 0 && startIndex < this.itemValues.length) {
      if (type === 'increment') startIndex++;
      if (type === 'decrement') startIndex--;

      const element = this.itemRefs[startIndex];

      if (element?.disabled === false) {
        selectable = true;
      }
    }

    return startIndex >= 0 && startIndex < this.itemValues.length ? startIndex : undefined;
  };

  handleKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const behavior = this.asProps.behavior;
    if (behavior === 'radio' || behavior === 'auto') {
      let selectedIndex = this.itemValues.findIndex((value) => value === this.asProps.value);
      if (selectedIndex === -1) return;

      selectedIndex = this.changeIndex(
        selectedIndex,
        event.key === 'ArrowLeft' ? 'decrement' : 'increment',
      );

      if (selectedIndex !== undefined) {
        this.handlers.value(this.itemValues[selectedIndex], event);
        this.itemRefs[selectedIndex]?.focus();
      }
    } else {
      let focusedIndex = this.itemRefs.findIndex((item) => item === document.activeElement);
      if (focusedIndex === -1) return;

      focusedIndex = this.changeIndex(
        focusedIndex,
        event.key === 'ArrowLeft' ? 'decrement' : 'increment',
      );

      if (focusedIndex !== undefined) {
        this.itemRefs[focusedIndex]?.focus();
      }
    }
  };

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength, disabled, behavior } = this.asProps;

    return sstyled(styles)(
      <SPills
        render={Box}
        role={behavior === 'radio' || behavior === 'auto' ? 'radiogroup' : 'tablist'}
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
  if (behavior === 'radio' || behavior === 'auto') {
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
