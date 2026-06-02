import type { IRootComponentProps } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Input from '@semcore/input';
import React from 'react';

import style from './input.shadow.css';

class InputFHRoot extends Component {
  static displayName = 'InputFH';
  static style = style;

  render() {
    const SHighlightedInput = Root;
    return sstyled(this.asProps.styles)(
      <SHighlightedInput render={Input} />,
    );
  }
}

function HighlightAddon(props: IRootComponentProps) {
  const { Children, children: hasChildren } = props;
  return (
    <Root render={Input.Addon}>
      {hasChildren ? (<Children />) : (<SummaryAI color='--intergalactic-icon-primary-feature-highlight' />)}
    </Root>
  );
}

/**
 * Input FeatureHighlight
 *
 * {@link https://developer.semrush.com/intergalactic/patterns/feature-highlight/feature-highlight#input|Docs}
 */
export const InputFH = createComponent<
  typeof Input,
  typeof InputFHRoot
>(InputFHRoot, {
  Addon: HighlightAddon,
  Value: Input.Value,
});
