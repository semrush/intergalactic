import Button from '@semcore/button';
import { createComponent, Root, sstyled, Component, type IRootNodeProps } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './button.shadow.css';
import type { HighLightedButtonAddonProps, HighlightedButtonComponent } from './Button.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

class ButtonFHRoot extends Component {
  static displayName = 'ButtonFH';
  static style = style;

  static defaultProps = {
    theme: 'highlighted',
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

  getAddonProps() {
    return {
      clicked: this.state.clicked,
    };
  }

  render() {
    const { styles } = this.asProps;
    const SHighlightedButton = Root;
    return sstyled(styles)(
      <SHighlightedButton render={Button} use:onClick={this.handleClick.bind(this)} />,
    );
  }
}

function HighlightAddon(props: HighLightedButtonAddonProps & { clicked: boolean } & IRootNodeProps) {
  const SAddon = Root;
  const { clicked, animatedSparkleCount, Children, children: hasChildren } = props;
  return sstyled(props.styles)(
    <SAddon render={Button.Addon}>
      {hasChildren
        ? (<Children />)
        : (
            <>
              <SummaryAI />
              <AnimatedSparkles show={clicked} count={animatedSparkleCount} />
            </>
          )}
    </SAddon>,
  );
}

export const ButtonFH = createComponent(ButtonFHRoot, {
  Addon: HighlightAddon,
  Text: Button.Text,
}) as HighlightedButtonComponent;
