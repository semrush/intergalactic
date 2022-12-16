import { ReturnEl, CProps, PropGetterFn } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface IDragAndDropProps extends IBoxProps {
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
  locale?: string;
}

export interface IDraggableProps extends IBoxProps {
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
}

export interface IDragAndDropContext {
  getDraggableProps: PropGetterFn;
  getDroppableProps: PropGetterFn;
}

declare const DragAndDrop: (<T>(
  props: CProps<IDragAndDropProps, IDragAndDropContext> & T,
) => ReturnEl) & {
  Draggable: <T>(props: CProps<IDraggableProps> & T) => ReturnEl;
  DropZone: typeof Box;
  /** @deprecated use `DragAndDrop.DropZone` instead */
  Droppable: typeof Box;
};

export default DragAndDrop;
