import { ReturnEl, CProps, PropGetterFn } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface IDragAndDropProps extends IBoxProps {
  /**
   * DragAndDrop theme
   * @default default
   */
  theme?: 'default' | 'dark';
  /**
   * The function is responsible for changing the location of the draggable elements upon hovering the elements over each other.
   * @default (draggableNode, droppableNode) => void
   */
  onSwapDraggable?: (draggableNode: React.ReactNode, droppableNode: React.ReactNode) => void;
  /**
   * The function is responsible for inserting the draggable element into the droppable zone
   * @default (draggableNode, droppableNode) => void
   */
  onInsertDroppable?: (draggableNode: React.ReactNode, droppableNode: React.ReactNode) => void;
}

export interface IDraggableProps extends IBoxProps {
  /** In charge of placement in relation to the content
   * @default right
   * */
  placement?: 'top' | 'right' | 'bottom' | 'left' | false;
  /** In charge of the component’s ability to be dragged
   * @default false
   * */
  noDrop?: boolean;
  /**@ignore*/
  $eventEmitter?: EventEmitter;
}

export interface IDragAndDropContext {
  getDraggableProps: PropGetterFn;
  getDroppableProps: PropGetterFn;
}

declare const DragAndDrop: (<T>(
  props: CProps<IDragAndDropProps, IDragAndDropContext> & T,
) => ReturnEl) & {
  Draggable: <T>(props: CProps<IDraggableProps> & T) => ReturnEl;
  Droppable: typeof Box;
};

export default DragAndDrop;
