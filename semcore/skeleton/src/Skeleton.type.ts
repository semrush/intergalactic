import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { UniqueIDProps } from '@semcore/core/lib/utils/uniqueID';

declare namespace NSSkeleton {
  type Props = NSBox.Props & UniqueIDProps & {
    /**
     *  Skeleton visibility control property
     */
    hidden?: boolean;
    /**
     * Animation speed in ms
     * @default 2000
     */
    duration?: string | number;
    /**
     * Skeleton theme
     * @default invert
     */
    theme?: 'dark' | 'invert';
    /** Specifies the locale for i18n support */
    locale?: string;
    /**
     * Enable ResizeObserver for parent Element to recalculate skeleton size.
     * @default false
     */
    observeParentSize?: boolean;
  };
  type Ctx = {
    gradientUrl: string;
  };

  type DefaultProps = {
    theme?: 'invert';
    duration: 2000;
  };

  namespace Text {
    type Props = NSBox.Props & {
      // TODO: It looks like it should be number (def. not a string...)
      /**
       * Number of items to be returned
       * @default 1
       */
      amount?: string | number;
    };

    type Component = Intergalactic.Component<'rect', Props>;
  }

  type RenderComponent = Intergalactic.Component<'div', Props, Ctx>;

  type Component = Intergalactic.Component<'svg', Props, Ctx> & {
    Text: Text.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type SkeletonProps = NSSkeleton.Props;
/** @deprecated It will be removed in v18. */
export type SkeletonCtx = NSSkeleton.Ctx;
/** @deprecated It will be removed in v18. */
export type SkeletonTextProps = NSSkeleton.Text.Props;

export type { NSSkeleton };
