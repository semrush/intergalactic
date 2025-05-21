import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Box, Flex } from '@semcore/flex-box';
import ChevronRight from '@semcore/icon/ChevronRight/l';
import ChevronLeft from '@semcore/icon/ChevronLeft/l';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import logger from '@semcore/core/lib/utils/logger';
import style from './style/carousel.shadow.css';
import CarouselType, {
  CarouselProps,
  CarouselState,
  CarouselContext,
  CarouselItem,
  CarouselItemProps,
  CarouselButtonProps,
  CarouselIndicatorsProps,
  CarouselIndicatorProps,
} from './Carousel.types';
import { BoxProps } from '@semcore/flex-box';
import { findAllComponents } from '@semcore/core/lib/utils/findComponent';
import { createBreakpoints } from '@semcore/breakpoints';

const MAP_TRANSFORM: Record<string, 'left' | 'right'> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;
const media = ['(min-width: 481px)', '(max-width: 480px)'];
const BreakPoints = createBreakpoints(media);
const isSmallScreen = (index?: number) => index === 1;

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
    indicators: 'default',
  };

  static style = style;
  static enhance = enhance;

  defaultItemsCount = 0;
  refCarousel = React.createRef<HTMLElement>();
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
      index: [
        null,
        (_index: number) => {
          this.refCarousel.current?.blur();
          setTimeout(() => {
            this.refCarousel.current?.focus();
          }, 0);
        },
      ],
    };
  }

  componentDidMount() {
    const { selectedIndex } = this.state;

    if (selectedIndex !== 0) {
      if (selectedIndex < 0 || selectedIndex >= this.defaultItemsCount) {
        logger.warn(
          true,
          `You couldn't use value for the \`index\` or \`defaultIndex\` not from \`Item's\` length range.`,
          CarouselRoot.displayName,
        );
        this.setState({ selectedIndex: 0 });
      } else {
        this.transformContainer();
      }
    }

    const deprecatedComponents = findAllComponents(this.asProps.Children, [
      'Carousel.Prev',
      'Carousel.Next',
      'Carousel.Indicators',
    ]);

    logger.warn(
      deprecatedComponents.length > 0,
      'Please, try to remove `Prev`, `Next`, `Indicators` and other children components from your Carousel, except only `Item` elements.',
      CarouselRoot.displayName,
    );
  }

  componentDidUpdate(prevProps: CarouselProps) {
    const { index } = this.asProps;
    if (prevProps.index !== index && this.isControlled && index !== undefined) {
      this.setState({ selectedIndex: index }, () => this.transformContainer());
    }
  }

  handlerKeyDown = (e: React.KeyboardEvent) => {
    const firstSlide = 1;
    const lastSlide = this.state.items.length + 1;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        e.preventDefault();
        this.transformItem(MAP_TRANSFORM[e.key]);
        break;
      }
      case 'Home': {
        e.preventDefault();
        this.slideToValue(firstSlide);
        break;
      }
      case 'End': {
        e.preventDefault();
        this.slideToValue(lastSlide);
        break;
      }
    }

    if (e.metaKey) {
      // like home or end
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.slideToValue(firstSlide);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.slideToValue(lastSlide);
      }
    }

    if (
      (e.key === 'Enter' || e.key === ' ') &&
      e.target instanceof HTMLDivElement &&
      e.target.role === 'tabpanel'
    ) {
      this.handleToggleZoomModal();
    }
  };

  toggleItem = (item: CarouselItem, removeItem = false) => {
    this.setState((prevState) => {
      const newItems = removeItem
        ? prevState.items.filter((element) => element.node !== item.node)
        : [...prevState.items, item];

      return {
        items: newItems,
      };
    });

    if (!removeItem) {
      this.defaultItemsCount++;
    }
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
    const { bounded } = this.asProps;
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
        () => {
          this.transformContainer();
          this.handlers.index(this.getIndex());
        },
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
        () => {
          this.transformContainer();
          this.handlers.index(this.getIndex());
        },
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
      const { selectedIndex, items } = this.state;
      if (!this.isControlled && value !== selectedIndex) {
        const newValueIndex = Math.floor(selectedIndex / items.length) * items.length + value;
        this.slideToValue(newValueIndex);
      }
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
    const { zoom } = this.asProps;
    const isCurrent = this.isSelected(index);

    return {
      toggleItem: this.toggleItem,
      uid: this.asProps.uid,
      index,
      current: isCurrent,
      zoomIn: zoom,
      onToggleZoomModal: this.handleToggleZoomModal,
      transform: isCurrent ? this.getTransform() : undefined,
      isOpenZoom: this.state.isOpenZoom,
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
        if (this.state.isOpenZoom) {
          this.transformContainer();
        }
      },
    );
  };

  bindHandlerKeydownControl = (direction: 'left' | 'right') => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.bindHandlerClick(direction)();
    }
  };

  getPrevProps() {
    const { bounded, getI18nText, uid } = this.asProps;
    const { items, selectedIndex } = this.state;
    let disabled = false;
    if (items.length && bounded) {
      disabled = selectedIndex === 0;
    }
    return {
      onClick: this.bindHandlerClick('left'),
      onKeyDown: this.bindHandlerKeydownControl('left'),
      disabled,
      label: getI18nText('prev'),
      'aria-controls': `igc-${uid}-carousel`,
    };
  }

  getNextProps() {
    const { bounded, getI18nText, uid } = this.asProps;
    const { items, selectedIndex } = this.state;
    let disabled = false;
    if (items.length && bounded) {
      disabled = selectedIndex === items.length - 1;
    }

    return {
      onClick: this.bindHandlerClick('right'),
      onKeyDown: this.bindHandlerKeydownControl('right'),
      disabled,
      label: getI18nText('next'),
      'aria-controls': `igc-${uid}-carousel`,
    };
  }

  getIndicatorsProps() {
    const { items } = this.state;
    const { getI18nText } = this.asProps;

    return {
      items: items.map((item, key) => ({
        active: this.isSelected(key),
        onClick: this.bindHandlerClickIndicator(key),
        key,
      })),
      role: 'tablist',
      tabIndex: 0,
      'aria-label': getI18nText('slides'),
    };
  }

  getIndicatorProps(_: any, index: number) {
    const isCurrent = this.isSelected(index);
    const { getI18nText } = this.asProps;

    return {
      role: 'tab',
      'aria-selected': isCurrent,
      'aria-controls': `igc-${this.asProps.uid}-carousel-item-${index}`,
      'aria-label': getI18nText('slide', { slideNumber: index + 1 }),
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

  getIndex() {
    const { items, selectedIndex } = this.state;

    if (items.length === 0) {
      return 0;
    }

    if (selectedIndex >= 0) {
      return selectedIndex % items.length;
    }

    return (items.length + (selectedIndex % items.length)) % items.length;
  }

  isSelected(index: number) {
    const { items } = this.state;

    if (items.length === 0) {
      return true;
    }

    return index === this.getIndex();
  }

  renderModal(isSmall: boolean, ComponentItems: any[]) {
    const SModalContainer = Root;
    const SModalBox = Box;
    const { styles, uid, duration, zoomWidth } = this.asProps;
    const { isOpenZoom } = this.state;

    return sstyled(styles)(
      <Modal
        visible={isOpenZoom}
        onClose={this.handleToggleZoomModal}
        ghost={true}
        closable={!isSmall}
      >
        <Flex direction={isSmall ? 'column' : 'row'}>
          {!isSmall && <Carousel.Prev inverted={true} />}
          <SModalBox>
            <SModalContainer
              render={Box}
              aria-live='polite'
              use:duration={`${duration}ms`}
              ref={this.refModalContainer}
              use:w={undefined}
              wMax={zoomWidth}
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
          </SModalBox>
          {isSmall ? (
            <Flex justifyContent={'center'} mt={2}>
              <Carousel.Prev inverted={true} />
              <Carousel.Next inverted={true} />
            </Flex>
          ) : (
            <Carousel.Next inverted={true} />
          )}
        </Flex>
        {!isSmall && <Carousel.Indicators inverted={true} />}
      </Modal>,
    );
  }

  render() {
    const SCarousel = Root;
    const {
      styles,
      Children,
      uid,
      zoom: hasZoom,
      'aria-label': ariaLabel,
      'aria-roledescription': ariaRoledescription,
      indicators,
    } = this.asProps;
    const ComponentItems = findAllComponents(Children, ['Carousel.Item']);
    const Controls = findAllComponents(Children, [
      'Carousel.Prev',
      'Carousel.Next',
      'Carousel.Indicators',
    ]);

    return sstyled(styles)(
      <SCarousel
        render={Box}
        role='region'
        roledescription='carousel'
        onKeyDown={this.handlerKeyDown}
        onTouchStart={this.handlerTouchStart}
        onTouchEnd={this.handlerTouchEnd}
        ref={this.refCarousel}
        id={`igc-${uid}-carousel`}
        aria-roledescription={ariaRoledescription}
      >
        {Controls.length === 0 ? (
          <>
            <Flex>
              <Carousel.Prev />
              <Carousel.ContentBox>
                <Carousel.Container aria-label={ariaLabel}>
                  <Children />
                </Carousel.Container>
              </Carousel.ContentBox>
              <Carousel.Next />
            </Flex>
            {indicators === 'default' && <Carousel.Indicators />}
            {indicators === 'preview' && (
              <Carousel.Indicators>
                {() =>
                  ComponentItems.map((item, index) => (
                    <Carousel.Indicator
                      {...item.props}
                      key={item.key}
                      w={100}
                      h={100}
                      aria-roledescription='slide'
                      active={this.isSelected(index)}
                      onClick={this.bindHandlerClickIndicator(index)}
                    />
                  ))
                }
              </Carousel.Indicators>
            )}
          </>
        ) : (
          <Children />
        )}
        {hasZoom && (
          <BreakPoints>
            <BreakPoints.Context.Consumer>
              {(mediaIndex) => this.renderModal(isSmallScreen(mediaIndex), ComponentItems)}
            </BreakPoints.Context.Consumer>
          </BreakPoints>
        )}
      </SCarousel>,
    );
  }
}

const Container = (props: BoxProps & { duration?: number }) => {
  const SContainer = Root;
  const { styles, duration } = props;

  return sstyled(styles)(
    <SContainer render={Box} use:duration={`${duration}ms`} aria-live='polite' />,
  );
};

const ContentBox = (props: BoxProps) => {
  const SContentBox = Root;
  const { styles } = props;

  return sstyled(styles)(<SContentBox render={Box} />);
};

class Item extends Component<CarouselItemProps> {
  refItem = React.createRef<HTMLElement>();

  componentDidMount() {
    const { toggleItem, transform } = this.props;
    const refItem = this.refItem.current;

    toggleItem && refItem && toggleItem({ node: refItem });

    if (transform && refItem) {
      refItem.style.transform = `translateX(${transform}%)`;
    }
  }

  componentWillUnmount() {
    const { toggleItem } = this.props;
    const refItem = this.refItem.current;

    toggleItem && refItem && toggleItem({ node: refItem }, true);
  }

  componentDidUpdate(prevProps: CarouselItemProps) {
    const transform = this.props.transform;
    const refItem = this.refItem.current;

    if (prevProps.transform !== transform && refItem) {
      refItem.style.transform = `translateX(${transform}%)`;
    }
  }

  render() {
    const { styles, index, uid, current, zoomIn, onToggleZoomModal } = this.props;
    const SItem = Root;

    return sstyled(styles)(
      <SItem
        render={Box}
        ref={this.refItem}
        role='tabpanel'
        data-carousel={`igc-${uid}-carousel`}
        id={`igc-${uid}-carousel-item-${index}`}
        aria-current={current}
        use:tabIndex={current ? 0 : -1}
        onClick={zoomIn ? onToggleZoomModal : undefined}
        zoomIn={zoomIn}
      />,
    );
  }
}

const Prev = (props: CarouselButtonProps) => {
  const { styles, children, Children, label, top = 0, inverted } = props;
  const SPrev = Root;
  const SPrevButton = Button;

  return sstyled(styles)(
    <SPrev render={Box} top={top}>
      {children ? (
        <Children />
      ) : (
        <SPrevButton
          addonLeft={ChevronLeft}
          aria-label={label}
          theme={inverted ? 'invert' : 'muted'}
          use={'tertiary'}
          size={'l'}
          innerOutline
        />
      )}
    </SPrev>,
  );
};

const Next = (props: CarouselButtonProps) => {
  const { styles, children, Children, label, top = 0, inverted } = props;
  const SNext = Root;
  const SNextButton = Button;

  return sstyled(styles)(
    <SNext render={Box} top={top}>
      {children ? (
        <Children />
      ) : (
        <SNextButton
          addonLeft={ChevronRight}
          aria-label={label}
          theme={inverted ? 'invert' : 'muted'}
          use={'tertiary'}
          size={'l'}
          innerOutline
        />
      )}
    </SNext>,
  );
};

const Indicators = ({ items, styles, Children, inverted }: CarouselIndicatorsProps) => {
  const SIndicators = Root;
  if (Children.origin) {
    return sstyled(styles)(
      <SIndicators render={Box}>
        <Children />
      </SIndicators>,
    );
  }
  return sstyled(styles)(
    <SIndicators render={Box}>
      {items?.map((item: CarouselItem, index: number) => (
        <Carousel.Indicator key={index} {...item} inverted={inverted} />
      ))}
    </SIndicators>,
  );
};

const Indicator = ({ styles, Children }: CarouselIndicatorProps) => {
  const SIndicator = Root;
  return sstyled(styles)(
    <SIndicator render={Box}>
      <Children />
    </SIndicator>,
  );
};

const Carousel: typeof CarouselType = createComponent(CarouselRoot, {
  Container,
  ContentBox,
  Indicators,
  Indicator,
  Item,
  Prev,
  Next,
});

export default Carousel;
