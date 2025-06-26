import { Component, createComponent, Root, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import TabLine from '@semcore/tab-line';
import React from 'react';

import style from './tabLine.shadow.css';
import type { TabLineComponent } from './TabLine.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class TabLineAFRoot extends Component {
  static displayName = 'TabLineAF';
  static style = style;

  render() {
    return (<Root render={TabLine} />);
  }
}

class AccentItemRoot extends Component {
  static displayName = 'AccentItem';
  static style = style;

  state = {
    clicked: false,
  };

  handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { onClick } = this.asProps;

    onClick?.(e);
    this.setState({ clicked: false });
    setTimeout(() => {
      this.setState({ clicked: true });
    });
  }

  getAddonProps() {
    return {
      clicked: this.state.clicked,
    };
  }

  render() {
    const SAccentItem = Root;

    return sstyled(this.asProps.styles)(<SAccentItem render={TabLine.Item} onClick={this.handleClick.bind(this)} />);
  }
}

function AccentAddon(props) {
  const { clicked, animatedSparkleCount } = props;

  return (
    <Root render={TabLine.Item.Addon}>
      <SummaryAI color='icon-primary-ai' />
      {animatedSparkleCount && <AnimatedSparkles show={clicked} count={animatedSparkleCount} />}
    </Root>
  );
}

export const TabLineAF = createComponent(TabLineAFRoot, {
  Item: [TabLine.Item, { Text: TabLine.Item.Text, Addon: TabLine.Item.Addon }],
  AccentItem: createComponent(AccentItemRoot, { Text: TabLine.Item.Text, Addon: AccentAddon }),
}) as TabLineComponent;
