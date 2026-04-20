import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSBlockquote {
  type Props = BoxProps & {
  /** Source of the quote */
    author?: React.ReactNode;
  };

  type Component = Intergalactic.Component<'blockquote', Props>;
}

/** @deprecated It will be removed in v18. */
export type BlockquoteProps = NSBlockquote.Props;

export type { NSBlockquote };
