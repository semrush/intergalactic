import React from 'react';
import createComponent, { sstyled, Component, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';

import style from './style/drag-and-drop.shadow.css';
import { DropZoneProps } from './index';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

type AsProps = {
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
   * Contolled drag and drop handler
   */
  onDnD: (dndData: { fromIndex: number; fromId: string; toIndex: number; toId: string }) => void;
  /**
   * Index of id that indicates item that is currently under the user focus in case of real browser focus cannot be used.
   * When provided, drag and drop listens to whole page keyboard events. Doesn't provide `onCustomFocusChange` callback.
   */
  customFocus?: number | string;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

type AttachDetails = {
  index: number;
  children: React.ReactNode;
  node: HTMLElement;
  id: string;
  draggingAllowed: boolean;
  isDropZone?: boolean;
  zoneName?: string;
};

const noop: (...args: any[]) => any = () => {
  /* do nothing */
};
const DragAndDropContext = React.createContext<{
  attach: (details: AttachDetails) => void;
  detach: (index: number) => void;
}>({
  attach: noop,
  detach: noop,
});

type State = {
  items: Array<Omit<AttachDetails, 'index'> | undefined>;
  dragging: null | {
    index: number;
    initialItemsRects: Array<{ x: number; y: number; width: number; height: number } | undefined>;
  };
  dragOver: number | null;
  hideHoverEffect: boolean;
  a11yHint: string | null;
  keyboardDraggingIndex: number | null;
  animatedScaling: number | null;
  reversedScaling: boolean;
};

class DragAndDropRoot extends Component<AsProps, {}, State> {
  static displayName = 'DragAndDrop';
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    theme: 'default',
    i18n: localizedMessages,
    locale: 'en',
  };
  static style = style;

  state: State = {
    items: [],
    dragging: null,
    dragOver: null,
    hideHoverEffect: false, // https://stackoverflow.com/questions/67118739/hover-effect-reset-when-hovering-over-other-letters
    a11yHint: null,
    keyboardDraggingIndex: null,
    animatedScaling: null,
    reversedScaling: false,
  };

  handleItemDragStart = (index: number) => {
    const { items } = this.state;
    const currentItem = items[index];
    if (!currentItem) return;

    const itemText =
      currentItem.node.getAttribute('aria-label') || currentItem.node.textContent || `${index + 1}`;

    const { getI18nText } = this.asProps;
    const zoneName = currentItem.zoneName;
    const zonedItems = !zoneName ? items : items.filter((i) => i?.zoneName === zoneName);
    const itemsCount = zonedItems.length;
    const itemPosition = zonedItems.findIndex(
      (i) => i?.node === currentItem.node || (i?.id && i?.id === currentItem.id),
    );

    const a11yHint = getI18nText(zoneName ? 'grabbedWithZone' : 'grabbed', {
      itemText,
      itemPosition: itemPosition + 1,
      itemsCount,
      zoneName: zoneName || '',
    });

    this.setState((prevState: State) => ({
      a11yHint: a11yHint,
      dragging: {
        index,
        initialItemsRects: prevState.items.map((item) => item?.node.getBoundingClientRect()),
      },
    }));
  };
  handleItemDragEnd = (event: DragEvent) => {
    event.preventDefault();
    this.setState({
      dragging: null,
      dragOver: null,
      reversedScaling: false,
      keyboardDraggingIndex: null,
    });
  };
  handleItemDragOver = (event: DragEvent) => {
    event.preventDefault();
    const { getI18nText } = this.asProps;
    const { items, dragging } = this.state;
    if (!dragging) return;
    const itemIndex = dragging.initialItemsRects.findIndex(
      (rect) =>
        rect &&
        event.clientX > rect.x &&
        event.clientX < rect.x + rect.width &&
        event.clientY > rect.y &&
        event.clientY < rect.y + rect.height,
    );
    const currentItem = items[itemIndex];
    const draggingItem = items[dragging.index];
    if (!currentItem || !draggingItem) return;

    const node = currentItem.isDropZone ? draggingItem.node : currentItem.node;

    const itemText = node.getAttribute('aria-label') || node.textContent || `${itemIndex + 1}`;
    const zoneName = currentItem.zoneName;
    const zonedItems = !zoneName ? items : items.filter((i) => i?.zoneName === zoneName);
    const itemsCount = zonedItems.length;
    const itemPosition = zonedItems.findIndex(
      (i) => i?.node === currentItem.node || (i?.id && i?.id === currentItem.id),
    );

    const i18nKey = !zoneName
      ? 'grabbing'
      : currentItem.isDropZone
      ? 'grabbingJustWithZone'
      : 'grabbingFullWithZone';

    const a11yHint = getI18nText(i18nKey, {
      itemText,
      itemPosition: itemPosition + 1,
      itemsCount,
      zoneName: zoneName || '',
    });

    if (itemIndex === this.state.dragging?.index) this.setState({ dragOver: null, a11yHint });
    else this.setState({ dragOver: itemIndex, a11yHint });
  };
  get preview() {
    const dragging = this.state.dragging?.index;
    const dragOver = this.state.dragOver;

    if (typeof dragging !== 'number' || typeof dragOver !== 'number') return {};
    const result: Record<number, number> = {};
    const shift = dragging < dragOver ? 1 : -1;
    for (let i = dragging; i !== dragOver; i += shift) {
      result[i] = i + shift;
    }

    result[dragOver] = dragging;
    return result;
  }
  getSwapPreview = (index: number) => {
    if (!this.state.dragging) return null;

    const previewIndex = this.preview[index];
    if (typeof previewIndex !== 'number') return null;
    return this.state.items[previewIndex]?.children;
  };
  handleItemDrop = (index: number) => {
    const { onDnD, getI18nText } = this.asProps;
    if (!onDnD) return;

    const { items, dragging } = this.state;
    if (!dragging) return;
    const currentItem = items[index];
    const draggingItem = items[dragging.index];
    if (!currentItem || !draggingItem) return;

    const node = currentItem.isDropZone ? draggingItem.node : currentItem.node;
    const itemText = node.getAttribute('aria-label') || node.textContent || `${index + 1}`;
    const zoneName = currentItem.zoneName;
    const zonedItems = !zoneName ? items : items.filter((i) => i?.zoneName === zoneName);
    const itemsCount = zonedItems.length;
    const itemPosition = zonedItems.findIndex(
      (i) => i?.node === currentItem.node || (i?.id && i?.id === currentItem.id),
    );

    const i18nKey = !zoneName
      ? 'dropped'
      : currentItem.isDropZone
      ? 'droppedJustWithZone'
      : 'droppedFullWithZone';

    const a11yHint = getI18nText(i18nKey, {
      itemText,
      itemPosition: itemPosition + 1,
      itemsCount,
      zoneName: zoneName || '',
    });

    this.setState({
      a11yHint,
      dragging: null,
      dragOver: null,
      keyboardDraggingIndex: null,
      hideHoverEffect: true,
      reversedScaling: false,
    });
    if (dragging && items[dragging.index]) {
      const fromNode = items[dragging.index];
      if (fromNode) {
        onDnD({
          fromId: fromNode.id,
          fromIndex: dragging!.index,
          toId: currentItem.id,
          toIndex: index,
        });
      }
    }
    if (!currentItem.draggingAllowed) {
      this.asProps.onInsertDroppable?.(items[dragging!.index]?.children, currentItem.children);
    } else {
      this.asProps.onSwapDraggable?.(items[dragging!.index]?.children, currentItem.children);
    }
  };
  handleItemDragEnter = (event: DragEvent) => {
    event.preventDefault();
  };
  handleItemMouseMove = () => {
    if (!this.state.hideHoverEffect) return;
    this.setState({ hideHoverEffect: false });
  };
  updateItemScaling = () => {
    const firstItemNode = this.state.items[0]?.node;
    if (!firstItemNode) return;
    if (this.state.reversedScaling) return;

    const firstItemRect = firstItemNode.getBoundingClientRect();
    let reversedScaling = false;
    let parent = firstItemNode.parentElement;
    while (parent && parent !== document.body) {
      const computedStyle = getComputedStyle(parent);
      const rect = parent.getBoundingClientRect();
      if (computedStyle.overflow !== 'visible') {
        if (
          rect.left >= firstItemRect.left ||
          rect.right <= firstItemRect.right ||
          rect.top >= firstItemRect.top ||
          rect.bottom <= firstItemRect.bottom
        ) {
          reversedScaling = true;
          break;
        }
      } else {
        if (
          rect.left < firstItemRect.left &&
          rect.right > firstItemRect.right &&
          rect.top < firstItemRect.top &&
          rect.bottom > firstItemRect.bottom
        ) {
          break;
        }
      }
      parent = parent.parentElement;
    }

    if (this.state.reversedScaling !== reversedScaling) {
      this.setState({ reversedScaling });
    }
  };
  handleItemKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.dragging) {
        const dragOver = this.state.dragOver;
        const prevIndex = this.state.dragging.index;
        this.handleItemDrop(index);
        this.setState({
          dragging: null,
          dragOver: null,
          keyboardDraggingIndex: null,
          animatedScaling: index,
          hideHoverEffect: true,
        });

        requestAnimationFrame(() => {
          const prevIndexNode = this.state.items[prevIndex]?.node;
          if (prevIndexNode !== document.activeElement) return;
          this.state.items[dragOver!]?.node.focus();
        });
      } else if (this.state.items[index]?.draggingAllowed) {
        this.handleItemDragStart(index);
        this.setState({ keyboardDraggingIndex: index, animatedScaling: index });
        this.updateItemScaling();
      }
      return false;
    } else if (event.key === 'Escape' && this.state.dragging) {
      event.preventDefault();
      event.stopPropagation();
      const { getI18nText } = this.asProps;
      const a11yHint = getI18nText('discarded');
      this.setState({
        a11yHint,
        dragging: null,
        dragOver: null,
        keyboardDraggingIndex: null,
        hideHoverEffect: true,
      });
      return false;
    } else if (event.key.startsWith('Arrow')) {
      if (this.state.animatedScaling !== null) {
        this.setState({ animatedScaling: null });
      }
      const item = this.state.items[index];
      if (item?.node !== document.activeElement) return;
      event.preventDefault();
      requestAnimationFrame(() => {
        if (item?.node !== document.activeElement) return;
        const rects = this.state.items
          .map((item) => item?.node.getBoundingClientRect()!)
          .map((rect): { top: number; right: number; bottom: number; left: number } => ({
            top: Math.round(rect.top),
            right: Math.round(rect.right),
            bottom: Math.round(rect.bottom),
            left: Math.round(rect.left),
          }));
        let nextIndex = findNextRectangleIndex(rects, rects[index], event.key as DirectionArrows);
        if (nextIndex === -1) {
          const indexDiff = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1;
          nextIndex = index + indexDiff;
        }
        this.state.items[nextIndex]?.node.focus();
        const { getI18nText } = this.asProps;
        const a11yHint = getI18nText('grabbing', {
          itemPosition: nextIndex + 1,
          itemsCount: this.state.items.length,
        });
        this.setState({
          a11yHint,
        });
        return false;
      });
    }
  };
  handleItemFocus = (index: number) => {
    if (!this.state.dragging) return;
    this.setState({ dragOver: index, keyboardDraggingIndex: index });
    this.updateItemScaling();
  };

  makeItemDragStartHandler = (index: number) => () => this.handleItemDragStart(index);
  makeItemDropHandler = (index: number) => () => this.handleItemDrop(index);
  makeItemFocusHandler = (index: number) => () => this.handleItemFocus(index);
  makeItemKeyDownHandler = (index: number) => (event: KeyboardEvent) =>
    this.handleItemKeyDown(event, index);

  getDraggableProps(_: any, index: number) {
    return {
      index,
      onDragStart: this.makeItemDragStartHandler(index),
      onDragEnd: this.handleItemDragEnd,
      onDragOver: this.handleItemDragOver,
      onDragEnter: this.handleItemDragEnter,
      onDrop: this.makeItemDropHandler(index),
      onMouseMove: this.handleItemMouseMove,
      onKeyDown: this.makeItemKeyDownHandler(index),
      onFocus: this.makeItemFocusHandler(index),
      dropPreview: index === this.state.dragOver,
      keyboardDragging: index === this.state.keyboardDraggingIndex,
      reversedScaling: this.state.reversedScaling,
      dark: this.asProps.theme === 'dark',
      swapPreview: this.getSwapPreview(index),
      hideHoverEffect: this.state.hideHoverEffect,
      animatedScaling: index === this.state.animatedScaling,
    };
  }

  handlePageKeyDown = (event: KeyboardEvent) => {
    if (this.asProps.customFocus !== undefined) {
      const itemIndex = this.getCustomFocusItemIndex(this.asProps.customFocus);
      if (this.state.items[itemIndex!]) {
        this.handleItemKeyDown(event, itemIndex!);
      }
    }
  };

  attach = ({
    index,
    children,
    node,
    id,
    draggingAllowed,
    zoneName,
    isDropZone,
  }: AttachDetails) => {
    this.setState((prevState: State) => {
      if (prevState.items[index]?.children === children && prevState.items[index]?.node === node)
        return prevState;
      const { items } = prevState;
      items[index] = { children, node, id, draggingAllowed, zoneName, isDropZone };
      return { items: [...items] };
    });
  };
  detach = (index: number) => {
    this.setState((prevState: State) => {
      if (!prevState.items[index]) return prevState;
      const { items } = prevState;
      items[index] = undefined;
      return { items: [...items] };
    });
  };

  getCustomFocusItemIndex = (customFocus: string | number | undefined) => {
    if (customFocus === undefined) return undefined;
    let itemIndex = customFocus;
    if (typeof itemIndex === 'string') {
      itemIndex = this.state.items.findIndex((item) => item?.id === customFocus);
    }
    if (itemIndex === -1 || typeof itemIndex !== 'number') return undefined;
    return itemIndex;
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlePageKeyDown, { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePageKeyDown, { capture: true });
  }

  componentDidUpdate(prevProps: AsProps) {
    if (prevProps.customFocus !== this.asProps.customFocus) {
      const itemIndex = this.getCustomFocusItemIndex(this.asProps.customFocus);
      if (this.state.items[itemIndex!]) this.handleItemFocus(itemIndex!);
    }
  }

  render() {
    const { attach, detach } = this;
    const SA11yHint = 'div';
    const { a11yHint, dragging } = this.state;
    const context = { attach, detach };

    return sstyled(this.asProps.styles)(
      <DragAndDropContext.Provider value={context}>
        {a11yHint && (
          <SA11yHint role='alert' aria-live='assertive'>
            {a11yHint}
          </SA11yHint>
        )}
        <Root render={Box} aria-hidden={dragging !== null ? 'true' : undefined} />
      </DragAndDropContext.Provider>,
    );
  }
}

