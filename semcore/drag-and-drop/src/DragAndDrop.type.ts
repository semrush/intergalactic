import type { Box, BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSDragAndDrop {
  type Props = BoxProps &
    NSDragAndDrop.AriaProps & {
      /**
       * Controlled drag and drop handler
       */
      onDnD: (dndData: { fromIndex: number; fromId: NSDragAndDrop.AttachDetails['id']; toIndex: number; toId: NSDragAndDrop.AttachDetails['id'] }) => void;
      /**
       * Index of id that indicates item that is currently under the user focus in case of real browser focus cannot be used.
       * When provided, drag and drop listens to whole page keyboard events. Doesn't provide `onCustomFocusChange` callback.
       */
      customFocus?: number | string;
      /** Specifies the locale for i18n support */
      locale?: string;
      /**
       * Ref to a scrollable container, if exists
       */
      scrollableContainerRef?: React.MutableRefObject<HTMLElement | null>;
    };
  type DefaultProps = {
    i18n: LocalizedMessages;
    locale: 'en';
  };
  /**
   * DragAndDrop and Draggable containers must have an accessible names (aria-group-name).
   */
  type AriaProps = Intergalactic.RequireAtLeastOne<{
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'title'?: string;
  }>;
  type State = {
    items: Array<Omit<NSDragAndDrop.AttachDetails, 'index'> | undefined>;
    dragging: null | {
      index: number;
      initialItemsRects: Array<{ x: number; y: number; width: number; height: number } | undefined>;
      placeholder: HTMLElement | null;
    };
    dragOver: number | null;
    hideHoverEffect: boolean;
    a11yHint: string | null;
    keyboardDraggingIndex: number | null;
    animatedScaling: number | null;
    reversedScaling: boolean;
  };
  type Ctx = {
    getDraggableProps: PropGetterFn;
    getDroppableProps: PropGetterFn;
  };
  type AttachDetails = {
    index: number;
    children: React.ReactNode;
    node: HTMLElement;
    id?: string;
    draggingAllowed: boolean;
    isDropZone?: boolean;
    zoneName?: string;
  };

  namespace Draggable {
    type Props = BoxProps &
      NSDragAndDrop.AriaProps & {
        /** Placement of visual drag-and-drop marker
         * @default right
         * */
        placement?: 'top' | 'right' | 'bottom' | 'left' | false;
        /** Disabled DropZone abilities of component
         * @default false
         * */
        noDrop?: boolean;
        /**
         * Used as `fromId` or `toId` in `onDnD` handler.
         */
        id?: string;
        /**
         * Used for add zoneName in a11y hints
         */
        zoneName?: string;
        /**
         * Flag for disable keyboardFocused style form DnD.Draggable element
         */
        isCustomFocus?: boolean;
      };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace DropZone {
    type Props = BoxProps &
      NSDragAndDrop.AriaProps & {
        /**
         * Used for add zoneName in a11y hints
         */
        zoneName?: string;
      };

    type Component = Intergalactic.Component<typeof Box, Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Draggable: Draggable.Component;
    DropZone: DropZone.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type DragAndDropProps = NSDragAndDrop.Props;
/** @deprecated It will be removed in v18. */
export type DragAndDropDefaultProps = NSDragAndDrop.DefaultProps;
/** @deprecated It will be removed in v18. */
export type DraggableProps = NSDragAndDrop.Draggable.Props;
/** @deprecated It will be removed in v18. */
export type DragAndDropContext = NSDragAndDrop.Ctx;
/** @deprecated It will be removed in v18. */
export type DropZoneProps = NSDragAndDrop.DropZone.Props;
/** @deprecated It will be removed in v18. */
export type DragAndDropComponent = NSDragAndDrop.Component;

export type { NSDragAndDrop };
