import React from 'react';
import { createBaseComponent, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import styles from './style/text.shadow.css';

function getTextDecoration(underline, lineThrough) {
  if (underline) {
    return 'underline';
  }

  if (lineThrough) {
    return 'line-through';
  }
}

function Text(props, ref) {
  const SText = Root;
  const { color, underline, lineThrough } = props;
  const textDecoration = getTextDecoration(underline, lineThrough);

  return sstyled(styles)(
    <SText
      render={Box}
      tag="span"
      data-ui-name="Text"
      ref={ref}
      use:decoration={textDecoration}
      use:color={resolveColor(color)}
    />,
  );
}

Text.displayName = 'Text';

export default createBaseComponent(Text);
