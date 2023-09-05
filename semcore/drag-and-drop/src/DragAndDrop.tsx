import React from 'react';
import createComponent, { sstyled, Component, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';

import style from './style/drag-and-drop.shadow.css';

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

const noop: (...args: any[]) => any = () => {
  /* do nothing */
};
const DragAndDropContext = React.createContext<{
  attach: (details: {
    index: number;
    children: React.ReactNode;
    node: HTMLElement;
    id: string;
    draggingAllowed: boolean;
  }) => void;
  detach: (index: number) => void;
}>({
  attach: noop,
  detach: noop,
});

type State = {
  items: {
    children: React.ReactNode;
    node: HTMLElement;
    id: string;
    draggingAllowed: boolean;
  }[];
  dragging: null | {
    index: number;
    initialItemsRects?: { x: number; y: number; width: number; height: number }[];
  };
  previewSwap: number | null;
  hideHoverEffect: boolean;
  a11yHint: string | null;
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
    previewSwap: null,
    hideHoverEffect: false, // https://stackoverflow.com/questions/67118739/hover-effect-reset-when-hovering-over-other-letters
    a11yHint: null,
  };

  handleItemDragStart = (index: number) => {
    const itemText =
      this.state.items[index]?.node?.getAttribute('aria-label') ||
      this.state.items[index]?.node?.textContent ||
      `${index + 1}`;

    const { getI18nText } = this.asProps;
    const itemsCount = this.state.items.length;
    const a11yHint = getI18nText('grabbed', {
      itemText,
      itemPosition: index + 1,
      itemsCount,
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
      previewSwap: null,
      // hideHoverEffect: true
    });
  };
  handleItemDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!this.state.dragging?.initialItemsRects) return;
    const itemIndex = this.state.dragging.initialItemsRects.findIndex(
      (rect) =>
        rect &&
        event.clientX > rect.x &&
        event.clientX < rect.x + rect.width &&
        event.clientY > rect.y &&
        event.clientY < rect.y + rect.height,
    );
    const itemText =
      this.state.items[itemIndex]?.node?.getAttribute('aria-label') ||
      this.state.items[itemIndex]?.node?.textContent ||
      `${itemIndex + 1}`;
    const itemsCount = this.state.items.length;
    const { getI18nText } = this.asProps;
    const a11yHint = getI18nText('grabbing', {
      itemText,
      itemPosition: itemIndex + 1,
      itemsCount,
    });

    if (itemIndex === this.state.dragging?.index) this.setState({ previewSwap: null, a11yHint });
    else this.setState({ previewSwap: itemIndex, a11yHint });
  };
  getSwapPreview = (index: number) => {
    if (!this.state.dragging) return null;
    if (this.state.previewSwap === null) return null;
    if (this.state.items[this.state.previewSwap]?.draggingAllowed === false) return null;
    if (this.state.previewSwap === index)
      return this.state.items[this.state.dragging.index]?.children;
    if (this.state.previewSwap !== null && index === this.state.dragging.index)
      return this.state.items[this.state.previewSwap]?.children;
  };
  handleItemDrop = (index: number) => {
    const { onDnD, getI18nText } = this.asProps;
    if (!onDnD) return;
    const { items, dragging } = this.state;
    const itemText =
      this.state.items[index]?.node?.getAttribute('aria-label') ||
      this.state.items[index]?.node?.textContent ||
      `${index + 1}`;
    const itemsCount = this.state.items.length;
    const a11yHint = getI18nText('dropped', {
      itemText,
      itemPosition: index + 1,
      itemsCount,
    });

    this.setState({ a11yHint, dragging: null, previewSwap: null, hideHoverEffect: true });
    onDnD({
      fromId: items[dragging!.index]?.id,
      fromIndex: dragging!.index,
      toId: items[index]?.id,
      toIndex: index,
    });
    if (items[index]) {
      if (!items[index].draggingAllowed) {
        this.asProps.onInsertDroppable?.(items[dragging!.index]?.children, items[index].children);
      } else {
        this.asProps.onSwapDraggable?.(items[dragging!.index]?.children, items[index].children);
      }
    }
  };
  handleItemDragEnter = (event: DragEvent) => {
    event.preventDefault();
  };
  handleItemMouseMove = () => {
    if (!this.state.hideHoverEffect) return;
    this.setState({ hideHoverEffect: false });
  };
  handleItemKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.dragging) {
        const previewSwap = this.state.previewSwap;
        this.handleItemDrop(index);
        this.setState({ dragging: null, previewSwap: null, hideHoverEffect: true });
        setTimeout(() => {
          this.state.items[previewSwap as any]?.node.focus();
        }, 0);
      } else {
        this.handleItemDragStart(index);
      }
      return false;
    } else if (event.key === 'Escape' && this.state.dragging) {
      event.preventDefault();
      event.stopPropagation();
      const { getI18nText } = this.asProps;
      const a11yHint = getI18nText('discarded');
      this.setState({ a11yHint, dragging: null, previewSwap: null, hideHoverEffect: true });
      return false;
    }
  };
  handleItemFocus = (index: number) => {
    if (!this.state.dragging) return;
    this.setState({ previewSwap: index });
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
      dropPreview: index === this.state.previewSwap,
      dark: this.asProps.theme === 'dark',
      swapPreview: this.getSwapPreview(index),
      hideHoverEffect: this.state.hideHoverEffect,
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
  }: {
    index: number;
    children: React.ReactNode;
    node: HTMLElement;
    id: string;
    draggingAllowed: boolean;
  }) => {
    this.setState((prevState: State) => {
      if (prevState.items[index]?.children === children && prevState.items[index]?.node === node)
        return prevState;
      const { items } = prevState;
      items[index] = { children, node, id, draggingAllowed };
      return { items: [...items] };
    });
  };
  detach = (index: number) => {
    this.setState((prevState: State) => {
      if (!prevState.items[index]) return prevState;
      const { items } = prevState;
      (items as any)[index] = undefined;
      return { items: [...items] };
    });
  };

  getCustomFocusItemIndex = (customFocus: string | number | undefined) => {
    if (customFocus === undefined) return undefined;
    let itemIndex = customFocus;
    if (typeof itemIndex === 'string') {
      itemIndex = this.state.items.findIndex((item) => item.id === itemIndex);
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
      if (this.state.items[itemIndex!]) this.handleItemFocus(itemIndex);
    }
  }

  render() {
    const { attach, detach } = this;
    const SA11yHint = 'div';
    const { a11yHint } = this.state;
    const context = { attach, detach };

    return sstyled(this.asProps.styles)(
      <DragAndDropContext.Provider value={context}>
        {a11yHint && (
          <SA11yHint role='alert' aria-live='assertive'>
            {a11yHint}
          </SA11yHint>
        )}
        <Root render={Box} />
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
  } = props;
  const resolvedChildren = React.useMemo(
    () => (typeof children === 'function' ? children(props) : children),
    [children, props],
  );

  useEnhancedEffect(() => {
    attach({ index, children: resolvedChildren, node: ref.current!, id, draggingAllowed: !noDrag });
    return () => detach(index);
  }, [index, resolvedChildren, attach, detach, id]);

  return sstyled(styles)(
    <SDraggable render={Box} ref={ref} draggable={!noDrag} tabIndex={0} placement={placement}>
      {swapPreview ? swapPreview : <Children />}
    </SDraggable>,
  );
};

const DropZone = (props: any) => {
  const SDropZone = Root;
  const { styles } = props;

  return sstyled(styles)(<SDropZone render={DragAndDrop.Draggable} noDrag />);
};

const DragAndDrop = createComponent(DragAndDropRoot, {
  Draggable,
  DropZone,
  Dropable: DropZone,
}) as any;

export default DragAndDrop;
