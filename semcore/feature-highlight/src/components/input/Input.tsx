import type { IRootComponentProps } from '@semcore/core';
import { AbstractComponent, createComponent, Root, sstyled } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Input from '@semcore/input';
import React from 'react';

import style from './input.shadow.css';

class InputFHRoot extends AbstractComponent {
  static displayName = 'InputFH';
  static style = style;

  render() {
    const SHighlightedInput = Root();
    return sstyled(this.asProps.styles)(
      <SHighlightedInput render={Input} />,
    );
  }
}

function HighlightAddon(props: IRootComponentProps) {
  const { Children, children: hasChildren } = props;
  const SRoot = Root();
  return (
    <SRoot render={Input.Addon}>
      {hasChildren ? (<Children />) : (<SummaryAI color='--intergalactic-icon-primary-feature-highlight' />)}
    </SRoot>
  );
}

export const InputFH = createComponent(InputFHRoot, {
  Addon: HighlightAddon,
  Value: Input.Value,
});
