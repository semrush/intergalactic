import React from 'react';
import { findDOMNode } from 'react-dom';

import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import trottle from '@semcore/utils/lib/rafTrottle';
import { getNodeByRef } from '@semcore/utils/lib/ref';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import BarRoot, { setAreaValue } from './ScrollBar';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import canUseDOM from '@semcore/utils/lib/canUseDOM';

import style from './style/scroll-area.shadow.css';

let eventCalculate = undefined;
if (typeof window !== 'undefined') {
  eventCalculate = new Event('calculate');
}

const BoxWithoutPosition = React.forwardRef(({ position, ...props }, ref) => (
  <Box ref={ref} {...props} />
));

class ScrollAreaRoot extends Component {
  static displayName = 'ScrollArea';

  static style = style;
  static enhance = [uniqueIDEnhancement(), keyboardFocusEnhance()];

  static defaultProps = () => ({
    container: React.createRef(),
    inner: React.createRef(),
    tabIndex: 0,
  });

  $wrapper = null;
  observer = null;
  horizontalBarRef = React.createRef();
  verticalBarRef = React.createRef();

  get $container() {
    return getNodeByRef(this.asProps.container);
  }

  get $inner() {
    return getNodeByRef(this.asProps.inner);
  }

  state = {
    shadowHorizontal: false,
    shadowVertical: false,
  };

  constructor(props) {
    super(props);

    if (canUseDOM()) {
      this.observer = new ResizeObserver(callAllEventHandlers(props.onResize, this.calculate));
    }
  }

  refWrapper = (node) => {
    this.$wrapper = findDOMNode(node);
  };

  setStyleSizeProperty = (element, propertyKey, value) => {
    let propertyValue = value;

    if (typeof value === 'number') {
      propertyValue = value < 1 ? `${100 * value}%` : `${value}px`;
    }

    element.style.setProperty(propertyKey, propertyValue);
  };

  // for max height/width
  calculateSizeContainer() {
    const size = { width: '', height: '' };
    if (!this.$container || !this.$wrapper) return size;
    const { scrollWidth, scrollHeight } = this.$container;
    const style = window.getComputedStyle(this.$wrapper);
    const parent = this.$wrapper.parentElement;
    const parentRect = parent?.getBoundingClientRect() ?? { width: 0, height: 0 };
    const { wMax, hMax } = this.asProps;

    if (wMax) this.setStyleSizeProperty(this.$wrapper, 'max-width', wMax);
    if (hMax) this.setStyleSizeProperty(this.$wrapper, 'max-height', hMax);

    let maxWidth = Number.parseInt(style.getPropertyValue('max-width'));
    let maxHeight = Number.parseInt(style.getPropertyValue('max-height'));

    if (maxWidth) {
      if (wMax && parent.scrollWidth > parentRect.width) {
        const diff = parent.scrollWidth - parentRect.width;

        if (diff < maxWidth) {
          maxWidth = maxWidth - diff;

          this.$wrapper.style.setProperty('max-width', `${maxWidth}px`);
        }
      }

      if (scrollWidth > maxWidth) {
        size.width = `${maxWidth}px`;
      } else {
        size.width = '100%';
      }
    }

    if (maxHeight) {
      if (hMax && parent.scrollHeight > parentRect.height) {
        const diff = parent.scrollHeight - parentRect.height;

        if (diff < maxHeight) {
          maxHeight = maxHeight - diff;

          this.$wrapper.style.setProperty('max-height', `${maxHeight}px`);
        }
      }

      if (scrollHeight > maxHeight) {
        size.height = `${maxHeight}px`;
      } else {
        size.height = '100%';
      }
    }

    return size;
  }

  calculate = trottle(() => {
    if (!this.$container) return;

    const { height, width } = this.calculateSizeContainer();
    if (height) this.$container.style.height = height;
    if (width) this.$container.style.width = width;
    this.$container.dispatchEvent(eventCalculate);
    this.setShadowContainer();
  });

  updateBarsAria = trottle(() => {
    setAreaValue(this.$container, this.horizontalBarRef.current, this.verticalBarRef.current);
  });

  handleScrollContainer = trottle(() => {
    if (!this.$container) return;
    this.setShadowContainer();
    this.updateBarsAria();
  });

  // FIX Chrome bug, when focus state on hide control
  handleScroll = (e) => {
    if (e.target?.isEqualNode(this.$wrapper)) {
      e.target.scrollTop = 0;
      e.target.scrollLeft = 0;
    }
  };

  handleFocusIn = (e) => {
    setTimeout(() => {
      const { keyboardFocused, leftOffset, rightOffset, topOffset, bottomOffset } = this.asProps;

      if (this.$container && typeof this.$container.scrollTo === 'function') {
        const viewPort = this.$container.getBoundingClientRect();
        const element = e.target.getBoundingClientRect();

        const offset = {
          top: topOffset ?? 0,
          left: leftOffset ?? 0,
          right: rightOffset ?? 0,
          bottom: bottomOffset ?? 0,
        };

        if (viewPort) {
          const outOfViewport =
            Math.floor(element.top) >= viewPort.bottom - offset.bottom ||
            Math.floor(element.bottom) <= viewPort.top + offset.top ||
            Math.floor(element.left) >= viewPort.right - offset.right ||
            Math.floor(element.right) <= viewPort.left + offset.left;

          if (outOfViewport && keyboardFocused) {
            this.$container.scrollTo({
              top: element.top + this.$container.scrollTop - offset.top - viewPort.top,
              left: element.left + this.$container.scrollLeft - offset.left - viewPort.left,
            });
          }
        }
      }
    }, 0);
  };

