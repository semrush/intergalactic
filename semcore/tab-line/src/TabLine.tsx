import { NeighborLocation, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import a11yEnhance from '@semcore/core/lib/utils/enhances/a11yEnhance';
import { Text as SemcoreText } from '@semcore/typography';
import React from 'react';

import style from './style/tab-line.shadow.css';
import type { NSTabLine } from './TabLine.type';

type State = {
  animation: {
    fromLeft: number;
    fromWidth: number;
    toLeft: number;
    toWidth: number;
    started: boolean;
  } | null;
};

class TabLineRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTabLine.Component>,
  typeof TabLineRoot.enhance,
  NSTabLine.Handlers,
  {},
  State
> {
  static displayName = 'TabLine';
  static style = style;
  static defaultProps = {
    defaultValue: null,
    size: 'm',
    underlined: true,
    behavior: 'auto',
  };

  static enhance = [a11yEnhance({
    onNeighborChange: (neighborElement, props) => {
      if (neighborElement) {
        neighborElement.focus();
        if (props.behavior === 'auto') {
          neighborElement.click();
        }
      }
    },
    childSelector: ['role', 'tab'],
  })] as const;

  state: State = { animation: null };
  prevValue: NSTabLine.Props['value'] = undefined;
  itemRefs: Record<string, HTMLDivElement> = {};
  containerRef = React.createRef<HTMLDivElement>();
  animationStartTimeout: ReturnType<typeof setTimeout> | null = null;
  buttonRefsList: Array<React.MutableRefObject<HTMLButtonElement | undefined>> = [];

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  componentDidUpdate() {
    if (
      this.prevValue !== null &&
      this.asProps.value !== null &&
      this.prevValue !== this.asProps.value
    ) {
      this.animate();
    }
    this.prevValue = this.asProps.value;
  }

  componentDidMount() {
    this.prevValue = this.asProps.value;
  }

  componentWillUnmount() {
    if (this.animationStartTimeout) {
      clearTimeout(this.animationStartTimeout);
    }
  }

  animate() {
    if (this.prevValue === undefined || this.asProps.value === undefined) return;

    const fromNode = this.itemRefs[this.prevValue.toString()];
    const toNode = this.itemRefs[this.asProps.value.toString()];
    const containerNode = this.containerRef.current;

    if (!fromNode || !toNode || !containerNode) return;
    const containerRect = containerNode.getBoundingClientRect();
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
    const animation = {
      fromLeft: fromRect.x - containerRect.x,
      fromWidth: fromRect.width,
      toLeft: toRect.x - containerRect.x,
      toWidth: toRect.width,
      started: false,
    };
    this.setState({ animation });

    if (this.animationStartTimeout) {
      clearTimeout(this.animationStartTimeout);
    }

    this.animationStartTimeout = setTimeout(this.handleAnimationStart, 0);
  }

  handleAnimationStart = () => {
    if (this.state.animation?.started === false) {
      this.setState({ animation: { ...this.state.animation, started: true } });
    }
  };

  handleAnimationEnd = () => {
    this.setState({ animation: null });
  };

  bindHandlerClick = (value: NSTabLine.Props['value']) => (e: React.SyntheticEvent) => {
    this.handlers.value(value, e);
  };

  getItemProps(props: NSTabLine.Item.Props, index: number) {
    const { value, size } = this.asProps;
    const isSelected = value === props.value;
    return {
      size,
      'selected': isSelected,
      'onClick': this.bindHandlerClick(props.value),
      'tabIndex': isSelected ? 0 : -1,
      'aria-selected': isSelected,
      'ref': (node: HTMLDivElement) => {
        if (props.value === undefined) return;

        this.itemRefs[props.value.toString()] = node;
      },
      'buttonRefsList': this.buttonRefsList,
      index,
    };
  }

  getItemTextProps(props: NSTabLine.Item.Text.Props, index: number) {
    const { size: tabLineSize } = this.asProps;
    const size = props.size
      ? props.size
      : tabLineSize === 'm' ? 200 : 300;

    return {
      size,
      buttonRefsList: this.buttonRefsList,
      index,
    };
  }

  getCaretProps() {
    const { animation } = this.state;
    if (!animation) return {};
    if (animation.started) {
      return {
        style: {
          left: animation.toLeft,
          width: animation.toWidth,
        },
        onTransitionEnd: this.handleAnimationEnd,
      };
    } else {
      return {
        style: {
          left: animation.fromLeft,
          width: animation.fromWidth,
        },
        onTransitionEnd: this.handleAnimationEnd,
      };
    }
  }

  render() {
    const STabLine = Root;
    const SCaret = Box;
    const { styles, Children, controlsLength } = this.asProps;
    const { animation } = this.state;

    return sstyled(styles)(
      <STabLine render={Box} role='tablist' ref={this.containerRef}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
        {animation && <SCaret {...this.getCaretProps()} />}
      </STabLine>,
    );
  }
}

function TabLineItem(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSTabLine.Item.Component,
    typeof TabLineRoot,
    'Item'
  >,
) {
  const STabLineItem = Root;
  const { Children, styles, addonLeft, addonRight, neighborLocation, buttonRefsList, index } = props;
  const buttonRef = React.useRef<HTMLButtonElement>();

  buttonRefsList[index] = buttonRef;

  return (
    <NeighborLocation.Detect neighborLocation={neighborLocation}>
      {(neighborLocation) =>
        sstyled(styles)(
          <STabLineItem
            render={Box}
            tag='button'
            tabIndex={0}
            neighborLocation={neighborLocation}
            type='button'
            role='tab'
            ref={buttonRef}
          >
            {addonLeft ? <TabLine.Item.Addon tag={addonLeft} /> : null}
            {addonTextChildren(Children, TabLine.Item.Text, TabLine.Item.Addon)}
            {addonRight ? <TabLine.Item.Addon tag={addonRight} /> : null}
          </STabLineItem>,
        )}
    </NeighborLocation.Detect>
  );
}

function Text(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSTabLine.Item.Text.Component,
    typeof TabLineRoot,
    'ItemText'
  >,
) {
  const { styles, ellipsis = true, size, buttonRefsList, index } = props;
  const SText = Root;
  return sstyled(styles)(<SText render={SemcoreText} ellipsis={ellipsis} size={size} hint:triggerRef={buttonRefsList[index]} />);
}

function Addon(
  props: Intergalactic.InternalTypings.InferComponentProps<NSTabLine.Item.Addon.Component>,
) {
  const { styles } = props;
  const SAddon = Root;
  return sstyled(styles)(<SAddon render={Box} tag='span' />);
}

/**
 * TabLine
 *
 * {@link https://developer.semrush.com/intergalactic/components/tab-line/tab-line-api/|API} | {@link https://developer.semrush.com/intergalactic/components/tab-line/tab-line-code/|Examples}
 */
const TabLine = createComponent(TabLineRoot, {
  Item: [TabLineItem, { Text, Addon }],
}) as unknown as NSTabLine.Component;

export const wrapTabLine = <PropsExtending extends {}>(wrapper: (
  props: Intergalactic.InternalTypings.UntypeRefAndTag<
    Intergalactic.InternalTypings.ComponentPropsNesting<NSTabLine.WrapperComponent>
  > &
  PropsExtending,
) => React.ReactNode) => wrapper as NSTabLine.WrapperComponent<PropsExtending>;

export default TabLine;
