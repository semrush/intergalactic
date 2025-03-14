import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import NeighborLocation, { useNeighborLocationDetect } from '@semcore/neighbor-location';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import log from '@semcore/core/lib/utils/logger';

import style from './style/pills.shadow.css';

const optionsA11yEnhance = {
  onNeighborChange: (neighborElement, props) => {
    if (neighborElement) {
      neighborElement.focus();
      if (props.behavior === 'auto' || props.behavior === 'radio') {
        neighborElement.click();
      }
    }
  },
  childSelector: (props) =>
    props.behavior === 'auto' || props.behavior === 'radio' ? ['role', 'radio'] : ['role', 'tab'],
};

class RootPills extends Component {
  static displayName = 'Pills';
  static style = style;
  static defaultProps = ({ behavior }) => ({
    size: 'm',
    defaultValue: null,
    behavior: behavior ?? 'auto',
  });
  itemValues = [];
  static enhance = [a11yEnhance(optionsA11yEnhance)];

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

  bindHandleKeyDown = (value) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handlers.value(value, event);
    }
  };

  getItemProps(props, index) {
    const { value, size, disabled, behavior } = this.asProps;
    const isSelected = value === props.value;

    this.itemValues[index] = props.value;
    return {
      index: index,
      size,
      disabled,
      selected: isSelected,
      behavior,
      tabIndex: isSelected ? 0 : -1,
      onClick: this.bindHandlerClick(props.value),
      onKeyDown: this.bindHandleKeyDown(props.value),
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

  render() {
    const SPills = Root;
    const { Children, styles, controlsLength, disabled, behavior, value } = this.asProps;

    return sstyled(styles)(
      <SPills
        render={Box}
        role={behavior === 'radio' || behavior === 'auto' ? 'radiogroup' : 'tablist'}
        aria-disabled={disabled}
        use:tabIndex={value !== null ? -1 : 0}
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
      tabIndex={0}
      neighborLocation={neighborLocation}
      aria-disabled={disabled}
      {...roleAreaProps}
    >
      {addonLeft ? <Pills.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, Pills.Item.Text, Pills.Item.Addon)}
      {addonRight ? <Pills.Item.Addon tag={addonRight} /> : null}
    </SPill>,
  );
}

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

export const wrapPills = (wrapper) => wrapper;

export default Pills;
