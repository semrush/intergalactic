import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

export type BlockquoteProps = BoxProps & {
  /** Source of the quote */
  author?: React.ReactNode;
};

export type BlockquoteComponent = Intergalactic.Component<'blockquote', BlockquoteProps, {}, []>;
