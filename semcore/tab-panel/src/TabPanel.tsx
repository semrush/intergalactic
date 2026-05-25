import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import { Text as UikitText } from '@semcore/typography';
import React from 'react';

import style from './style/tab-panel.shadow.css';
import type { NSTabPanel } from './TabPanel.type';

class TabPanelRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTabPanel.Component>,
  typeof TabPanelRoot.enhance,
  NSTabPanel.Handlers
> {
  static displayName = 'TabPanel';
  static style = style;
  static defaultProps = {
    defaultValue: null,
    behavior: 'manual',
  };

  static enhance = [
    a11yEnhance({
      onNeighborChange: (neighborElement, props) => {
        if (neighborElement) {
          neighborElement.focus();
          if (props.behavior === 'auto') {
            neighborElement.click();
          }
        }
      },
      childSelector: ['role', 'tab'],
    }),
  ] as const;

  buttonRefsList: Array<React.MutableRefObject<HTMLButtonElement | undefined>> = [];

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleClick = (value: NSTabPanel.Props['value']) => (event: React.MouseEvent<HTMLButtonElement>) => {
    this.handlers.value(value, event);
  };

  handleKeyDown = (value: NSTabPanel.Props['value']) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handlers.value(value, event);
    }
  };

  getItemProps(props: NSTabPanel.Item.Props, index: number) {
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

  getItemTextProps(_: NSTabPanel.Item.Text.Props, index: number) {
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
};

function TabPanelItem(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSTabPanel.Item.Component,
    typeof TabPanelRoot,
    'Item'
  >,
) {
  const STabPanelItem = Root;
  const { Children, styles, addonLeft, addonRight, buttonRefsList, index } = props;
  const buttonRef = React.useRef<HTMLButtonElement>();

  buttonRefsList[index] = buttonRef;

  return sstyled(styles)(
    <STabPanelItem render={Box} type='button' tag='button' tabIndex={0} role='tab' ref={buttonRef}>
      {addonLeft ? <TabPanel.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabPanel.Item.Text, TabPanel.Item.Addon)}
      {addonRight ? <TabPanel.Item.Addon tag={addonRight} /> : null}
    </STabPanelItem>,
  );
}

function Text(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSTabPanel.Item.Text.Component,
    typeof TabPanelRoot,
    'ItemText'
  >,
) {
  const SText = Root;
  const { styles, ellipsis = true, buttonRefsList, index } = props;
  return sstyled(styles)(<SText render={UikitText} size={200} ellipsis={ellipsis} medium hint:triggerRef={buttonRefsList[index]} />);
}

function Addon(
  props: Intergalactic.InternalTypings.InferComponentProps<NSTabPanel.Item.Addon.Component>,
) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

/**
 * TabPanel
 *
 * {@link https://developer.semrush.com/intergalactic/components/tab-panel/tab-panel-api/|API} | {@link https://developer.semrush.com/intergalactic/components/tab-panel/tab-panel-code/|Examples}
 */
const TabPanel = createComponent(TabPanelRoot, {
  Item: [TabPanelItem, { Text, Addon }],
}) as unknown as NSTabPanel.Component;

export const wrapTabPanel = <PropsExtending extends {}>(wrapper: (
  props: Intergalactic.InternalTypings.UntypeRefAndTag<
    Intergalactic.InternalTypings.ComponentPropsNesting<NSTabPanel.WrapperComponent>
  > &
  PropsExtending,
) => React.ReactNode) => wrapper as NSTabPanel.WrapperComponent<PropsExtending>;

export default TabPanel;
