import type { NSButton } from '@semcore/button';
import Button from '@semcore/button';
import { createComponent, Root, sstyled, Component, type IRootNodeProps } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

import style from './button.shadow.css';
import type { HighLightedButtonAddonProps, HighlightedButtonComponent, HighlightedButtonDefaultProps } from './Button.type';
import { AnimatedSparkles } from '../../inner-components/sparkle/AnimatedSparkles';

/*
 * `highlighted` is an internal-only value and cannot be represented in the public prop type.
 * During composition the `highlighted` prop is intentionally stripped, so it never reaches
 * the final component interface. Because of that, this implementation relies on the current approach.
 * Public props are `ButtonProps`.
*/
type HighlightedButtonProps = Omit<NSButton.Props, 'theme'> & {
  theme?: NSButton.Props['theme'] | 'highlighted';
};

class ButtonFHRoot extends Component<
  HighlightedButtonProps,
  [],
  {},
  {},
  {},
  HighlightedButtonDefaultProps
> {
  static displayName = 'ButtonFH';
  static style = style;

  static defaultProps = {
    theme: 'highlighted',
  } as const;

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

/**
 * Button FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#button|Docs}
 */
export const ButtonFH = createComponent<
  HighlightedButtonComponent,
  typeof ButtonFHRoot
>(ButtonFHRoot, {
  Addon: HighlightAddon,
  Text: Button.Text,
});
