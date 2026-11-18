import { Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import * as React from 'react';

class YAxisComponent extends Component {
  render() {
    const SYAxis = Root;

    return sstyled({})(
      <SYAxis render={Box}>here will be axis values</SYAxis>,
    );
  }
}

export const YAxis = createComponent<typeof YAxisComponent>(YAxisComponent);
