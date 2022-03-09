import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';

import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import setRef from '@semcore/utils/lib/setRef';
import fire from '@semcore/utils/lib/fire';

const KEY = {
  DOWN: 40,
  UP: 38,
  ENTER: 13,
  SPACE: 32,
};

class HighlightFromGroup extends PureComponent {
  static displayName = 'HighlightFromGroup';

  highlightedNode = null;
  listNode = null;
  items = [];

  componentDidMount() {
    if (this.props.highlightedIndex !== undefined) {
      this.scrollHighlightedItemIntoView();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.highlightedIndex !== prevProps.highlightedIndex) {
      this.scrollHighlightedItemIntoView();
    }
  }

  scrollHighlightedItemIntoView() {
    if (this.highlightedNode && this.listNode) {
      const scrollTop = this.listNode.scrollTop;
      const scrollBottom = scrollTop + this.listNode.offsetHeight;
      const optionTop = this.highlightedNode.offsetTop;
      const optionBottom = optionTop + this.highlightedNode.offsetHeight;

      if (scrollTop > optionTop || scrollBottom < optionBottom) {
        this.listNode.scrollTop = optionTop;
      }
    }
  }

  selectItemByIndex = (index) => {
    const item = this.items.find((item) => item.index === index);
    if (item) {
      fire(this, 'onSelect', item);
    }
  };

  handleKeyDown = (e) => {
    const itemCount = this.getItemCount();
    const { highlightedIndex } = this.props;
    if (itemCount) {
      if (e.keyCode === KEY.DOWN) {
        e.preventDefault();
        const amount = e.shiftKey ? 5 : 1;
        this.moveHighlightedIndex(amount);
      }
      if (e.keyCode === KEY.UP) {
        e.preventDefault();
        const amount = e.shiftKey ? -5 : -1;
        this.moveHighlightedIndex(amount);
      }
      if (e.keyCode === KEY.ENTER || e.keyCode === KEY.SPACE) {
        if (highlightedIndex !== undefined) {
          e.preventDefault();
          this.selectItemByIndex(highlightedIndex);
        }
      }
    }
  };

  /* refactor pls me */
  moveHighlightedIndex(amount) {
    let { highlightedIndex } = this.props;
    const itemsLastIndex = this.getItemCount() - 1;

    if (itemsLastIndex < 0) return;

    if (highlightedIndex === undefined) {
      highlightedIndex = amount < 0 ? 0 : itemsLastIndex;
    }

    let newIndex = highlightedIndex + amount;
    if (newIndex < 0) {
      newIndex = amount + itemsLastIndex + 1;
    } else if (newIndex > itemsLastIndex) {
      newIndex = newIndex - itemsLastIndex - 1;
    }

    if (this.items[newIndex] && this.items[newIndex].disabled) {
      this.moveHighlightedIndex(amount < 0 ? amount - 1 : amount + 1);
      return;
    }
    fire(this, 'onHighlightedIndexChange', newIndex);
  }

  clearItems = () => {
    this.items = [];
  };

  getItemCount = () => {
    return this.props.itemCount !== undefined ? this.props.itemCount : this.items.length;
  };

  getTriggerProps = (props = {}) => {
    const { onKeyDown, onBlur, ...other } = props;
    return {
      ...other,
      onKeyDown: callAllEventHandlers(onKeyDown, this.handleKeyDown),
      onBlur: callAllEventHandlers(onBlur, () => this.props.onHighlightedIndexChange(undefined)),
    };
  };

  getItemProps = (props = {}) => {
    const { highlightedIndex } = this.props;
    let { index } = props;

    if (index === undefined) {
      index = this.getItemCount();
      this.items.push({ ...props, index });
    } else {
      this.items[index] = props;
    }

    const newProps = {
      index,
      ...props,
    };

    if (index === highlightedIndex) {
      newProps.ref = (ref) => {
        setRef(props.ref, ref);
        this.highlightedNode = findDOMNode(ref);
      };
    }

    return newProps;
  };

  getListProps = (props = {}) => {
    return {
      ...props,
      ref: (ref) => {
        setRef(props['ref'], ref);
        this.listNode = findDOMNode(ref);
      },
    };
  };

  render() {
    const { children, highlightedIndex } = this.props;

    this.clearItems();

    return children({
      getTriggerProps: this.getTriggerProps,
      getItemProps: this.getItemProps,
      getListProps: this.getListProps,
      selectItemByIndex: this.selectItemByIndex,
      highlightedIndex,
      getItemCount: this.getItemCount,
      clearItems: this.clearItems,
    });
  }
}

export default HighlightFromGroup;
