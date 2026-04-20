import { Box } from '@semcore/base-components';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import { Text as UikitText } from '@semcore/typography';
import React from 'react';

import style from './style/tab-panel.shadow.css';

const optionsA11yEnhance = {
  onNeighborChange: (neighborElement, props) => {
    if (neighborElement) {
      neighborElement.focus();
      if (props.behavior === 'auto') {
        neighborElement.click();
      }
    }
  },
  childSelector: ['role', 'tab'],
};

class TabPanelRoot extends Component {
  static displayName = 'TabPanel';
  static style = style;
  static defaultProps = {
    defaultValue: null,
    behavior: 'manual',
  };

  static enhance = [a11yEnhance(optionsA11yEnhance)];

  buttonRefsList = [];

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleClick = (value) => (event) => {
    this.handlers.value(value, event);
  };

  handleKeyDown = (value) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handlers.value(value, event);
    }
  };

  getItemProps(props, index) {
    const { value } = this.asProps;
    const isSelected = value === props.value;
    return {
      'selected': isSelected,
      'onClick': this.handleClick(props.value),
      'onKeyDown': this.handleKeyDown(props.value),
      'tabIndex': isSelected ? 0 : -1,
      'aria-selected': isSelected,
      'buttonRefsList': this.buttonRefsList,
      index,
    };
  }

  getItemTextProps(_, index) {
    return {
      buttonRefsList: this.buttonRefsList,
      index,
    };
  }

  render() {
    const STabPanel = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<STabPanel render={Box} role='tablist' />);
  }
}

function TabPanelItem(props) {
  const STabPanelItem = Root;
  const { Children, styles, addonLeft, addonRight, buttonRefsList, index } = props;
  const buttonRef = React.useRef();

  buttonRefsList[index] = buttonRef;

  return sstyled(styles)(
    <STabPanelItem render={Box} type='button' tag='button' tabIndex={0} role='tab' ref={buttonRef}>
      {addonLeft ? <TabPanel.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabPanel.Item.Text, TabPanel.Item.Addon)}
      {addonRight ? <TabPanel.Item.Addon tag={addonRight} /> : null}
    </STabPanelItem>,
  );
}

function Text(props) {
  const SText = Root;
  const { styles, ellipsis = true, buttonRefsList, index } = props;
  return sstyled(styles)(<SText render={UikitText} size={200} ellipsis={ellipsis} medium hint:triggerRef={buttonRefsList[index]} />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

const TabPanel = createComponent(TabPanelRoot, {
  Item: [TabPanelItem, { Text, Addon }],
});

export const wrapTabPanel = (wrapper) => wrapper;

export default TabPanel;