const Draggable = (props: any) => {
  const SDraggable = Root;
  const ref = React.useRef();
  const { attach, detach } = React.useContext(DragAndDropContext);
  const {
    styles,
    placement = 'right',
    noDrag = false,
    index,
    children,
    swapPreview,
    Children,
    id,
    zoneName,
    isDropZone = false,
  } = props;
  const resolvedChildren = React.useMemo(
    () => (typeof children === 'function' ? children(props) : children),
    [children, props],
  );

  useEnhancedEffect(() => {
    attach({
      index,
      children: resolvedChildren,
      node: ref.current!,
      id,
      draggingAllowed: !noDrag,
      zoneName,
      isDropZone,
    });
    return () => detach(index);
  }, [index, resolvedChildren, attach, detach, id]);

  return sstyled(styles)(
    <SDraggable render={Box} ref={ref} draggable={!noDrag} placement={placement}>
      {swapPreview ? swapPreview : <Children />}
    </SDraggable>,
  );
};
Draggable.enhance = [keyboardFocusEnhance()];

type DirectionArrows = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown';
const findNextRectangleIndex = <
  Rectangle extends { top: number; right: number; bottom: number; left: number },
>(
  rectangles: (Rectangle | undefined)[],
  current: Rectangle,
  direction: DirectionArrows,
): number => {
  let candidate: Rectangle | null = null;
  let minDistance: number = Infinity;

  for (let i = 0; i < rectangles.length; i++) {
    const rect = rectangles[i];
    if (!rect) continue;
    if (rect === current) continue;

    const verticallyOverlaps = current.top <= rect.bottom && current.bottom >= rect.top;
    const horizontallyOverlaps = current.left <= rect.right && current.right >= rect.left;

    if (!verticallyOverlaps && !horizontallyOverlaps) continue;

    switch (direction) {
      case 'ArrowRight': {
        if (!verticallyOverlaps) continue;
        const distance = rect.left - current.right;
        if (distance < 0 || distance >= minDistance) continue;
        candidate = rect;
        minDistance = distance;
        break;
      }
      case 'ArrowLeft': {
        if (!verticallyOverlaps) continue;
        const distance = current.left - rect.right;
        if (distance < 0 || distance >= minDistance) continue;
        candidate = rect;
        minDistance = distance;
        break;
      }
      case 'ArrowUp': {
        if (!horizontallyOverlaps) continue;
        const distance = current.top - rect.bottom;

        if (distance < 0 || distance >= minDistance) continue;
        candidate = rect;
        minDistance = distance;
        break;
      }
      case 'ArrowDown': {
        if (!horizontallyOverlaps) continue;
        const distance = rect.top - current.bottom;
        if (distance < 0 || distance >= minDistance) continue;
        candidate = rect;
        minDistance = distance;
        break;
      }
    }
  }

  return rectangles.indexOf(candidate!);
};

const DropZone = (props: DropZoneProps) => {
  const SDropZone = Root;
  const { styles } = props;

  return sstyled(styles)(<SDropZone render={DragAndDrop.Draggable} noDrag isDropZone />);
};

const DragAndDrop = createComponent(DragAndDropRoot, {
  Draggable,
  DropZone,
  Dropable: DropZone,
}) as any;

export default DragAndDrop;
