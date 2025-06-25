import { createComponent, Root, Component, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Pills from '@semcore/pills';
import React from 'react';

import style from './pills.shadow.css';
import type { AccentItemAddonProps, PillAccentComponent } from './Pills.type';
import { Sparkle } from '../../inner-components/sparkle';

class PillsAFRoot extends Component {
  static displayName = 'PillsAF';
  static style = style;

  render() {
    return (<Root render={Pills} />);
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
    const SAccentPill = Root;

    return sstyled(style)(<SAccentPill render={Pills.Item} onClick={this.handleClick.bind(this)} />);
  }
}

function AccentItemAddon(props: AccentItemAddonProps & { clicked: boolean }) {
  const { clicked, animatedSparkleCount } = props;
  return (
    <Pills.Item.Addon>
      <SummaryAI color='icon-primary-ai' />
      {clicked && animatedSparkleCount && [...new Array(animatedSparkleCount)].map((_, index) => {
        return (
          <Sparkle key={index} index={index} num={animatedSparkleCount} />
        );
      })}
    </Pills.Item.Addon>
  );
}

export const PillsAF = createComponent(PillsAFRoot, {
  Item: Pills.Item,
  AccentItem: createComponent(AccentItemRoot, { Text: Pills.Item.Text, Addon: AccentItemAddon }),
}) as PillAccentComponent;
