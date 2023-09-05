import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface IDragAndDropProps extends DragAndDropProps, UnknownProperties {}
export type DragAndDropProps = BoxProps & {
  /**
   * @deprecated don't use this prop
   */
  theme?: 'dark' | 'default';
  /**
   * @deprecated use `onDnD` instead
   */
  onSwapDraggable?: (draggableNode: React.ReactNode, droppableNode: React.ReactNode) => void;
  /**
   * @deprecated use `onDnD` instead
   */
  onInsertDroppable?: (draggableNode: React.ReactNode, droppableNode: React.ReactNode) => void;
  /**
   * Controlled drag and drop handler
   */
  onDnD: (dndData: { fromIndex: number; fromId: string; toIndex: number; toId: string }) => void;
  /**
   * Index of id that indicates item that is currently under the user focus in case of real browser focus cannot be used.
   * When provided, drag and drop listens to whole page keyboard events. Doesn't provide `onCustomFocusChange` callback.
   */
  customFocus?: number | string;
  locale?: string;
};

/** @deprecated */
export interface IDraggableProps extends DraggableProps, UnknownProperties {}
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
};

/** @deprecated */
export interface IDragAndDropContext extends DragAndDropContext, UnknownProperties {}
export type DragAndDropContext = {
  getDraggableProps: PropGetterFn;
  getDroppableProps: PropGetterFn;
};

declare const DragAndDrop: Intergalactic.Component<'div', DragAndDropProps, DragAndDropContext> & {
  Draggable: Intergalactic.Component<'div', DraggableProps>;
  DropZone: typeof Box;
  /** @deprecated use `DragAndDrop.DropZone` instead */
  Droppable: typeof Box;
};

export default DragAndDrop;
