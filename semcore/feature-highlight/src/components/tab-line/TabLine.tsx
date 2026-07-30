import type { Intergalactic } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import TabLine from '@semcore/tab-line';
import React from 'react';

import style from './tabLine.shadow.css';
import type { NSTabLineFH } from './TabLine.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class TabLineFHRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTabLineFH.Component>
> {
  static displayName = 'TabLineFH';
  static style = style;

  render() {
    return (<Root render={TabLine} />);
  }
}

class HighlightedItemRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSTabLineFH.HighlightedItem.Component>
> {
  static displayName = 'HighlightedItem';
  static style = style;

  state = {
    clicked: false,
  };

  handleClick(e: React.MouseEvent<HTMLDivElement>) {
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
    const SHighlightedItem = Root;

    return sstyled(this.asProps.styles)(<SHighlightedItem render={TabLine.Item} onClick={this.handleClick.bind(this)} />);
  }
}

function HighlightedAddon(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSTabLineFH.HighlightedItem.Addon.Component,
    typeof HighlightedItemRoot,
    'Addon'
  >,
) {
  const { clicked, animatedSparkleCount, Children, children: hasChildren } = props;

  return (
    <Root render={TabLine.Item.Addon}>
      {hasChildren
        ? (<Children />)
        : (
            <>
              <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
              <AnimatedSparkles show={clicked} count={animatedSparkleCount} />
            </>
          )}
    </Root>
  );
}

const HighlightedItem = createComponent<NSTabLineFH.HighlightedItem.Component, typeof HighlightedItemRoot>(
  HighlightedItemRoot,
  { Text: TabLine.Item.Text, Addon: HighlightedAddon },
);

/**
 * TabLine FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#tabline|Docs}
 */
export const TabLineFH = createComponent<NSTabLineFH.Component, typeof TabLineFHRoot>(TabLineFHRoot, {
  Item: [TabLine.Item, { Text: TabLine.Item.Text, Addon: TabLine.Item.Addon }],
  HighlightedItem,
});
