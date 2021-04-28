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

export type TabPanelValue = string | number | boolean;

export interface ITabPanelProps<T extends TabPanelValue = TabPanelValue>
  extends IBoxProps {
  /** Is invoked when changing the selection */
  onChange?: (value: T, e?: React.SyntheticEvent<HTMLButtonElement>) => void;
  /** Value of the selected tab */
  value?: T;
}

export interface ITabPanelItemProps extends IBoxProps, IKeyboardFocusProps {
  /** Makes a tab selected. This property is determined automatically depending on the value. */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Left addon tag  */
  addonLeft?: React.ElementType;
  /** Right addon tag  */
  addonRight?: React.ElementType;
}

export interface ITabPanelContext {
  getItemProps: PropGetterFn;
}

const optionsA11yEnhance = {
  onNeighborChange: (neighborElement) => {
    if (neighborElement) {
      neighborElement.focus();
      neighborElement.click();
    }
  },
  childSelector: ['role', 'tab'],
};

class TabPanelRoot extends Component<ITabPanelProps> {
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

function TabPanelItem(props: IFunctionProps<ITabPanelItemProps>) {
  const STabPanelItem = Root;
  const { Children, styles, selected, addonLeft, addonRight } = props;

  return sstyled(styles)(
    <STabPanelItem
      render={Box}
      type="button"
      tag="button"
      role="tab"
      active={selected}
    >
      {addonLeft ? <TabPanel.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabPanel.Item.Text, TabPanel.Item.Addon)}
      {addonRight ? <TabPanel.Item.Addon tag={addonRight} /> : null}
    </STabPanelItem>
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

const TabPanel = createComponent<
  TabPanelRoot,
  {
    Item: [
      Merge<ITabPanelItemProps, HTMLAttributes<HTMLButtonElement>>,
      {
        Text: ComponentProps<typeof Box>;
        Addon: ComponentProps<typeof Box>;
      }
    ];
  },
  ITabPanelContext,
  <T extends TabPanelValue = TabPanelValue>(
    props: PropsAndRef<
      ITabPanelProps<T>,
      ITabPanelContext,
      ReturnType<TabPanelRoot['uncontrolledProps']>
    >
  ) => React.ReactElement
>(TabPanelRoot, {
  Item: [TabPanelItem, { Text, Addon }],
});

export default TabPanel;
