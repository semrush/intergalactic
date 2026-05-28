import type { IRootComponentProps } from '@semcore/core';
import { createComponent, Root, Component, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Pills from '@semcore/pills';
import React from 'react';

import style from './pills.shadow.css';
import type { HighlightedItemAddonProps, HighlightedPillComponent, HighlightedPillItemComponent } from './Pills.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class PillsFHRoot extends Component {
  static displayName = 'PillsFH';
  static style = style;

  render() {
    return (<Root render={Pills} />);
  }
}

class HighlightedItemRoot extends Component {
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
    const SHighlightedPill = Root;

    return sstyled(this.asProps.styles)(<SHighlightedPill render={Pills.Item} onClick={this.handleClick.bind(this)} />);
  }
}

function HighlightedItemAddon(props: HighlightedItemAddonProps & { clicked: boolean } & IRootComponentProps) {
  const { clicked, animatedSparkleCount, Children, children } = props;
  return (
    <Root render={Pills.Item.Addon}>
      {children !== undefined
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

const HighlightedItem = createComponent<
  HighlightedPillItemComponent,
  typeof HighlightedItemRoot
>(HighlightedItemRoot, {
  Text: Pills.Item.Text,
  Addon: HighlightedItemAddon,
});

/**
 * Pills FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#pills|Docs}
 */
export const PillsFH = createComponent<
  HighlightedPillComponent,
  typeof PillsFHRoot
>(PillsFHRoot, {
  Item: Pills.Item,
  HighlightedItem,
});
