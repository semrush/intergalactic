import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';

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
      selected: isSelected,
      onClick: this.handleClick(props.value),
      onKeyDown: this.handleKeyDown(props.value),
      tabIndex: isSelected ? 0 : -1,
      'aria-selected': isSelected,
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
  const { Children, styles, addonLeft, addonRight } = props;

  return sstyled(styles)(
    <STabPanelItem render={Box} type='button' tag='button' tabIndex={0} role='tab'>
      {addonLeft ? <TabPanel.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabPanel.Item.Text, TabPanel.Item.Addon)}
      {addonRight ? <TabPanel.Item.Addon tag={addonRight} /> : null}
    </STabPanelItem>,
  );
}

function Text(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag='span' />);
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
