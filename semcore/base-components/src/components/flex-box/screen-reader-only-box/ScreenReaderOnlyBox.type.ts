import type { Intergalactic } from '@semcore/core';

declare namespace NSScreenReaderOnly {
    type Props = {
      ariaLive?: boolean;
      children?: React.ReactNode;
    };

    type Component = Intergalactic.Component<'span', Props>;
}

export type { NSScreenReaderOnly };
