import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetterFn,
  PropsAndRef,
  styled,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import NeighborLocation, {
  INeighborItemProps,
  INeighborLocationProps,
  neighborLocationEnhance,
} from '@semcore/neighbor-location';
import ResizeObserver from 'resize-observer-polyfill';

import style from './style/tab-line.shadow.css';

export type TabLineValue = string | number | boolean;

export interface ITabLineProps<T extends TabLineValue = TabLineValue>
  extends IBoxProps,
    INeighborLocationProps {
  /** TabLine size
   * @default m
   * */
  size?: 'm' | 'l' | 'xl';
  /** Adds a bottom border for the entire component
   * @default true
   * */
  underlined?: boolean;
  /** Is invoked when changing the selection */
  onChange?: (value: T, e?: React.SyntheticEvent<HTMLButtonElement>) => void;
  /** Value of the selected tab */
  value?: T;
}

export interface ITabLineItemProps extends IBoxProps, IKeyboardFocusProps, INeighborItemProps {
  /** Makes a tab selected. This property is determined automatically depending on the value. */
  selected?: boolean;
  /** Disabled state  */
  disabled?: boolean;
  /** Tab value */
  value: TabLineValue;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag  */
  addonRight?: React.ElementType;
}

export interface ITabLineContext {
  getItemProps: PropGetterFn;
}

class TabLineRoot extends Component<ITabLineProps> {
  static displayName = 'TabLine';
  static style = style;
  static defaultProps = {
    defaultValue: null,
    size: 'm',
    underlined: true,
  };

  readonly $observer: ResizeObserver;
  readonly $indicator = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.$observer = new ResizeObserver(this.calculateStylesIndicator);
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
    if (!indicator) return false;
    const tabsParent: HTMLElement = indicator.parentElement;
    const tab = Array.from(tabsParent.querySelectorAll('[data-ui-name="TabLine.Item"]')).find(
      (node: HTMLElement) => node.getAttribute('value') === String(this.asProps.value),
    ) as HTMLElement;
    if (!tab) return false;
    this.$observer.observe(tab);
    const { offsetLeft, offsetWidth } = tab;
    indicator.style.transform = `translateX(${offsetLeft - tabsParent.clientLeft}px)`;
    indicator.style.width = `${offsetWidth}px`;
  };

  componentDidMount() {
    this.calculateStylesIndicator();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.asProps.value) {
      this.$observer.disconnect();
      this.calculateStylesIndicator();
    }
  }

  componentWillUnmount() {
    this.$observer.disconnect();
  }

  getItemProps(props) {
    const { value, size } = this.asProps;
    return {
      size,
      selected: value === props.value,
      onClick: this.bindHandlerClick(props.value),
    };
  }

  render() {
    const { Root: STabLine } = this;
    const SIndicator = 'div';
    const { Children, styles, underlined, controlsLength } = this.asProps;

    return styled(styles)(
      <STabLine render={Box} underlined={underlined}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
        <SIndicator ref={this.$indicator} />
      </STabLine>,
    );
  }
}

function TabLineItem(props: IFunctionProps<ITabLineItemProps>) {
  const {
    Root: STabLineItem,
    Children,
    size,
    disabled,
    selected,
    styles,
    addonLeft,
    addonRight,
    keyboardFocused,
    neighborLocation,
  } = props;

  return styled(styles)(
    <STabLineItem
      render={Box}
      type="button"
      tag="button"
      size={size}
      active={selected}
      disabled={disabled}
      keyboardFocused={keyboardFocused}
      neighborLocation={neighborLocation}
    >
      {addonLeft ? <TabLine.Item.Addon tag={addonLeft} /> : null}
      {addonTextChildren(Children, TabLine.Item.Text, TabLine.Item.Addon)}
      {addonRight ? <TabLine.Item.Addon tag={addonRight} /> : null}
    </STabLineItem>,
  );
}

TabLineItem.enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];

function Text(props: IFunctionProps<IBoxProps>) {
  const { Root: SText, styles } = props;
  return styled(styles)(<SText render={Box} tag="span" />);
}

function Addon(props: IFunctionProps<IBoxProps>) {
  const { Root: SAddon, styles } = props;
  return styled(styles)(<SAddon render={Box} tag="span" />);
}

const TabLine = createComponent<
  TabLineRoot,
  {
    Item: [
      Merge<ITabLineItemProps, HTMLAttributes<HTMLButtonElement>>,
      {
        Text: ComponentProps<typeof Box>;
        Addon: ComponentProps<typeof Box>;
      },
    ];
  },
  Merge<ITabLineContext, ITabLineProps>,
  <T extends TabLineValue = TabLineValue>(
    props: PropsAndRef<
      ITabLineProps<T>,
      ITabLineContext,
      ReturnType<TabLineRoot['uncontrolledProps']>
    >,
  ) => React.ReactElement
>(TabLineRoot, {
  Item: [TabLineItem, { Text, Addon }],
});

export default TabLine;
