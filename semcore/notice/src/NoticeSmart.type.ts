import type { Intergalactic } from '@semcore/core';

import type { NSNotice } from './Notice.type';

declare namespace NSNoticeSmart {
  type Props = NSNotice.Props & {
    /**
     * A custom element for additional information
     */
    label?: React.ReactNode;

    /**
     * A custom element for title
     */
    title?: React.ReactNode;

    /**
     * Custom action element
     */
    actions?: React.ReactNode;

    /** A custom element for text */
    text?: React.ReactNode;
    /**
     *  Adds a Close button
     */
    closable?: boolean;
    /**
     * Callback on a click on the close button
     */
    onClose?: (event: React.SyntheticEvent) => void;
  };
  type DefaultProps = {
    theme: 'info';
  };

  type Component = (
    props: Intergalactic.InternalTypings.EfficientOmit<
      Intergalactic.InternalTypings.ComponentProps<'div', 'div', Props>,
      'children'
    >,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults &
    Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type NoticeSmartProps = NSNoticeSmart.Props;

export type { NSNoticeSmart };
