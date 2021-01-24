import React, { HTMLAttributes } from 'react';
import createComponent, { styled, Component, PropGetter, Merge } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import EventEmitter from '@semcore/utils/lib/eventEmitter';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

import style from './style/drag-and-drop.shadow.css';

const onSwapDraggableInner = function (draggableNode, droppableNode) {
  if (!draggableNode || !droppableNode) return false;

  const parent = droppableNode.parentNode;
  const nextElement =
    droppableNode === draggableNode.nextElementSibling
      ? droppableNode.nextElementSibling
      : droppableNode;

  parent.insertBefore(draggableNode, nextElement);
};

const onInsertDroppableInner = (draggableNode, droppableNode) => {
  if (!draggableNode || !droppableNode) return false;
  if (draggableNode.parentNode !== droppableNode) {
    droppableNode.appendChild(draggableNode);
  }
};

function getChildNumber(node) {
  if (!node) return;
  return Array.prototype.indexOf.call(node.parentNode.children, node);
}

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
  eventEmitter?: EventEmitter;
}

export interface IDragAndDropContext {
  getDraggableProps: PropGetter<DragAndDropRoot['getDraggableProps']>;
  getDroppableProps: PropGetter<DragAndDropRoot['getDroppableProps']>;
}

interface IDragAndDropState {
  offsets?: { x: number; y: number }[];
  draggable: {
    item: HTMLElement;
    indexItem: number;
    active: boolean;
    current: { x: number; y: number };
    initial: { x: number; y: number };
  };
}

class DragAndDropRoot extends Component<IDragAndDropProps, IDragAndDropContext, IDragAndDropState> {
  static displayName = 'DragAndDrop';
  static defaultProps = {
    theme: 'default',
  };
  static style = style;
  private _eventEmitter: EventEmitter;

  constructor(props) {
    super(props);
    this._eventEmitter = props.eventEmitter || new EventEmitter();
    this._eventEmitter.subscribe('draggable', this.setItems);
    this._eventEmitter.subscribe('draggable remove', this.setItems);

    this.state = {
      offsets: [{ x: 0, y: 0 }],
      draggable: {
        item: null,
        indexItem: null,
        active: false,
        current: { x: 0, y: 0 },
        initial: { x: 0, y: 0 },
      },
    };
  }

  setItems = () => {
    this.setState((state) => {
      const { offsets } = state;

      return {
        offsets: [...offsets, { x: 0, y: 0 }],
      };
    });
  };

  draggable = (e) => {
    const { draggable, offsets } = this.state;
    if (draggable.active) {
      const { initial } = draggable;
      const currentX = e.clientX - initial.x;
      const currentY = e.clientY - initial.y;

      this.setState(() => {
        const newOffsets = offsets;
        newOffsets[draggable.indexItem] = { x: currentX, y: currentY };
        return {
          offsets: newOffsets,
          draggable: {
            ...draggable,
            current: { x: currentX, y: currentY },
          },
        };
      });
    }
  };

  unActiveDraggable = () => {
    const { draggable } = this.state;
    this.setState(() => ({
      draggable: {
        ...draggable,
        initial: { x: draggable.current.x, y: draggable.current.y },
        active: false,
      },
    }));
  };

  activeDraggable = (e) => {
    const { offsets } = this.state;
    const { currentTarget, clientX, clientY } = e;
    const indexItem = getChildNumber(currentTarget);
    if (indexItem >= 0) {
      const offset = offsets[indexItem];
      const initialX = clientX - offset.x;
      const initialY = clientY - offset.y;

      currentTarget.style.cursor = 'move';

      this.setState((state) => ({
        ...state,
        draggable: {
          active: true,
          item: currentTarget,
          indexItem,
          initial: { x: initialX, y: initialY },
          current: { x: initialX, y: initialY },
        },
      }));
    }
  };

  changePlaceholderDroppable = (e, isAction) => {
    const { theme } = this.asProps;
    const droppableNode = e.currentTarget;
    if (droppableNode && theme) {
      droppableNode.classList.toggle(`dnd-placeholder-${theme}`, isAction);
    }
  };

  insertNodeInDroppableZone = (e) => {
    e.preventDefault();
    const { draggable } = this.state;
    const { onInsertDroppable } = this.asProps;
    const droppableNode = e.currentTarget;
    const draggableNode = draggable.item;

    // @ts-ignore
    callAllEventHandlers(onInsertDroppable, (...args) => onInsertDroppableInner(...args))(
      draggableNode,
      droppableNode,
    );
  };

  swapDraggable = (draggableNode, droppableNode) => {
    const { onSwapDraggable } = this.asProps;
    if (!draggableNode?.draggable || !droppableNode?.draggable || draggableNode === droppableNode) {
      return;
    }

    // @ts-ignore
    callAllEventHandlers(onSwapDraggable, (...args) => onSwapDraggableInner(...args))(
      draggableNode,
      droppableNode,
    );
  };

