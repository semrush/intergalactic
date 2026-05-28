import type { Box, BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

/**
 * DragAndDrop and Draggable containers must have an accessible names (aria-group-name).
 */
type DNDAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

export type DragAndDropProps = BoxProps & {
  /**
   * Controlled drag and drop handler
   */
  onDnD: (dndData: { fromIndex: number; fromId: string; toIndex: number; toId: string }) => void;
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

export type DragAndDropDefaultProps = {
  i18n: LocalizedMessages;
  locale: 'en';
};

export type DraggableProps = BoxProps & {
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

export type DragAndDropContext = {
  getDraggableProps: PropGetterFn;
  getDroppableProps: PropGetterFn;
};

export type DropZoneProps = BoxProps &
  DNDAriaProps & {
    /**
     * Used for add zoneName in a11y hints
     */
    zoneName?: string;
  };

export type DragAndDropComponent = Intergalactic.Component<
  'div',
  DragAndDropProps & DNDAriaProps,
  DragAndDropContext
> & {
  Draggable: Intergalactic.Component<'div', DraggableProps & DNDAriaProps>;
  DropZone: Intergalactic.Component<typeof Box, DropZoneProps>;
};
