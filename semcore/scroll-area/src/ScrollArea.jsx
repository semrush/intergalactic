import React from 'react';
import { findDOMNode } from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';

import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import trottle from '@semcore/utils/lib/rafTrottle';
import { getNodeByRef } from '@semcore/utils/lib/ref';
import { isAdvanceMode } from '@semcore/utils/lib/findComponent';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import BarRoot from './ScrollBar';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/scroll-area.shadow.css';

let eventCalculate = undefined;
if (typeof window !== 'undefined') {
  eventCalculate = new Event('calculate');
}

export { eventCalculate };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BoxWithoutPosition = React.forwardRef(({ position, ...props }, ref) => (
  <Box ref={ref} {...props} />
));

class ScrollAreaRoot extends Component {
  static displayName = 'ScrollArea';

  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = () => ({
    container: React.createRef(),
    inner: React.createRef(),
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

    this.observer = new ResizeObserver(callAllEventHandlers(props.onResize, this.calculate));
  }

  refWrapper = (node) => (this.$wrapper = findDOMNode(node));

  // for max height/width
  calculateSizeContainer() {
    const size = { width: '', height: '' };
    if (!this.$container || !this.$wrapper) return size;
    const { scrollWidth, scrollHeight } = this.$container;
    const style = window.getComputedStyle(this.$wrapper);
    const maxWidth = Number.parseInt(style.getPropertyValue('max-width'));
    const maxHeight = Number.parseInt(style.getPropertyValue('max-height'));

    if (maxWidth) {
      if (scrollWidth > maxWidth) {
        size.width = `${maxWidth}px`;
      } else {
        size.width = '100%';
      }
    }

    if (maxHeight) {
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
    // updating DOM directly to avoid react dom rerendering and reconciliation
    if (!this.$container) return;
    const { scrollWidth, clientWidth, scrollHeight, clientHeight, scrollLeft, scrollTop } =
      this.$container;
    const maxScrollRight = scrollWidth - clientWidth;
    const maxScrollBottom = scrollHeight - clientHeight;
    if (this.horizontalBarRef.current) {
      this.horizontalBarRef.current.setAttribute('aria-valuenow', Math.floor(scrollLeft));
      this.horizontalBarRef.current.setAttribute('aria-valuemax', maxScrollRight);
    }
    if (this.verticalBarRef.current) {
      this.verticalBarRef.current.setAttribute('aria-valuenow', Math.floor(scrollTop));
      this.verticalBarRef.current.setAttribute('aria-valuemax', maxScrollBottom);
    }
  });

  handleScrollContainer = trottle(() => {
    if (!this.$container) return;
    this.setShadowContainer();
    this.updateBarsAria();
  });

  // FIX Chrome bug, when focus state on hide control
  handleScroll = (e) => {
    if (e.target && e.target.isEqualNode(this.$wrapper)) {
      e.target.scrollTop = 0;
      e.target.scrollLeft = 0;
    }
  };

  toggleShadow = (scroll, maxScroll, orientation) => {
    let shadow = '';
    // not scroll
    if (maxScroll <= 0) {
      // start scroll
    } else if (scroll <= 0) {
      shadow = 'end';
      // end scroll
    } else if (scroll >= maxScroll) {
      shadow = 'start';
      // median scroll
    } else if (scroll > 0) {
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
    const { container, orientation, uid } = this.asProps;
    return {
      container,
      orientation,
      uid,
      horizontalBarRef: this.horizontalBarRef,
      verticalBarRef: this.verticalBarRef,
    };
  }

  componentDidMount() {
    this.calculate();
    this.updateBarsAria();
    if (this.$inner) {
      this.observer.observe(this.$inner);
    }
    if (this.$container) {
      this.observer.observe(this.$container);
    }
  }

  componentDidUpdate() {
    this.calculate();
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const SScrollArea = Root;
    const SShadowVertical = BoxWithoutPosition;
    const SShadowHorizontal = BoxWithoutPosition;
    const { Children, styles, orientation, tabIndex } = this.asProps;
    const { shadowVertical, shadowHorizontal } = this.state;

    const advanceMode = isAdvanceMode(Children, [
      ScrollArea.Container.displayName,
      ScrollArea.Bar.displayName,
    ]);

    return sstyled(styles)(
      <SScrollArea render={Box} ref={this.refWrapper} onScroll={this.handleScroll}>
        {shadowVertical && <SShadowVertical position={shadowVertical} />}
        {shadowHorizontal && <SShadowHorizontal position={shadowHorizontal} />}
        {advanceMode ? (
          <Children />
        ) : (
          <>
            <ScrollArea.Container tabIndex={tabIndex}>
              <Children />
            </ScrollArea.Container>
            {(orientation === undefined || orientation === 'horizontal') && (
              <ScrollArea.Bar orientation="horizontal" />
            )}
            {(orientation === undefined || orientation === 'vertical') && (
              <ScrollArea.Bar orientation="vertical" />
            )}
          </>
        )}
      </SScrollArea>,
    );
  }
}

function ContainerRoot(props) {
  const SContainer = Root;
  const { Children, styles, $refInner } = props;
  return sstyled(styles)(
    <SContainer render={Box} tabIndex={0}>
      <div ref={$refInner}>
        <Children />
      </div>
    </SContainer>,
  );
}

ContainerRoot.enhance = [keyboardFocusEnhance()];

export const ScrollArea = createComponent(ScrollAreaRoot, {
  Container: ContainerRoot,
  Bar: BarRoot,
});

export default ScrollArea;
