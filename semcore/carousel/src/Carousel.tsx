import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Box, Flex } from '@semcore/flex-box';
import ChevronRight from '@semcore/icon/ChevronRight/l';
import ChevronLeft from '@semcore/icon/ChevronLeft/l';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import style from './style/carousel.shadow.css';
import CarouselType, {
  CarouselProps,
  CarouselState,
  CarouselContext,
  CarouselItem,
  CarouselItemProps,
  CarouselButtonProps,
} from './Carousel.types';
import { BoxProps } from '@semcore/flex-box/src';
import { IRootComponentProps } from '@semcore/core/src';
import { findAllComponents } from '@semcore/utils/lib/findComponent';

const MAP_TRANSFORM: Record<string, 'left' | 'right'> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const enhance = {
  uid: uniqueIDEnhancement(),
  getI18nText: i18nEnhance(localizedMessages),
};

class CarouselRoot extends Component<
  CarouselProps,
  CarouselContext,
  CarouselState,
  typeof enhance
> {
  static displayName = 'Carousel';
  static defaultProps = {
    defaultIndex: 0,
    duration: 350,
    step: 100,
    bounded: false,
    i18n: localizedMessages,
    locale: 'en',
  };

  static style = style;
  static enhance = Object.values(enhance);

  refContainer = React.createRef<HTMLElement>();
  refModalContainer = React.createRef<HTMLElement>();
  _touchStartCoord = -1;

  constructor(props: CarouselProps) {
    super(props);
    this.isControlled = props.index !== undefined;
    this.state = {
      items: [],
      isOpenZoom: false,
      selectedIndex: props.index ?? props.defaultIndex ?? 0,
    };
  }

  uncontrolledProps() {
    return {
      index: null,
    };
  }

  componentDidMount() {
    if (this.state.selectedIndex !== 0) {
      this.transformContainer();
    }
  }

  componentDidUpdate(prevProps: CarouselProps) {
    const { index } = this.asProps;
    if (prevProps.index !== index && this.isControlled && index !== undefined) {
      this.setState({ selectedIndex: index });
    }
  }

  handlerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        e.preventDefault();
        this.transformItem(MAP_TRANSFORM[e.key]);
      }
    }
  };

  toggleItem = (item: CarouselItem, removeItem = false) => {
    const { items, selectedIndex } = this.state;
    if (removeItem) {
      this.updateItems(items.filter((element) => element.node !== item.node));
    } else {
      this.setState(
        (state) => {
          return {
            items: [...state.items, item],
          };
        },
        // () => {
        //   const { items, selectedIndex } = this.state;
        //   if (items.length > selectedIndex && selectedIndex >= 0) {
        //     console.log('slide', selectedIndex);
        //     this.slideToValue(selectedIndex);
        //   }
        // },
      );
    }
  };

  updateItems = (items: CarouselItem[]) => {
    this.setState(() => ({ items }));
  };

  transformContainer = () => {
    const transform = this.state.selectedIndex * -1 * 100;

    if (this.refContainer.current) {
      this.refContainer.current.style.transform = `translateX(${transform}%)`;
    }
    if (this.refModalContainer.current) {
      this.refModalContainer.current.style.transform = `translateX(${transform}%)`;
    }
  };

  getDirection = (currentIndex: number, nextIndex: number) => {
    const { bounded } = this.asProps;

    if (bounded) {
      return currentIndex < nextIndex ? 'right' : 'left';
    }
    const { items } = this.state;
    const listIndex = items.map((_, ind) => ind);
    const tmpArr = [...listIndex];
    const minTmpArr = tmpArr[0];
    const maxTmpArr = tmpArr[tmpArr.length - 1];

    if (tmpArr.length === 2) {
      return currentIndex < nextIndex ? 'right' : 'left';
    }
    if (currentIndex === minTmpArr) {
      tmpArr.unshift(maxTmpArr);
      tmpArr.pop();
    }
    if (currentIndex === maxTmpArr) {
      tmpArr.shift();
      tmpArr.push(minTmpArr);
    }

    const tmpCurrentIndex = tmpArr.indexOf(currentIndex);
    const left = tmpArr.indexOf(nextIndex);

    return left - tmpCurrentIndex < 0 ? 'left' : 'right';
  };

  slideToValue = (nextIndex: number) => {
    const { selectedIndex } = this.state;
    const direction = selectedIndex < nextIndex ? 'right' : 'left';
    let diff = Math.abs(selectedIndex - nextIndex);
    while (diff > 0) {
      this.transformItem(direction);
      diff--;
    }
  };

  transformItem = (direction: 'left' | 'right') => {
    const { bounded, step } = this.asProps;
    const { items, selectedIndex } = this.state;
    const maxIndexIndicator = items.length - 1;

    if (direction === 'right') {
      if (bounded && selectedIndex === maxIndexIndicator) {
        this.handlers.index(maxIndexIndicator);

        return;
      }
      if (this.isControlled) {
        this.handlers.index(selectedIndex === maxIndexIndicator ? 0 : selectedIndex + 1);

        return;
      }

      this.setState(
        (prevState) => ({
          selectedIndex: prevState.selectedIndex + 1,
        }),
        () => this.transformContainer(),
      );

      return;
    }
    if (direction === 'left') {
      if (bounded && selectedIndex === 0) {
        this.handlers.index(0);

        return;
      }
      if (this.isControlled) {
        this.handlers.index(selectedIndex === 0 ? maxIndexIndicator : selectedIndex - 1);

        return;
      }

      this.setState(
        (prevState) => ({
          selectedIndex: prevState.selectedIndex - 1,
        }),
        () => this.transformContainer(),
      );

      return;
    }
  };

  bindHandlerClick = (direction: 'left' | 'right') => {
    return () => {
      this.transformItem(direction);
    };
  };

  bindHandlerClickIndicator = (value: number) => {
    return () => {
      !this.isControlled && value !== this.state.selectedIndex && this.slideToValue(value);
      this.handlers.index(value);
    };
  };

  handlerTouchStart = (e: React.TouchEvent) => {
    this._touchStartCoord = e.changedTouches[0].clientX;
  };

  handlerTouchEnd = (e: React.TouchEvent) => {
    const touchEndCoord = e.changedTouches[0].clientX;
    const delta = touchEndCoord - this._touchStartCoord;
    if (delta > 50) {
      this.transformItem('left');
    } else if (delta < -50) {
      this.transformItem('right');
    }
  };

  getContainerProps() {
    const { duration } = this.asProps;

    return {
      ref: this.refContainer,
      duration,
    };
  }

  getItemProps(props: CarouselItemProps, index: number) {
    const isCurrent = this.isSelected(index);

    return {
      toggleItem: this.toggleItem,
      uid: this.asProps.uid,
      index,
      current: isCurrent,
      onToggleZoomModal: this.handleToggleZoomModal,
      transform: isCurrent ? this.getTransform() : undefined,
    };
  }

  handleToggleZoomModal = () => {
    this.setState(
      (prevState) => {
        return {
          isOpenZoom: !prevState.isOpenZoom,
        };
      },
      () => {
        this.state.isOpenZoom && this.transformContainer();
      },
    );
  };

  bindHandlerKeydownControl = (direction: 'left' | 'right') => (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      this.bindHandlerClick(direction)();
    }
  };

  getPrevProps() {
    const { index, bounded, getI18nText } = this.asProps;
    const { items } = this.state;
    let disabled = false;
    if (items.length && bounded) {
      disabled = index === 0;
    }
    return {
      onClick: this.bindHandlerClick('left'),
      onKeyDown: this.bindHandlerKeydownControl('left'),
      disabled,
      label: getI18nText('prev'),
    };
  }

  getNextProps() {
    const { index, bounded, getI18nText } = this.asProps;
    const { items } = this.state;
    let disabled = false;
    if (items.length && bounded) {
      disabled = index === items.length - 1;
    }
    return {
      onClick: this.bindHandlerClick('right'),
      onKeyDown: this.bindHandlerKeydownControl('right'),
      disabled,
      label: getI18nText('next'),
    };
  }

  getIndicatorsProps() {
    const { items, isOpenZoom } = this.state;

    return {
      items: items.map((item, key) => ({
        active: this.isSelected(key),
        onClick: this.bindHandlerClickIndicator(key),
        key,
        inverted: isOpenZoom,
      })),
    };
  }

  getTransform() {
    const { items, selectedIndex } = this.state;

    const direction = selectedIndex > 0 ? 1 : -1;
    const count = items.length === 0 ? 0 : Math.floor(selectedIndex / items.length) * direction;
    const transform =
      selectedIndex > 0 && selectedIndex < items.length
        ? 0
        : 100 * direction * count * items.length;

    return transform;
  }

  isSelected(index: number) {
    const { items, selectedIndex } = this.state;

    if (items.length === 0) {
      return true;
    }

    if (selectedIndex >= 0) {
      return index === selectedIndex % items.length;
    }

    return index === (items.length + (selectedIndex % items.length)) % items.length;
  }

  render() {
    const SCarousel = Root;
    const { styles, Children, index, uid, duration, zoomWidth } = this.asProps;
    const { items, isOpenZoom } = this.state;
    const SModalContainer = Root;
    const hasZoom = items.some((item) => item.zoom);
    const ComponentItems = findAllComponents(Children, ['Carousel.Item']);

    return sstyled(styles)(
      <SCarousel
        render={Box}
        role='group'
        onKeyDown={this.handlerKeyDown}
        tabIndex={0}
        onTouchStart={this.handlerTouchStart}
        onTouchEnd={this.handlerTouchEnd}
      >
        <Children />
        {hasZoom && (
          <Modal visible={isOpenZoom} onClose={this.handleToggleZoomModal} ghost={true}>
            <Flex>
              <Carousel.Prev inverted={true} />
              <Box style={{ overflow: 'hidden', borderRadius: 6 }}>
                <SModalContainer
                  render={Box}
                  role='list'
                  use:duration={`${duration}ms`}
                  ref={this.refModalContainer}
                  wMin={zoomWidth}
                >
                  {ComponentItems.map((item, i) => {
                    return (
                      <Carousel.Item
                        {...item.props}
                        key={item.key}
                        uid={uid}
                        index={i}
                        current={this.isSelected(i)}
                        toggleItem={undefined}
                        zoom={true}
                        zoomOut={true}
                        transform={this.isSelected(i) ? this.getTransform() : undefined}
                      />
                    );
                  })}
                </SModalContainer>
              </Box>
              <Carousel.Next inverted={true} />
            </Flex>
            <Carousel.Indicators inverted={true} />
          </Modal>
        )}
      </SCarousel>,
    );
  }
}

