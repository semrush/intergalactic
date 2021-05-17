import React, { ComponentProps } from 'react';
import { findDOMNode } from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';
import type ResizeObserverCallback from 'resize-observer-polyfill'
import createComponent, { Component, PropGetterFn, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import trottle from '@semcore/utils/lib/rafTrottle';
import { getNodeByRef, NodeByRef } from '@semcore/utils/lib/ref';
import findComponent from '@semcore/utils/lib/findComponent';
import If from '@semcore/utils/lib/if';
import logger from '@semcore/utils/lib/logger';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import BarRoot from './ScrollBar';

import style from './style/scroll-area.shadow.css';

export interface IScrollAreaProps extends IBoxProps {
  /** Shadow display on container */
  shadow?: boolean;
  /** Scroll direction */
  orientation?: 'horizontal' | 'vertical';
  /** Link to the dom element, which will be a container with overflow */
  container?: NodeByRef;
  /** Link to the dom element that will be stretched along with the content */
  inner?: NodeByRef;
  /** Callback executed when container change size  */
  onResize?: ResizeObserverCallback;
}

export interface IScrollAreaContext extends IScrollAreaProps {
  getContainerProps: PropGetterFn;
  getBarProps: PropGetterFn;
}

let eventCalculate = undefined;
if (typeof window !== 'undefined') {
  eventCalculate = new Event('calculate');
}

export { eventCalculate };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BoxWithoutPosition = React.forwardRef(({ position, ...props }: IBoxProps, ref) => (
  <Box ref={ref} {...props} />
));

class ScrollAreaRoot extends Component<IScrollAreaProps> {
  static displayName = 'ScrollArea';

  static style = style;

  static defaultProps = () => ({
    container: React.createRef(),
    inner: React.createRef(),
  });

  $wrapper: HTMLElement;

  observer?: ResizeObserver;

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

    const {
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollTop,
    } = this.$container;
    const maxScrollRight = scrollWidth - clientWidth;
    const maxScrollBottom = scrollHeight - clientHeight;

    this.toggleShadow(scrollLeft, maxScrollRight, 'shadowHorizontal');
    this.toggleShadow(scrollTop, maxScrollBottom, 'shadowVertical');
  };

  getContainerProps() {
    const { container, inner } = this.asProps;
    return {
      ref: container,
      $refInner: inner,
      onScroll: this.handleScrollContainer,
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

    const advanceMode = !!findComponent(Children, [
      ScrollAreaComponent.Container.displayName,
      ScrollAreaComponent.Bar.displayName,
    ]);

    return sstyled(styles)(
      <SScrollArea render={Box} ref={this.refWrapper} onScroll={this.handleScroll}>
        <If condition={shadowVertical}>
          <SShadowVertical position={shadowVertical} />
        </If>
        <If condition={shadowHorizontal}>
          <SShadowHorizontal position={shadowHorizontal} />
        </If>
        {advanceMode ? (
          <Children />
        ) : (
          <>
            <ScrollAreaComponent.Container>
              <Children />
            </ScrollAreaComponent.Container>
            {(orientation === undefined || orientation === 'horizontal') && (
              <ScrollAreaComponent.Bar orientation="horizontal" />
            )}
            {(orientation === undefined || orientation === 'vertical') && (
              <ScrollAreaComponent.Bar orientation="vertical" />
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

const ScrollAreaComponent = createComponent<
  ScrollAreaRoot,
  {
    Container: ComponentProps<typeof Box>;
    Bar: [ComponentProps<typeof BarRoot>, { Slider: ComponentProps<typeof BarRoot.Slider> }];
  },
  IScrollAreaContext
>(ScrollAreaRoot, {
  Container: ContainerRoot,
  Bar: BarRoot,
});

export default ScrollAreaComponent;

const ScrollContainer = React.forwardRef(function (props, ref) {
  logger.warn(
    true,
    "The named import 'import { ScrollContainer }' is deprecated, use the static method from the default 'import ScrollArea', '<ScrollArea.Container/>'",
    props['data-ui-name'] || ScrollAreaComponent.Container.displayName,
  );
  return <ScrollAreaComponent.Container ref={ref} {...props} />;
});
ScrollContainer.displayName = ScrollAreaComponent.Container.displayName;

const ScrollBar = React.forwardRef(function (props, ref) {
  logger.warn(
    true,
    "The named import 'import { ScrollBar }' is deprecated, use the static method from the default 'import ScrollArea', '<ScrollArea.Bar/>'",
    props['data-ui-name'] || ScrollAreaComponent.Bar.displayName,
  );
  return <ScrollAreaComponent.Bar ref={ref} {...props} />;
});
ScrollBar.displayName = ScrollAreaComponent.Bar.displayName;

const ScrollArea = React.forwardRef(function (props, ref) {
  logger.warn(
    true,
    "The named import 'import { ScrollArea }' is deprecated, use the default 'import ScrollArea'",
    props['data-ui-name'] || ScrollAreaComponent.displayName,
  );
  return <ScrollAreaComponent ref={ref} {...props} />;
});
ScrollArea.displayName = ScrollAreaComponent.displayName;

export { ScrollArea, ScrollBar, ScrollContainer };
