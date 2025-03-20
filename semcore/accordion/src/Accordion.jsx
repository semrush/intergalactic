import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { Collapse as CollapseAnimate } from '@semcore/animation';
import { Text } from '@semcore/typography';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import ChevronRightL from '@semcore/icon/ChevronRight/l';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';

import style from './style/accordion.shadow.css';

class RootAccordion extends Component {
  static displayName = 'Accordion';
  static style = style;
  static defaultProps = {
    defaultValue: [],
    use: 'secondary',
  };
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-accordion',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
  ];

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
    const { value: selectedValue, duration, use } = this.asProps;
    const selected = Array.isArray(selectedValue)
      ? selectedValue.includes(value)
      : selectedValue === value;
    return {
      selected,
      duration,
      use,
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
  static enhance = [uniqueIDEnhancement()];

  handleClick = () => {
    const { value, $handleInteraction } = this.asProps;

    $handleInteraction(value);
  };

  getToggleProps() {
    const { value, uid, selected, disabled, use } = this.asProps;
    return {
      use,
      disabled,
      onClick: disabled ? undefined : this.handleClick,
      id: `igc-${uid}-${value}-toggle`,
      tag: 'h3',
      size: 300,
      tabIndex: disabled ? -1 : 0,
    };
  }

  getToggleButtonProps() {
    const { value, uid, selected, disabled } = this.asProps;
    return {
      disabled,
      id: `igc-${uid}-${value}-toggle-button`,
      'aria-expanded': selected ? 'true' : 'false',
      'aria-controls': selected ? `igc-${uid}-${value}-collapse` : undefined,
    };
  }

  getCollapseProps() {
    const { selected, uid, duration, value } = this.asProps;
    return {
      selected,
      duration,
      id: `igc-${uid}-${value}-collapse`,
      role: 'region',
      'aria-labelledby': `igc-${uid}-${value}-toggle-button`,
    };
  }

  getChevronProps() {
    const { selected, size } = this.asProps;
    return {
      selected,
      size,
    };
  }

  render() {
    const { Children } = this.asProps;
    return <Children />;
  }
}

class Toggle extends Component {
  toggleRef = React.createRef();

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (this.toggleRef.current === event.target) {
        event.currentTarget.click();
      }
    } else if (event.key === ' ') {
      event.preventDefault();
      if (this.toggleRef.current === event.target) {
        event.currentTarget.click();
      }
    }
  };

  render() {
    const { styles, use } = this.asProps;
    const SItemToggle = Root;

    return sstyled(styles)(
      <SItemToggle
        use={use}
        ref={this.toggleRef}
        render={Text}
        innerOutline
        onKeyDown={this.handleKeyDown}
      />,
    );
  }
}

function Chevron(props) {
  const { styles, size } = props;

  const SItemChevron = Root;
  return sstyled(styles)(<SItemChevron render={size === 'l' ? ChevronRightL : ChevronRightM} />);
}

function ToggleButton(props) {
  const { styles } = props;

  const SToggleButton = Root;
  return sstyled(styles)(
    <SToggleButton alignItems='center' render={Flex} role={'button'} {...props} />,
  );
}

function Collapse(props) {
  const { selected } = props;
  const visible = selected;

  return (
    <Root
      render={CollapseAnimate}
      visible={visible}
      interactive
      inert={!visible ? '' : undefined}
      aria-hidden={!visible}
    />
  );
}

const Item = createComponent(RootItem, {
  Toggle,
  Chevron,
  ToggleButton,
  Collapse,
});

const Accordion = createComponent(RootAccordion, {
  Item,
});

export const wrapAccordion = (wrapper) => wrapper;

export default Accordion;
