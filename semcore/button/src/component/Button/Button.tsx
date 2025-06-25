import { Sparkle } from '@semcore/base-components';
import { createComponent, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './button.shadow.css';
import type { ButtonAddonProps, ButtonAiAddonProps, ButtonComponent, ButtonTextProps } from './Button.type';
import { AbstractButton } from '../AbstractButton/AbstractButton';

class RootButton extends AbstractButton {
  static displayName = 'Button';
  static style = style;
  static defaultProps = {
    use: 'secondary',
    size: 'm',
  };

  protected getTextColor(): string | undefined {
    return undefined;
  }

  getAiAddonProps(props: { animatedSparkleCount?: number }) {
    const { clicked } = this.state;
    return {
      animatedSparkleCount: props.animatedSparkleCount,
      clicked,
    };
  }
}

function Text(props: ButtonTextProps) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props: ButtonAddonProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

function AiAddon(props: ButtonAiAddonProps & { clicked: boolean }) {
  const SAddon = Root;
  const { clicked, animatedSparkleCount } = props;
  return sstyled(props.styles)(
    <SAddon render={Button.Addon}>
      <SummaryAI color='icon-primary-ai' />
      {clicked && animatedSparkleCount && [...new Array(animatedSparkleCount)].map((_, index) => {
        return (
          <Sparkle key={index} index={index} num={animatedSparkleCount} />
        );
      })}
    </SAddon>,
  );
}

const Button = createComponent(RootButton, {
  Text,
  Addon,
  AiAddon,
}) as ButtonComponent;

export default Button;
