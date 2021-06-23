import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';
import Text from './Text';

import styles from './style/blockquote.shadow.css';

function Blockquote(props, ref) {
  const SBlockquote = Text;
  const SAuthor = Text;
  const SDoubleQuotation = 'span';
  const { children, author: authorProp, ...other } = props;

  return sstyled(styles)(
    <SBlockquote tag="blockquote" size={400} ref={ref} {...other}>
      <SDoubleQuotation>“</SDoubleQuotation>
      <span>
        {children}
        {isNode(authorProp) && (
          <SAuthor tag="cite" size={200}>
            {authorProp}
          </SAuthor>
        )}
      </span>
    </SBlockquote>,
  );
}

Blockquote.displayName = 'Blockquote';

export default createBaseComponent(Blockquote);
