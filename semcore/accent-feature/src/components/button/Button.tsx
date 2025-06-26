import Button from '@semcore/button';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './button.shadow.css';
import type { ButtonAccentAddonProps, ButtonAccentComponent } from './Button.type';
import { Sparkle } from '../../inner-components/sparkle';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class ButtonAFRoot extends Component {
  static displayName = 'ButtonAF';
  static style = style;

  static defaultProps = {
    theme: 'ai',
  };

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

  getAccentAddonProps() {
    return {
      clicked: this.state.clicked,
    };
  }

  render() {
    const { styles } = this.asProps;
    const SButton = Root;
    return sstyled(styles)(
      <SButton render={Button} use:onClick={this.handleClick.bind(this)} />,
    );
  }
}

function AccentAddon(props: ButtonAccentAddonProps & { clicked: boolean }) {
  const SAddon = Root;
  const { clicked, animatedSparkleCount } = props;
  return sstyled(props.styles)(
    <SAddon render={Button.Addon}>
      <SummaryAI color='icon-primary-ai' />
      {animatedSparkleCount && <AnimatedSparkles show={clicked} count={animatedSparkleCount} />}
    </SAddon>,
  );
}

export const ButtonAF = createComponent(ButtonAFRoot, {
  Addon: Button.Addon,
  Text: Button.Text,
  AccentAddon,
}) as ButtonAccentComponent;