const Container = (props: BoxProps & { duration?: number }) => {
  const SContainer = Root;
  const { styles, duration } = props;

  return sstyled(styles)(<SContainer render={Box} role='list' use:duration={`${duration}ms`} />);
};

const Item = (props: CarouselItemProps) => {
  const { styles, toggleItem, index, uid, current, zoom, onToggleZoomModal, transform } = props;
  const SItem = Root;
  const refItem = React.createRef<HTMLElement>();
  React.useEffect(() => {
    // add item
    toggleItem && refItem.current && toggleItem({ node: refItem.current, zoom });
    return () => {
      // remove item
      toggleItem && refItem.current && toggleItem({ node: refItem.current, zoom }, true);
    };
  }, []);

  React.useEffect(() => {
    if (refItem.current) {
      refItem.current.style.transform = `translateX(${transform}%)`;
    }
  }, [transform]);

  return sstyled(styles)(
    <SItem
      render={Box}
      ref={refItem}
      role='listitem'
      id={`igc-${uid}-carousel-item-${index}`}
      aria-current={current}
      onClick={zoom ? onToggleZoomModal : undefined}
      zoomIn={zoom}
    />,
  );
};

const Prev = (props: CarouselButtonProps) => {
  const { styles, children, Children, label, top = 0, inverted } = props;
  const SPrev = Root;
  const [isActive, setIsActive] = React.useState(false);
  const handleMouseEnter = React.useCallback(() => {
    setIsActive(true);
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    setIsActive(false);
  }, []);

  return sstyled(styles)(
    <SPrev render={Box} top={top} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children ? (
        <Children />
      ) : (
        <Button
          addonLeft={ChevronLeft}
          aria-label={label}
          theme={inverted ? 'invert' : 'muted'}
          use={'tertiary'}
          active={isActive}
          size={'l'}
        />
      )}
    </SPrev>,
  );
};

