import type { IRootComponentProps } from '@semcore/core';
import { AbstractComponent, createComponent, Root, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import TabLine from '@semcore/tab-line';
import React from 'react';

import style from './tabLine.shadow.css';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class TabLineFHRoot extends AbstractComponent {
  static displayName = 'TabLineFH';
  static style = style;

  render() {
    const SRoot = Root();
    return (<SRoot render={TabLine} />);
  }
}

class HighlightedItemRoot extends AbstractComponent {
  static displayName = 'HighlightedItem';
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
    const SHighlightedItem = Root();

    return sstyled(this.asProps.styles)(<SHighlightedItem render={TabLine.Item} onClick={this.handleClick.bind(this)} />);
  }
}

function HighlightedAddon(props: { animatedSparkleCount?: number; clicked: boolean } & IRootComponentProps) {
  const { clicked, animatedSparkleCount, Children, children: hasChildren } = props;
  const SRoot = Root();
  return (
    <SRoot render={TabLine.Item.Addon}>
      {hasChildren
        ? (<Children />)
        : (
            <>
              <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
              <AnimatedSparkles show={clicked} count={animatedSparkleCount} />
            </>
          )}
    </SRoot>
  );
}

export const TabLineFH = createComponent(TabLineFHRoot, {
  Item: [TabLine.Item, { Text: TabLine.Item.Text, Addon: TabLine.Item.Addon }],
  HighlightedItem: createComponent(HighlightedItemRoot, { Text: TabLine.Item.Text, Addon: HighlightedAddon }),
});