  droppableDragOver = (e) => {
    e.preventDefault();
    this.changePlaceholderDroppable(e, true);
  };

  droppableDragLeave = (e) => {
    e.preventDefault();
    this.changePlaceholderDroppable(e, false);
  };

  dragOver = (e) => {
    e.preventDefault();
  };

  dragEnd = (e) => {
    e.preventDefault();
    const { currentTarget, dataTransfer } = e;
    const { draggable } = this.state;

    this.unActiveDraggable();
    this.changePlaceholderDroppable(e, false);
    currentTarget.style.cursor = '';

    // cancel drop
    if (dataTransfer.dropEffect === 'none') {
      this.swapDraggable(currentTarget, currentTarget.parentElement.children[draggable.indexItem]);
    }
  };

  dragEnter = (e) => {
    e.preventDefault();
    const { draggable } = this.state;
    const draggableNode = draggable.item;
    const droppableNode = e.currentTarget;

    if (droppableNode.draggable) {
      e.stopPropagation();
      draggableNode.style.cursor = 'move';
      this.changePlaceholderDroppable(e, true);
      this.swapDraggable(draggableNode, droppableNode);
    } else {
      draggableNode.style.cursor = 'no-drop';
    }
  };

  dragLeave = (e) => {
    e.preventDefault();
    this.changePlaceholderDroppable(e, false);
  };

  drop = (e) => {
    e.preventDefault();
    this.draggable(e);
    this.insertNodeInDroppableZone(e);
    this.changePlaceholderDroppable(e, false);
  };

  getDraggableProps() {
    return {
      eventEmitter: this._eventEmitter,
      onDragOver: this.dragOver,
      onDragEnter: this.dragEnter,
      onDragLeave: this.dragLeave,
      onDragEnd: this.dragEnd,
      onDragStart: this.activeDraggable,
    };
  }

  getDroppableProps() {
    return {
      onDrop: this.drop,
      onDragOver: this.droppableDragOver,
      onDragLeave: this.droppableDragLeave,
    };
  }

  handleKeyDown = (e) => {
    const { active } = this.state.draggable;
    //Escape
    if (e.keyCode === 27) {
      e.preventDefault();
      this.unActiveDraggable();
    }
    //Space
    if (e.keyCode === 32) {
      e.preventDefault();
      if (!active) {
        this.activeDraggable(e);
      } else {
        this.unActiveDraggable();
      }
    }
    // Arrow left
    if (e.keyCode === 37 && active) {
      e.preventDefault();
      this.swapDraggable(e.target, e.target.previousElementSibling);
      e.target.focus();
    }
    // Arrow Up
    if (e.keyCode === 38 && active) {
      e.preventDefault();
      this.swapDraggable(e.target, e.target.previousElementSibling);
      e.target.focus();
    }
    // Arrow right
    if (e.keyCode === 39 && active) {
      e.preventDefault();
      this.swapDraggable(e.target, e.target.nextElementSibling);
      e.target.focus();
    }
    // Arrow Down
    if (e.keyCode === 40 && active) {
      e.preventDefault();
      this.swapDraggable(e.target, e.target.nextElementSibling);
      e.target.focus();
    }
  };

  render() {
    const { Root } = this;

    return <Root render={Box} onKeyDown={this.handleKeyDown} />;
  }
}

class Draggable extends Component<IDraggableProps> {
  static defaultProps = {
    placement: 'right',
    noDrag: false,
  };
  private element = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    eventEmitter && eventEmitter.emit('draggable', this.element.current);
  }

  componentWillUnmount() {
    const { eventEmitter } = this.asProps;
    eventEmitter && eventEmitter.emit('draggable remove', this.element.current);
  }

  render() {
    const { Root: SDraggable } = this;
    const { styles, placement, noDrag } = this.asProps;
    return styled(styles)(
      <SDraggable
        render={Box}
        ref={this.element}
        draggable={!noDrag}
        tabIndex={0}
        placement={placement}
      />,
    );
  }
}

const Droppable = ({ Root: SDroppable, styles }) => {
  return styled(styles)(<SDroppable render={Box} />);
};

const DragAndDrop = createComponent<
  Merge<IDragAndDropProps, HTMLAttributes<HTMLDivElement>>,
  {
    Draggable: Merge<IDraggableProps, HTMLAttributes<HTMLDivElement>>;
    Droppable: Merge<IBoxProps, HTMLAttributes<HTMLDivElement>>;
  },
  IDragAndDropContext
>(DragAndDropRoot, {
  Draggable,
  Droppable,
});

export default DragAndDrop;
