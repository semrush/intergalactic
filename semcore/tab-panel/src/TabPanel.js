import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetterFn,
  PropsAndRef,
  sstyled,
  Root,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import a11yEnhance from '@semcore/utils/lib/enhances/a11yEnhance';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/tab-panel.shadow.css';

const optionsA11yEnhance = {
  onNeighborChange: (neighborElement) => {
    if (neighborElement) {
      neighborElement.focus();
      neighborElement.click();
    }
  },
  childSelector: ['role', 'tab'],
};

class TabPanelRoot extends Component {
  static displayName = 'TabPanel';
  static style = style;
  static defaultProps = {
    defaultValue: null,
  };
  static enhance = [a11yEnhance(optionsA11yEnhance)];

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  bindHandlerClick = (value) => (e) => {
    this.handlers.value(value, e);
  };

  getItemProps(props) {
    const { value } = this.asProps;
    const isSelected = value === props.value;
    return {
      selected: isSelected,
      onClick: this.bindHandlerClick(props.value),
      tabIndex: isSelected ? 0 : -1,
      'aria-posinset': value,
      'aria-selected': isSelected,
    };
  }

  render() {
    const STabPanel = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<STabPanel render={Box} role="tablist" />);
  }
}

function TabPanelItem(props) {
  const STabPanelItem = Root;
  const { Children, styles, addonLeft, addonRight } = props;

  return sstyled(styles)(
    <STabPanelItem render={Box} type="button" tag="button" role="tab">
      {addonLeft ? <TabPanel.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabPanel.Item.Text, TabPanel.Item.Addon)}
      {addonRight ? <TabPanel.Item.Addon tag={addonRight} /> : null}
    </STabPanelItem>,
  );
}

TabPanelItem.enhance = [keyboardFocusEnhance()];

function Text(props) {
  const SText = Root;
  const { styles } = props;
  return sstyled(styles)(<SText render={Box} tag="span" />);
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag="span" />);
}

const TabPanel = createComponent(TabPanelRoot, {
  Item: [TabPanelItem, { Text, Addon }],
});

export default TabPanel;
