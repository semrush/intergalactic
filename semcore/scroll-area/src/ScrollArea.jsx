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

  static defaultProps = () => ({
    container: React.createRef(),
    inner: React.createRef(),
  });

  $wrapper = null;
  observer = null;

  get $container() {
    return getNodeByRef(this.asProps.container);
  }

  get $inner() {
    return getNodeByRef(this.asProps.inner);
  }

  state = {
    shadowVertical: false,
    shadowHorizontal: false,
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

  handleScrollContainer = trottle(() => {
    if (!this.$container) return;
    this.setShadowContainer();
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
    const { container, inner, onScroll } = this.asProps;
    return {
      ref: container,
      $refInner: inner,
      onScroll: callAllEventHandlers(onScroll, this.handleScrollContainer),
    };
  }

  getBarProps() {
    const { container, orientation } = this.asProps;
    return {
      container,
      orientation,
    };
  }

  componentDidMount() {
    this.calculate();
    if (this.$inner) {
      this.observer.observe(this.$inner);
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
    const { Children, styles, orientation } = this.asProps;
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
            <ScrollArea.Container>
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
    <SContainer render={Box}>
      <div ref={$refInner}>
        <Children />
      </div>
    </SContainer>,
  );
}

export const ScrollArea = createComponent(ScrollAreaRoot, {
  Container: ContainerRoot,
  Bar: BarRoot,
});

export default ScrollArea;
