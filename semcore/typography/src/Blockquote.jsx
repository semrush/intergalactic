import React from 'react';
import { createBaseComponent, Root, sstyled } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';
import { Box } from '@semcore/flex-box';

import styles from './style/blockquote.shadow.css';

function Blockquote(props, ref) {
  const SBlockquote = Root;
  const SDoubleQuotation = 'span';
  const SAuthor = 'cite';
  const { children, author } = props;

  return sstyled(styles)(
    <SBlockquote render={Box} tag="blockquote" ref={ref}>
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
