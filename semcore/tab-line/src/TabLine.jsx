import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import a11yEnhance from '@semcore/utils/lib/enhances/a11yEnhance';
import NeighborLocation from '@semcore/neighbor-location';

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
  state = { animation: null };
  itemRefs = {};
  containerRef = React.createRef();
  animationStartTimeout = -1;

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.value !== null &&
      this.props.value !== null &&
      prevProps.value !== this.props.value
    ) {
      const fromNode = this.itemRefs[prevProps.value];
      const toNode = this.itemRefs[this.props.value];
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
      clearTimeout(this.animationStartTimeout);
      this.animationStartTimeout = setTimeout(this.handleAnimationStart, 0);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.animationStartTimeout);
  }

  handleAnimationStart = () => {
    if (this.state.animation?.started === false) {
      this.setState({ animation: { ...this.state.animation, started: true } });
    }
  };
  handleAnimationEnd = () => {
    this.setState({ animation: null });
  };

  bindHandlerClick = (value) => (e) => {
    this.handlers.value(value, e);
  };

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
      ref: (node) => (this.itemRefs[props.value] = node),
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
    const SCaret = 'div';
    const { styles, Children, controlsLength } = this.asProps;
    const { animation } = this.state;

    return sstyled(styles)(
      <STabLine render={Box} role="tablist" ref={this.containerRef}>
        <NeighborLocation controlsLength={controlsLength}>
          <Children />
        </NeighborLocation>
        {animation && <SCaret {...this.getCaretProps()} />}
      </STabLine>,
    );
  }
}

function TabLineItem(props) {
  const STabLineItem = Root;
  const { Children, styles, addonLeft, addonRight, neighborLocation } = props;

  return (
    <NeighborLocation.Detect neighborLocation={neighborLocation}>
      {(neighborLocation) =>
        sstyled(styles)(
          <STabLineItem
            render={Box}
            tag="button"
            neighborLocation={neighborLocation}
            type="button"
            role="tab"
          >
            {addonLeft ? <TabLine.Item.Addon tag={addonLeft} /> : null}
            {addonTextChildren(Children, TabLine.Item.Text, TabLine.Item.Addon)}
            {addonRight ? <TabLine.Item.Addon tag={addonRight} /> : null}
          </STabLineItem>,
        )
      }
    </NeighborLocation.Detect>
  );
}

TabLineItem.enhance = [keyboardFocusEnhance()];

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
