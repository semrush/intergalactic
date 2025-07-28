import { useEllipsis, Hint } from '@semcore/base-components';
import { createBaseComponent, Root, sstyled } from '@semcore/core';
import { forkRef } from '@semcore/core/lib/utils/ref';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import { Box } from '@semcore/flex-box';
import React from 'react';

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
  const { color, underline, lineThrough, ellipsis = false, hintProps, children } = props;
  const textDecoration = getTextDecoration(underline, lineThrough);
  const resolveColor = useColorResolver();
  const innerRef = React.useRef(null);

  const showHint = useEllipsis(innerRef, ellipsis === true ? {} : ellipsis);

  return sstyled(styles)(
    <>
      <SText
        render={Box}
        tag='span'
        data-ui-name='Text'
        ref={forkRef(innerRef, ref)}
        use:decoration={textDecoration}
        use:color={resolveColor(color)}
      />
      {showHint && <Hint triggerRef={innerRef} {...hintProps}>{children}</Hint>}
    </>,
  );
}

Text.displayName = 'Text';

export default createBaseComponent(Text);
