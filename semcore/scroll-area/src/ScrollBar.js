import React from 'react';
import { findDOMNode } from 'react-dom';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { getNodeByRef } from '@semcore/utils/lib/ref';

import style from './style/scroll-bar.shadow.css';

export const DEFAULT_SLIDER_SIZE = 50;

class ScrollBarRoot extends Component {
  static displayName = 'Bar';

  static style = style;

  static defaultProps = () => {
    return {
      container: React.createRef(),
      children: <ScrollBar.Slider />,
    };
  };

  $bar = null;
  $slider = null;

  sliderStyle = { width: DEFAULT_SLIDER_SIZE, height: DEFAULT_SLIDER_SIZE };

  kefScroll = { x: 0, y: 0 };
  kefBar = { x: 0, y: 0 };

  _scroll = { left: 0, top: 0 };
  _mouse = { pageX: 0, pageY: 0 };

  state = {
    visibleScroll: false,
  };

  get $container() {
    return getNodeByRef(this.asProps.container);
  }

  refBar = (node) => (this.$bar = findDOMNode(node));
  refSlider = (node) => (this.$slider = findDOMNode(node));

  calculateVisibleScroll() {
    const orientation = this.getOrientation();
    const [horizontal, vertical] = this.calculateOrientation();

    if (horizontal && orientation === 'horizontal') {
      return true;
    } else if (vertical && orientation === 'vertical') {
      return true;
    }

    return false;
  }

  calculateKefScroll() {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = this.$container;
    const { clientWidth: clientWidthBar, clientHeight: clientHeightBar } = this.$bar;
    const { width, height } = this.sliderStyle;
    return {
      x: (clientWidthBar - width) / (scrollWidth - clientWidth),
      y: (clientHeightBar - height) / (scrollHeight - clientHeight),
    };
  }

  calculateKefBar() {
    const { clientWidth, clientHeight } = this.$bar;
    const { width, height } = this.sliderStyle;
    return {
      x: (clientWidth - width) / clientWidth,
      y: (clientHeight - height) / clientHeight,
    };
  }

  calculateSliderStyle() {
    const { clientWidth, clientHeight } = this.$bar;
    const { scrollWidth, scrollHeight } = this.$container;

    const calculateDimensions = (visibleSize, totalSize) => {
      const ratio = Math.min(visibleSize / totalSize, 1); // percentage of visible area
      return Math.round(visibleSize * ratio);
    };

    return {
      width: Math.max(calculateDimensions(clientWidth, scrollWidth), DEFAULT_SLIDER_SIZE),
      height: Math.max(calculateDimensions(clientHeight, scrollHeight), DEFAULT_SLIDER_SIZE),
    };
  }

  calculateScrollByClick(position, windowOffset, mouseOffset, kefBar, kefScroll) {
    // bar coordinates relative to the page
    const barPage = position + windowOffset;

    // click coordinates - bar coordinates * proportion
    const scroll = (mouseOffset - barPage) * kefBar;

    return scroll / kefScroll;
  }

  calculateScrollByDiff(mouseOffset, oldMouseOffset, oldScroll, kefScroll) {
    // mouse offset (new coordinates - old coordinates)
    const offsetMouse = mouseOffset - oldMouseOffset;

    // old scroll position * scroll ratio + offset
    const scroll = oldScroll * kefScroll + offsetMouse;

    return scroll / kefScroll;
  }

  calculateOrientation() {
    if (!this.$container) return [false, false];
    const { scrollWidth, scrollHeight, clientWidth, clientHeight } = this.$container;
    return [scrollWidth > clientWidth, scrollHeight > clientHeight];
  }

  calculate = () => {
    if (!this.$container) return;

    const visibleScroll = this.calculateVisibleScroll();

    this.setState({ visibleScroll }, () => {
      if (!this.$container || !this.$bar || !this.$slider) return;
      const orientation = this.getOrientation();

      this.sliderStyle = this.calculateSliderStyle();
      this.kefBar = this.calculateKefBar();
      this.kefScroll = this.calculateKefScroll();

      if (orientation === 'horizontal') {
        this.$slider.style.width = `${this.sliderStyle.width}px`;
      } else if (orientation === 'vertical') {
        this.$slider.style.height = `${this.sliderStyle.height}px`;
      }
      // Пересчитать позицию скролл при изменении размера контейнера
      this.handleScroll();
    });
  };

