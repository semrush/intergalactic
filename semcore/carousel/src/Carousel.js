import React, { useEffect } from 'react';
import createComponent, { Component, styled } from '@semcore/core';

import { Box } from '@semcore/flex-box';
import ChevronRightL from '@semcore/icon/lib/ChevronRight/l';
import ChevronLeftL from '@semcore/icon/lib/ChevronLeft/l';

import style from './style/carousel.shadow.css';

const position = {
  getItemMin: function(items) {
    let indexItem = 0;
    items.forEach(function(item, index) {
      if (item.position < items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getItemMax: function(items) {
    let indexItem = 0;
    items.forEach(function(item, index) {
      if (item.position > items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getMin: function(items) {
    return items[position.getItemMin(items)].position;
  },
  getMax: function(items) {
    return items[position.getItemMax(items)].position;
  },
};

const MAP_TRANSFORM = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

class Carousel extends Component {
  static displayName = 'Carousel';
  static defaultProps = {
    defaultIndex: 0,
    duration: 350,
    step: 100,
    bounded: false,
  };

  static style = style;

  refContainer = React.createRef();
  transform = 0;
  positionLeftItem = 0;
  indexIndicator = 0;

  state = {
    items: [],
  };

  uncontrolledProps() {
    return {
      index: null,
    };
  }

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        e.preventDefault();
        const { activeItemIndex } = this.transformItem(MAP_TRANSFORM[e.key]);
        this.handlers.index(activeItemIndex);
    }
  };

  toogleItem = (item, removeItem = false) => {
    const { index } = this.asProps;
    const { items } = this.state;
    if (removeItem) {
      this.updateItems(items.filter((element) => element.node !== item.node));
    } else {
      this.setState(
        (state) => {
          return {
            items: [...state.items, item].map((element, position) => ({
              ...element,
              position,
              transform: 0,
            })),
          };
        },
        () => {
          if (index !== 0) {
            this.slideToValue(index);
            this.handlers.index(index);
          }
        },
      );
    }
  };

  updateItems = (items) => {
    this.setState(() => ({ items }));
  };

  transformContainer = (transform) => {
    if (this.refContainer.current) {
      this.refContainer.current.style.transform = `translateX(${transform}%)`;
    }
  };

  slideToValue = (value) => {
    const { items } = this.state;
    const maxIndexItem = items.length - 1;
    const nextIndexItem = value;

    let i = 0;
    const direction = nextIndexItem > this.indexIndicator ? 'right' : 'left';
    while (nextIndexItem !== this.indexIndicator && i <= maxIndexItem) {
      this.transformItem(direction);
      i += 1;
    }
  };

  transformItem = (direction) => {
    const { bounded, step } = this.asProps;
    const { items } = this.state;
    const maxIndexIndicator = items.length - 1;
    let nextItemPosition = undefined;

    if (direction === 'right') {
      if (bounded && this.positionLeftItem === maxIndexIndicator) {
        return { activeItemIndex: maxIndexIndicator };
      }
      this.positionLeftItem += 1;
      const positionItemMax = position.getMax(items);

      if (this.positionLeftItem > positionItemMax) {
        nextItemPosition = position.getItemMin(items);
        items[nextItemPosition].position = positionItemMax + 1;
        items[nextItemPosition].transform += items.length * step;
        this.updateItems([...items]);
      }

      this.indexIndicator += 1;
      if (this.indexIndicator > maxIndexIndicator) {
        this.indexIndicator = 0;
      }
      this.transform -= step;
    }
    if (direction === 'left') {
      if (bounded && this.positionLeftItem === 0) {
        return { activeItemIndex: 0 };
      }
      this.positionLeftItem -= 1;
      const positionItemMin = position.getMin(items);

      if (this.positionLeftItem < positionItemMin) {
        nextItemPosition = position.getItemMax(items);
        items[nextItemPosition].position = positionItemMin - 1;
        items[nextItemPosition].transform -= items.length * step;
        this.updateItems([...items]);
      }

      this.indexIndicator -= 1;
      if (this.indexIndicator < 0) {
        this.indexIndicator = 0;
      }
      this.transform += step;
    }

    const activeItemIndex = items.findIndex((item) => item.position === this.positionLeftItem);
    if (items[activeItemIndex]) {
      items[
        activeItemIndex
      ].node.style.transform = `translateX(${items[activeItemIndex].transform}%)`;
    }
    this.transformContainer(this.transform);
    return { activeItemIndex };
  };

  bindHandlerClick = (direction) => {
    return () => {
      const { activeItemIndex } = this.transformItem(direction);
      this.handlers.index(activeItemIndex);
    };
  };

  bindHandlerClickIndicator = (value) => {
    return () => {
      this.slideToValue(value);
      this.handlers.index(value);
    };
  };

  getContainerProps() {
    const { duration } = this.asProps;

    return {
      ref: this.refContainer,
      duration,
    };
  }

  getItemProps() {
    return {
      $toogleItem: this.toogleItem,
    };
  }

  getPrevProps() {
    const { index, bounded } = this.asProps;
    const { items } = this.state;
    let disabled = false;
    if (items.length && bounded) {
      disabled = index === 0;
    }
    return { onClick: this.bindHandlerClick('left'), disabled };
  }

  getNextProps() {
    const { index, bounded } = this.asProps;
    const { items } = this.state;
    let disabled = false;
    if (items.length && bounded) {
      disabled = index === items.length - 1;
    }
    return { onClick: this.bindHandlerClick('right'), disabled };
  }

  getIndicatorsProps() {
    const { items } = this.state;
    const { index } = this.asProps;

    return {
      items: items.map((item, key) => ({
        active: key === index,
        onClick: this.bindHandlerClickIndicator(key),
      })),
    };
  }

  render() {
    const { Root: SCarousel } = this;
    const { Children, styles } = this.asProps;

    return styled(styles)(
      <SCarousel render={Box} onKeyDown={this.handleKeyDown} tabIndex={0}>
        <Children />
      </SCarousel>,
    );
  }
}

const Container = (props) => {
  const { styles, duration, Root: SContainer } = props;
  const speedAnimation = `${duration}ms`;

  return styled(styles)`
    SContainer {
      transition: transform ${speedAnimation} ease-in-out;
    }
  `(<SContainer render={Box} />);
};

const Item = (props) => {
  const { styles, $toogleItem, transform, Root: SItem } = props;
  const refItem = React.createRef();
  useEffect(() => {
    // add item
    $toogleItem({ node: refItem.current });
    return () => {
      // remove item
      $toogleItem({ node: refItem.current }, true);
    };
  }, []);

  return styled(styles)`
    SItem {
      transform: ${transform};
    }
  `(<SItem render={Box} ref={refItem} />);
};

const Prev = (props) => {
  const { Root: SPrev, styles, disabled } = props;
  return styled(styles)(<SPrev render={Box} disabled={disabled} />);
};

Prev.defaultProps = () => ({
  children: <ChevronLeftL interactive color="stone" />,
  top: 0,
});

const Next = (props) => {
  const { Root: SNext, styles, disabled } = props;
  return styled(styles)(<SNext render={Box} disabled={disabled} />);
};

Next.defaultProps = () => ({
  children: <ChevronRightL interactive color="stone" />,
  top: 0,
});

const Indicators = ({ Root: SIndicators, items, styles, Children }) => {
  const SIndicator = Box;
  if (Children.origin) {
    return <Children />;
  }
  return styled(styles)(
    <SIndicators render={Box}>
      {items.map((item) => (
        <SIndicator active={item.active} {...item} />
      ))}
    </SIndicators>,
  );
};

export default createComponent(Carousel, {
  Container,
  Indicators,
  Item,
  Prev,
  Next,
});
