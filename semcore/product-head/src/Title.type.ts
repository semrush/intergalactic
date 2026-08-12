import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSProductHeadTitle {
    type Props = NSBox.Props & {
      /** A tool name that appears as part of the header title */
      toolName?: React.ReactNode;
    };

    namespace Tool {
        type Component = NSBox.Component;
    }

    type Component = Intergalactic.Component<'h1', Props> & {
      Tool: Tool.Component;
    };
}

/** @deprecated It will be removed in v19. */
export type HeaderTitleProps = NSProductHeadTitle.Props;

export type { NSProductHeadTitle };
