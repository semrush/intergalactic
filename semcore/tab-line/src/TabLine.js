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
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import a11yEnhance from '@semcore/utils/lib/enhances/a11yEnhance';
import NeighborLocation, {
  INeighborItemProps,
  INeighborLocationProps,
  neighborLocationEnhance,
} from '@semcore/neighbor-location';
import ResizeObserver from 'resize-observer-polyfill';

import style from './style/tab-line.shadow.css';

const optionsA11yEnhance = {
  onNeighborChange: (neighborElement) => {
    if (neighborElement) {
      neighborElement.focus();
      neighborElement.click();
    }
  },
  childSelector: ['role', 'tab'],
};

class TabLineRoot extends Component {
  static displayName = 'TabLine';
  static style = style;
  static defaultProps = {
    defaultValue: null,
    size: 'm',
    underlined: true,
  };
  static enhance = [a11yEnhance(optionsA11yEnhance)];

  $observer;
  $observerTab;
  $indicator = React.createRef();
  $tabsParent = React.createRef();

  constructor(props) {
    super(props);
    this.$observer = new ResizeObserver(this.calculateStylesIndicator);
    this.$observerTab = new ResizeObserver(this.calculateStylesIndicator);
  }

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  bindHandlerClick = (value) => (e) => {
    this.handlers.value(value, e);
  };

  calculateStylesIndicator = () => {
    const indicator = this.$indicator.current;
    const tabsParent = this.$tabsParent.current;
    if (!indicator || !tabsParent) return false;
    const tab = Array.from(tabsParent.querySelectorAll('[data-ui-name="TabLine.Item"]')).find(
      (node) => node.getAttribute('value') === String(this.asProps.value),
    );
    if (!tab) return false;
    this.$observerTab.observe(tab);
    const { offsetLeft, offsetWidth } = tab;
    indicator.style.transform = `translateX(${offsetLeft - tabsParent.clientLeft}px)`;
    indicator.style.width = `${offsetWidth}px`;
  };

  componentDidMount() {
    if (this.$tabsParent.current) {
      this.$observer.observe(this.$tabsParent.current);
    }
    this.calculateStylesIndicator();
  }

  componentDidUpdate() {
    this.$observerTab.disconnect();
    this.calculateStylesIndicator();
  }

  componentWillUnmount() {
    this.$observer.disconnect();
    this.$observerTab.disconnect();
  }

  getItemProps(props) {
    const { value, size } = this.asProps;
    const isSelected = value === props.value;
    return {
      size,
      selected: isSelected,
      onClick: this.bindHandlerClick(props.value),
      tabIndex: isSelected ? 0 : -1,
      'aria-posinset': value,
      'aria-selected': isSelected,
    };
  }

  render() {
    const STabLine = Root;
    const SIndicator = 'div';
    const { styles, Children, controlsLength } = this.asProps;

    return sstyled(styles)(
      <STabLine render={Box} ref={this.$tabsParent} role="tablist">
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
        <SIndicator ref={this.$indicator} />
      </STabLine>,
    );
  }
}

function TabLineItem(props) {
  const STabLineItem = Root;
  const { Children, styles, addonLeft, addonRight } = props;

  return sstyled(styles)(
    <STabLineItem render={Box} type="button" tag="button" role="tab">
      {addonLeft ? <TabLine.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabLine.Item.Text, TabLine.Item.Addon)}
      {addonRight ? <TabLine.Item.Addon tag={addonRight} /> : null}
    </STabLineItem>,
  );
}

TabLineItem.enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

function Text(props) {
  const { styles } = props;
  const SText = Root;
  return sstyled(styles)(<SText render={Box} tag="span" />);
}

function Addon(props) {
  const { styles } = props;
  const SAddon = Root;
  return sstyled(styles)(<SAddon render={Box} tag="span" />);
}

const TabLine = createComponent(TabLineRoot, {
  Item: [TabLineItem, { Text, Addon }],
});

export default TabLine;