  handleScroll = () => {
    if (!this.$container || !this.$slider) return;

    const { scrollTop, scrollLeft } = this.$container;
    const orientation = this.getOrientation();

    if (orientation === 'horizontal') {
      this.$slider.style.transform = `translateX(${scrollLeft * this.kefScroll.x}px)`;
    } else if (orientation === 'vertical') {
      this.$slider.style.transform = `translateY(${scrollTop * this.kefScroll.y}px)`;
    }
  };

  getOrientation() {
    if (this.asProps.orientation !== undefined) return this.asProps.orientation;
    const [horizontal, vertical] = this.calculateOrientation();
    if (vertical) return 'vertical';
    if (horizontal) return 'horizontal';
  }

  handleSelectStartDocument = (e) => e.preventDefault();

  handleMouseMoveDocument = (e) => {
    const { pageX, pageY } = e;
    const { left, top } = this._scroll;
    const { x, y } = this.kefScroll;
    const orientation = this.getOrientation();

    if (orientation === 'horizontal') {
      this.$container.scrollLeft = this.calculateScrollByDiff(pageX, this._mouse.pageX, left, x);
    } else if (orientation === 'vertical') {
      this.$container.scrollTop = this.calculateScrollByDiff(pageY, this._mouse.pageY, top, y);
    }
  };

  handleMouseUpDocument = () => {
    document.removeEventListener('mousemove', this.handleMouseMoveDocument, true);
    document.removeEventListener('mouseup', this.handleMouseUpDocument, true);
    document.removeEventListener('selectstart', this.handleSelectStartDocument, true);
  };

  handleMouseDownSlider = (e) => {
    // canceling the emergence of a real scroll
    e.stopPropagation();
    // save mouse coordinates (relative to the page)
    this._mouse = { pageX: e.pageX, pageY: e.pageY };
    // save the scroll of the container
    // TODO: what happens if the content increases while we scroll?
    const { scrollLeft, scrollTop } = this.$container;
    this._scroll = { left: scrollLeft, top: scrollTop };

    document.addEventListener('mousemove', this.handleMouseMoveDocument, true);
    document.addEventListener('mouseup', this.handleMouseUpDocument, true);
    document.addEventListener('selectstart', this.handleSelectStartDocument, true);
  };

  handleMouseDownBar = (e) => {
    // cancellation of the ascent as in a real scroll
    e.stopPropagation();

    const { pageX, pageY } = e;
    const { pageXOffset, pageYOffset } = window;
    const { left, top } = this.$bar.getBoundingClientRect();
    const orientation = this.getOrientation();

    if (orientation === 'horizontal') {
      this.$container.scrollLeft = this.calculateScrollByClick(
        left,
        pageXOffset,
        pageX,
        this.kefBar.x,
        this.kefScroll.x,
      );
    } else if (orientation === 'vertical') {
      this.$container.scrollTop = this.calculateScrollByClick(
        top,
        pageYOffset,
        pageY,
        this.kefBar.y,
        this.kefScroll.y,
      );
    }
  };

  subscribe($node) {
    if (!$node) return;
    $node.addEventListener('scroll', this.handleScroll);
    $node.addEventListener('calculate', this.calculate);
  }

  unsubscribe($node) {
    if (!$node) return;
    $node.removeEventListener('scroll', this.handleScroll);
    $node.removeEventListener('calculate', this.calculate);
  }

  getSliderProps() {
    return {
      ref: this.refSlider,
      onMouseDown: this.handleMouseDownSlider,
    };
  }

  componentDidMount() {
    this.subscribe(this.$container);
  }

  componentWillUnmount() {
    this.unsubscribe(this.$container);
  }

  render() {
    const SScrollBar = Root;
    const { styles } = this.asProps;
    const { visibleScroll } = this.state;

    if (!visibleScroll) {
      return null;
    }

    return sstyled(styles)(
      <SScrollBar
        render={Box}
        ref={this.refBar}
        onMouseDown={this.handleMouseDownBar}
        orientation={this.getOrientation()}
      />,
    );
  }
}

function Slider(props) {
  const { styles } = props;
  const SSlider = Root;

  return sstyled(styles)(<SSlider render={Box} onDragStart={() => false} />);
}

const ScrollBar = createComponent(ScrollBarRoot, {
  Slider,
});

export default ScrollBar;
