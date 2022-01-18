import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Collapse as CollapseAnimate } from '@semcore/animation';
import ChevronRight from '@semcore/icon/ChevronRight/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/accordion.shadow.css';

class RootAccordion extends Component {
  static displayName = 'Accordion';
  static style = style;
  static defaultProps = {
    defaultValue: [],
    duration: 350,
  };

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleToggleInteraction = (newValue) => {
    const { value } = this.asProps;

    if (Array.isArray(value)) {
      const indexOfNewValue = value.indexOf(newValue);
      const result = [...value];
      indexOfNewValue === -1 ? result.push(newValue) : result.splice(indexOfNewValue, 1);
      this.handlers.value(result);
    } else {
      this.handlers.value(value === newValue ? null : newValue);
    }
  };

  getItemProps({ value }) {
    const { value: selectedValue, duration } = this.asProps;
    const selected = Array.isArray(selectedValue)
      ? selectedValue.includes(value)
      : selectedValue === value;
    return {
      selected,
      duration,
      $handleInteraction: this.handleToggleInteraction,
    };
  }

  render() {
    const { Children } = this.asProps;
    return <Children />;
  }
}

export class RootItem extends Component {
  static displayName = 'Item';
  static style = style;

  handleClick = () => {
    const { value, $handleInteraction } = this.asProps;

    $handleInteraction(value);
  };

  getToggleProps() {
    const { value, selected, disabled } = this.asProps;
    return {
      disabled,
      onClick: this.handleClick,
      id: `trigger-${value}`,
      'aria-expanded': selected,
      'aria-controls': `content-${value}`,
    };
  }

  getCollapseProps() {
    const { selected, duration, value } = this.asProps;
    return {
      selected,
      duration,
      id: `content-${value}`,
      role: 'region',
      'aria-labelledby': `trigger-${value}`,
    };
  }

  getChevronProps() {
    const { selected } = this.asProps;
    return {
      selected,
    };
  }

  render() {
    const { Children } = this.asProps;
    return <Children />;
  }
}

class Toggle extends Component {
  static enhance = [keyboardFocusEnhance()];

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.currentTarget.click();
    }
  }

  render() {
    const { styles } = this.asProps;
    const SItemToggle = Root;

    return sstyled(styles)(<SItemToggle render={Box} onKeyDown={this.handleKeyDown} />);
  }
}

function Chevron(props) {
  const { styles } = props;
  const SItemChevron = Root;
  return sstyled(styles)(<SItemChevron render={ChevronRight} />);
}

function Collapse(props) {
  const { selected } = props;
  return <Root render={CollapseAnimate} visible={selected} interactive />;
}

const Item = createComponent(RootItem, {
  Toggle,
  Chevron,
  Collapse,
});

const Accordion = createComponent(RootAccordion, {
  Item,
});

export default Accordion;