  toggleShadow = (scroll, maxScroll, orientation) => {
    const roundedScroll = Math.round(scroll);
    const roundedMaxScroll = Math.round(maxScroll);
    let shadow = '';
    // not scroll
    if (roundedMaxScroll <= 0) {
      // start scroll
    } else if (roundedScroll <= 0) {
      shadow = 'end';
      // end scroll
    } else if (roundedScroll >= roundedMaxScroll) {
      shadow = 'start';
      // median scroll
    } else if (roundedScroll > 0) {
      shadow = 'median';
    }
    this.setState({
      [orientation]: shadow,
    });
  };

  setShadowContainer = () => {
    if (!this.asProps.shadow || !this.$container || !this.$wrapper) return;

    const { scrollWidth, clientWidth, scrollHeight, clientHeight, scrollLeft, scrollTop } =
      this.$container;
    const maxScrollRight = scrollWidth - clientWidth;
    const maxScrollBottom = scrollHeight - clientHeight;

    this.toggleShadow(scrollLeft, maxScrollRight, 'shadowHorizontal');
    this.toggleShadow(scrollTop, maxScrollBottom, 'shadowVertical');
  };

  getContainerProps() {
    const { container, inner, onScroll, uid } = this.asProps;
    return {
      id: `igc-${uid}-scroll-container`,
      ref: container,
      $refInner: inner,
      onScroll: callAllEventHandlers(onScroll, this.handleScrollContainer),
    };
  }

  getBarProps() {
    const { container, orientation, uid, leftOffset, rightOffset } = this.asProps;

    return {
      container,
      orientation,
      uid,
      horizontalBarRef: this.horizontalBarRef,
      verticalBarRef: this.verticalBarRef,
      leftOffset,
      rightOffset,
    };
  }

  componentDidMount() {
    this.calculate();
    this.updateBarsAria();
    if (this.$inner) {
      this.observer?.observe(this.$inner);
    }
    if (this.$container) {
      this.observer?.observe(this.$container);
    }

    this.$inner?.addEventListener('focusin', this.handleFocusIn);
  }

  componentDidUpdate() {
    this.calculate();
  }

  componentWillUnmount() {
    this.observer?.disconnect();
    this.$inner?.removeEventListener('focusin', this.handleFocusIn);
  }

  render() {
    const SScrollArea = Root;
    const SShadowVertical = BoxWithoutPosition;
    const SShadowHorizontal = BoxWithoutPosition;
    const {
      Children,
      styles,
      orientation,
      tabIndex,
      forcedAdvancedMode,
      leftOffset,
      rightOffset,
      topOffset,
      bottomOffset,
    } = this.asProps;
    const { shadowVertical, shadowHorizontal } = this.state;

    const advancedMode =
      forcedAdvancedMode ||
      isAdvanceMode(Children, [ScrollArea.Container.displayName, ScrollArea.Bar.displayName]);

    return sstyled(styles)(
      <SScrollArea
        render={Box}
        ref={this.refWrapper}
        onScroll={this.handleScroll}
        __excludeProps={['tabIndex']}
      >
        {advancedMode ? (
          <Children />
        ) : (
          <>
            <ScrollArea.Container tabIndex={tabIndex}>
              <Children />
            </ScrollArea.Container>
            {(orientation === undefined || orientation === 'horizontal') && (
              <ScrollArea.Bar orientation='horizontal' />
            )}
            {(orientation === undefined || orientation === 'vertical') && (
              <ScrollArea.Bar orientation='vertical' />
            )}
          </>
        )}
        {shadowVertical && (
          <SShadowVertical
            position={shadowVertical}
            topOffset={topOffset ? `${topOffset}px` : undefined}
            bottomOffset={bottomOffset ? `${bottomOffset}px` : undefined}
          />
        )}
        {shadowHorizontal && (
          <SShadowHorizontal
            position={shadowHorizontal}
            leftOffset={leftOffset ? `${leftOffset}px` : undefined}
            rightOffset={rightOffset ? `${rightOffset}px` : undefined}
          />
        )}
      </SScrollArea>,
    );
  }
}

function ContainerRoot(props) {
  const SContainer = Root;
  const {
    Children,
    styles,
    $refInner,
    focusRingTopOffset = 0,
    focusRingRightOffset = 0,
    focusRingBottomOffset = 0,
    focusRingLeftOffset = 0,
  } = props;
  return sstyled(styles)(
    <SContainer
      render={Box}
      tabIndex={0}
      focusRingTopOffset={focusRingTopOffset}
      focusRingRightOffset={focusRingRightOffset}
      focusRingBottomOffset={focusRingBottomOffset}
      focusRingLeftOffset={focusRingLeftOffset}
    >
      <div ref={$refInner}>
        <Children />
      </div>
    </SContainer>,
  );
}

ContainerRoot.enhance = [keyboardFocusEnhance()];

const ScrollArea = createComponent(ScrollAreaRoot, {
  Container: ContainerRoot,
  Bar: BarRoot,
});

// TODO: remove named ScrollArea export
export { eventCalculate, ScrollArea };
export default ScrollArea;
