import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
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
  const SText = Box;
  const { color, underline, lineThrough } = props;
  const textDecoration = getTextDecoration(underline, lineThrough);

  return sstyled(styles)(
    <SText
      ref={ref}
      tag="span"
      data-ui-name="Text"
      use:decoration={textDecoration}
      use:color={resolveColor(color)}
      {...props}
    />,
  );
}

Text.displayName = 'Text';

export default createBaseComponent(Text);
