import { Box } from '@semcore/base-components';
import { createBaseComponent, Root, sstyled } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import styles from './style/blockquote.shadow.css';

function Blockquote(props, ref) {
  const SBlockquote = Root;
  const SDoubleQuotation = 'span';
  const SAuthor = 'cite';
  const { children, author } = props;

  return sstyled(styles)(
    <SBlockquote render={Box} tag='blockquote' ref={ref}>
      <SDoubleQuotation>“</SDoubleQuotation>
      <span>
        {children}
        {isNode(author) && <SAuthor>{author}</SAuthor>}
      </span>
    </SBlockquote>,
  );
}

Blockquote.displayName = 'Blockquote';

export default createBaseComponent(Blockquote);
