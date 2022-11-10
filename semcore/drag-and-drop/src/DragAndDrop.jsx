import React, { useRef, useEffect } from 'react';
import createComponent, { sstyled, Component, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
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

class DragAndDropRoot extends Component {
  static displayName = 'DragAndDrop';
  static defaultProps = {
    theme: 'default',
  };
  static style = style;

  constructor(props) {
    super(props);
    this._eventEmitter = props.eventEmitter || new EventEmitter();
    this._eventEmitter.subscribe('draggable', this.addDraggable);
    this._eventEmitter.subscribe('draggable remove', this.removeDraggable);
    this._eventEmitter.subscribe('droppable', this.updateDroppable);
    this._eventEmitter.subscribe('droppable remove', this.updateDroppable);

    this.state = {
      droppable: null,
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

  addDraggable = () => {
    this.setState((state) => {
      const { offsets } = state;

      return {
        offsets: [...offsets, { x: 0, y: 0 }],
      };
    });
  };

  removeDraggable = (index) => {
    this.setState((state) => {
      const { offsets } = state;
      offsets.splice(index, 1);

      return {
        offsets: [...offsets],
      };
    });
  };

  updateDroppable = (node) => {
    this.setState(() => {
      return {
        droppable: node,
      };
    });
  };

  draggable = (event) => {
    const { draggable, offsets } = this.state;
    if (draggable.active) {
      const { initial } = draggable;
      const currentX = event.clientX - initial.x;
      const currentY = event.clientY - initial.y;

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

  activeDraggable = (event) => {
    const { offsets } = this.state;
    const { target, clientX, clientY } = event;
    const indexItem = getChildNumber(target);
    if (indexItem >= 0) {
      const offset = offsets[indexItem];
      const initialX = clientX - offset.x;
      const initialY = clientY - offset.y;

      target.style.cursor = 'move';

      this.setState((state) => ({
        ...state,
        draggable: {
          active: true,
          item: target,
          indexItem,
          initial: { x: initialX, y: initialY },
          current: { x: initialX, y: initialY },
        },
      }));
    }
  };

  changePlaceholderDroppable = (event, isAction) => {
    const { theme } = this.asProps;
    const droppableNode = event.currentTarget;
    if (droppableNode && theme) {
      droppableNode.classList.toggle(`dnd-placeholder-${theme}`, isAction);
    }
  };

  insertNodeInDroppableZone = (draggableNode, droppableNode) => {
    const { onInsertDroppable } = this.asProps;

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

    callAllEventHandlers(onSwapDraggable, (...args) => onSwapDraggableInner(...args))(
      draggableNode,
      droppableNode,
    );
  };

  droppableDragOver = (event) => {
    event.preventDefault();
    this.changePlaceholderDroppable(event, true);
  };

  droppableDragLeave = (event) => {
    event.preventDefault();
    this.changePlaceholderDroppable(event, false);
  };

  dragOver = (event) => {
    event.preventDefault();
  };

  dragEnd = (event) => {
    event.preventDefault();
    const { currentTarget, dataTransfer } = event;
    const { draggable } = this.state;

    this.unActiveDraggable();
    this.changePlaceholderDroppable(event, false);
    currentTarget.style.cursor = '';

    // cancel drop
    if (dataTransfer.dropEffect === 'none') {
      this.swapDraggable(currentTarget, currentTarget.parentElement.children[draggable.indexItem]);
    }
  };

  dragEnter = (event) => {
    event.preventDefault();
    const { draggable } = this.state;
    const draggableNode = draggable.item;
    const droppableNode = event.currentTarget;

    if (droppableNode.draggable) {
      event.stopPropagation();
      draggableNode.style.cursor = 'move';
      this.changePlaceholderDroppable(event, true);
      this.swapDraggable(draggableNode, droppableNode);
    } else {
      draggableNode.style.cursor = 'no-drop';
    }
  };

  dragLeave = (event) => {
    event.preventDefault();
    this.changePlaceholderDroppable(event, false);
  };

  drop = (event) => {
    event.preventDefault();
    const { draggable } = this.state;
    const droppableNode = event.currentTarget;
    const draggableNode = draggable.item;

    this.draggable(event);
    this.insertNodeInDroppableZone(draggableNode, droppableNode);
    this.changePlaceholderDroppable(event, false);
  };

  getDraggableProps(_, index) {
    return {
      $index: index,
      $eventEmitter: this._eventEmitter,
      onDragOver: this.dragOver,
      onDragEnter: this.dragEnter,
      onDragLeave: this.dragLeave,
      onDragEnd: this.dragEnd,
      onDragStart: this.activeDraggable,
    };
  }

  getDroppableProps() {
    return {
      $eventEmitter: this._eventEmitter,
      onDrop: this.drop,
      onDragOver: this.droppableDragOver,
      onDragLeave: this.droppableDragLeave,
    };
  }

  handleKeyDown = (event) => {
    const {
      draggable: { active },
      droppable,
    } = this.state;

    const { target } = event;
    const callFunction = droppable ? this.insertNodeInDroppableZone : this.swapDraggable;
    if ((event.code === 'Escape' || event.code === 'Tab') && active) {
      event.preventDefault();
      this.unActiveDraggable();
    }
    if (event.code === 'Space') {
      event.preventDefault();
      if (!active) {
        this.activeDraggable(event);
      } else {
        this.unActiveDraggable();
      }
    }
    if (event.code === 'ArrowLeft' && active) {
      event.preventDefault();
      callFunction(target, droppable || target.previousElementSibling);
      event.target.focus();
      this.unActiveDraggable();
    }
    if (event.code === 'ArrowUp' && active) {
      event.preventDefault();
      callFunction(target, droppable || target.previousElementSibling);
      target.focus();
    }
    if (event.code === 'ArrowRight' && active) {
      event.preventDefault();
      callFunction(target, droppable || target.nextElementSibling);
      target.focus();
    }
    if (event.code === 'ArrowDown' && active) {
      event.preventDefault();
      callFunction(target, droppable || target.nextElementSibling);
      target.focus();
    }
  };

  render() {
    return <Root render={Box} onKeyDown={this.handleKeyDown} />;
  }
}

class Draggable extends Component {
  static defaultProps = {
    placement: 'right',
    noDrag: false,
  };

  ref = React.createRef();

  componentDidMount() {
    const { $eventEmitter } = this.asProps;
    $eventEmitter && $eventEmitter.emit('draggable');
  }

  componentWillUnmount() {
    const { $eventEmitter, $index } = this.asProps;
    $eventEmitter && $eventEmitter.emit('draggable remove', $index);
  }

  render() {
    const SDraggable = Root;
    const { styles, placement, noDrag } = this.asProps;
    return sstyled(styles)(
      <SDraggable
        render={Box}
        ref={this.ref}
        draggable={!noDrag}
        tabIndex={0}
        placement={placement}
      />,
    );
  }
}

const Droppable = ({ $eventEmitter, styles }) => {
  const SDroppable = Root;
  const refDroppable = useRef();
  useEffect(() => {
    $eventEmitter && $eventEmitter.emit('droppable', refDroppable.current);
    return () => {
      $eventEmitter && $eventEmitter.emit('droppable remove', null);
    };
  }, []);

  return sstyled(styles)(<SDroppable ref={refDroppable} render={Box} />);
};

const DragAndDrop = createComponent(DragAndDropRoot, {
  Draggable,
  Droppable,
});

export default DragAndDrop;