const Next = (props: CarouselButtonProps) => {
  const { styles, children, Children, label, top = 0, inverted } = props;
  const SNext = Root;
  const [isActive, setIsActive] = React.useState(false);
  const handleMouseEnter = React.useCallback(() => {
    setIsActive(true);
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    setIsActive(false);
  }, []);

  return sstyled(styles)(
    <SNext render={Box} top={top} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children ? (
        <Children />
      ) : (
        <Button
          addonLeft={ChevronRight}
          aria-label={label}
          theme={inverted ? 'invert' : 'muted'}
          use={'tertiary'}
          active={isActive}
          size={'l'}
        />
      )}
    </SNext>,
  );
};

const Indicators = ({
  items,
  styles,
  Children,
}: IRootComponentProps & { items: CarouselItem[] }) => {
  const SIndicators = Root;
  if (Children.origin) {
    return sstyled(styles)(
      <SIndicators render={Box} aria-hidden='true'>
        <Children />
      </SIndicators>,
    );
  }
  return sstyled(styles)(
    <SIndicators render={Box} aria-hidden='true'>
      {items.map((item, index) => (
        <Carousel.Indicator key={index} {...item} />
      ))}
    </SIndicators>,
  );
};

const Indicator = ({ styles, Children }: IRootComponentProps & CarouselItem) => {
  const SIndicator = Root;
  return sstyled(styles)(
    <SIndicator render={Box}>
      <Children />
    </SIndicator>,
  );
};

const Carousel: typeof CarouselType = createComponent(CarouselRoot, {
  Container,
  Indicators,
  Indicator,
  Item,
  Prev,
  Next,
});

export default Carousel;
