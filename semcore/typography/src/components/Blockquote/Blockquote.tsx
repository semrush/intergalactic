import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, Root, sstyled } from '@semcore/core';
import isNode from '@semcore/core/lib/utils/isNode';
import React from 'react';

import type { NSBlockquote } from './Blockquote.type';
import styles from '../../style/blockquote.shadow.css';

function BlockquoteRoot(
  props: Intergalactic.InternalTypings.InferComponentProps<NSBlockquote.Component>,
  ref: React.ForwardedRef<HTMLQuoteElement>,
) {
  const SBlockquote = Root;
  const SDoubleQuotation = 'span';
  const SAuthor = 'cite';
  const { author, children } = props;

  return sstyled(styles)(
    <SBlockquote render={Box} tag='blockquote' ref={ref}>
      <SDoubleQuotation>“</SDoubleQuotation>
      <span>
        {children as React.ReactNode}
        {isNode(author) && <SAuthor>{author}</SAuthor>}
      </span>
    </SBlockquote>,
  );
}

BlockquoteRoot.displayName = 'Blockquote';

/**
 * Blockquote
 *
 * {@link https://developer.semrush.com/intergalactic/style/typography/typography-api#blockquote|Api} | {@link https://developer.semrush.com/intergalactic/style/typography/typography-code|Examples}
 */
const Blockquote = createBaseComponent(BlockquoteRoot) as NSBlockquote.Component;

export default Blockquote;
