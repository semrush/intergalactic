import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import isNode from '@semcore/utils/lib/isNode';
import Text, { ITextProps } from '../Text';

import style from './style/typography-blockquote.shadow.css';

export interface IBlockquoteProps extends ITextProps {
  /** Source of the quote */
  author?: React.ReactNode;
}

class RootBlockquote extends Component<IBlockquoteProps> {
  static displayName = 'Blockquote';
  static style = style;

  render() {
    const SBlockquote = Text;
    const SAuthor = Text;
    const SDoubleQuotation = 'span';
    const { styles, forwardRef, children, author: authorProp, ...other } = this.asProps;

    return styled(styles)(
      <SBlockquote tag="blockquote" size={400} ref={forwardRef} {...other}>
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
}

export default createComponent<Merge<IBlockquoteProps, HTMLAttributes<HTMLElement>>>(
  RootBlockquote,
);
