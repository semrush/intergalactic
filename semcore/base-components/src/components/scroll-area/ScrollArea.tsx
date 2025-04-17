import React, { ForwardedRef } from 'react';
import { findDOMNode } from 'react-dom';

import { createComponent, sstyled, Component, Root, IRootComponentProps } from '@semcore/core';
import { Box } from '../flex-box';

import trottle from '@semcore/core/lib/utils/rafTrottle';
import { getNodeByRef } from '@semcore/core/lib/utils/ref';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import { setAreaValue } from './ScrollBar';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';

import style from './style/scroll-area.shadow.css';
import {
  ScrollAreaProps,
  ScrollArea as ScrollAreaType,
  ScrollAreaContainerProps,
} from './ScrollBar.types';
import { ScrollBar } from './ScrollBar';

let eventCalculate: Event | undefined = undefined;
if (typeof window !== 'undefined') {
  eventCalculate = new Event('calculate');
}

const BoxWithoutPosition = React.forwardRef(
  ({ position, ...props }: any, ref: ForwardedRef<HTMLElement>) => <Box ref={ref} {...props} />,
);

type State = {
  shadowHorizontal: boolean | string;
  shadowVertical: boolean | string;
};

class ScrollAreaRoot extends Component<ScrollAreaProps, {}, State, typeof ScrollAreaRoot.enhance> {
  static displayName = 'ScrollArea';

  static style = style;
  static enhance = [uniqueIDEnhancement(), keyboardFocusEnhance()] as const;

  static defaultProps = () => ({
    container: React.createRef(),
    inner: React.createRef(),
    tabIndex: 0,
    observeParentSize: false,
    disableAutofocusToContent: false,
  });

  hasAutoFocusToContent = false;

  $wrapper: HTMLElement | null = null;
  observer: ResizeObserver | null = null;
  horizontalBarRef = React.createRef<HTMLElement>();
  verticalBarRef = React.createRef<HTMLElement>();

  get $container(): HTMLElement | null {
    const element = getNodeByRef(this.asProps.container!);

    return element instanceof HTMLElement ? element : null;
  }

  get $inner(): HTMLElement | null {
    const element = getNodeByRef(this.asProps.inner!);

    return element instanceof HTMLElement ? element : null;
  }

  state: State = {
    shadowHorizontal: false,
    shadowVertical: false,
  };

  constructor(props: ScrollAreaProps) {
    super(props);

    if (canUseDOM()) {
      this.observer = new ResizeObserver(callAllEventHandlers(props.onResize, this.calculate));
    }
  }

  refWrapper = (node: HTMLElement) => {
    this.$wrapper = findDOMNode(node) as HTMLElement;
  };

  setStyleSizeProperty = (element: HTMLElement, propertyKey: string, value: string | number) => {
    let propertyValue = '';

    if (typeof value === 'number') {
      propertyValue = value < 1 ? `${100 * value}%` : `${value}px`;
    } else {
      propertyValue = value;
    }

    element.style.setProperty(propertyKey, propertyValue);
  };

  // for max height/width
  calculateSizeContainer() {
    const { wMax, hMax, observeParentSize } = this.asProps;
    const size = { width: '', height: '' };
    if (!this.$container || !this.$wrapper) return size;
    const { scrollWidth, scrollHeight } = this.$container;
    const style = window.getComputedStyle(this.$wrapper);
    const parent = this.$wrapper.parentElement;

    let parentRect = { width: 0, height: 0 };

    if (observeParentSize) {
      if (parent) {
        parentRect = parent.getBoundingClientRect();
      }

      if (wMax) this.setStyleSizeProperty(this.$wrapper, 'max-width', wMax);
      if (hMax) this.setStyleSizeProperty(this.$wrapper, 'max-height', hMax);
    }

    let maxWidth = Number.parseInt(style.getPropertyValue('max-width'));
    let maxHeight = Number.parseInt(style.getPropertyValue('max-height'));

    if (maxWidth && parent) {
      if (observeParentSize && wMax && parent.scrollWidth > parentRect.width) {
        /** even if width is like 100.486px we should round it to 100, not 101 */
        const diff =
          Math.round(Number(parent.scrollWidth.toFixed(1))) -
          Math.round(Number(parentRect.width.toFixed(1)));

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

    if (maxHeight && parent) {
      if (observeParentSize && hMax && parent.scrollHeight > parentRect.height) {
        /** even if height is like 100.486px we should round it to 100, not 101 */
        const diff =
          Math.round(Number(parent.scrollHeight.toFixed(1))) -
          Math.round(Number(parentRect.height.toFixed(1)));

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
    this.$container.dispatchEvent(eventCalculate!);
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
  handleScroll = (e: React.SyntheticEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement && e.target.isEqualNode(this.$wrapper)) {
      e.target.scrollTop = 0;
      e.target.scrollLeft = 0;
    }
  };

  handleFocusIn = (e: FocusEvent) => {
    setTimeout(() => {
      const { keyboardFocused, leftOffset, rightOffset, topOffset, bottomOffset } = this.asProps;

      if (
        e.target instanceof HTMLElement &&
        this.$container &&
        typeof this.$container.scrollTo === 'function'
      ) {
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

  toggleShadow = (scroll: number, maxScroll: number, orientation: keyof State) => {
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

    // @ts-ignore
    this.setState({ [orientation]: shadow });
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
    const { container, orientation, uid, leftOffset, rightOffset, topOffset, bottomOffset } =
      this.asProps;

    return {
      container,
      orientation,
      uid,
      horizontalBarRef: this.horizontalBarRef,
      verticalBarRef: this.verticalBarRef,
      leftOffset,
      rightOffset,
      topOffset,
      bottomOffset,
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

    if (!this.asProps.disableAutofocusToContent) {
      this.hasAutoFocusToContent = true;
      this.$inner?.addEventListener('focusin', this.handleFocusIn);
    }
  }

  componentDidUpdate(prevProps: ScrollAreaProps) {
    this.calculate();

    const { disableAutofocusToContent } = this.asProps;

    if (prevProps.disableAutofocusToContent !== disableAutofocusToContent) {
      if (disableAutofocusToContent && this.hasAutoFocusToContent) {
        this.hasAutoFocusToContent = false;
        this.$inner?.removeEventListener('focusin', this.handleFocusIn);
      } else if (!this.hasAutoFocusToContent) {
        this.hasAutoFocusToContent = true;
        this.$inner?.addEventListener('focusin', this.handleFocusIn);
      }
    }
  }

  componentWillUnmount() {
    this.observer?.disconnect();

    if (!this.asProps.disableAutofocusToContent) {
      this.hasAutoFocusToContent = false;
      this.$inner?.removeEventListener('focusin', this.handleFocusIn);
    }
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
      isAdvanceMode(Children, [ScrollArea.Container.displayName, ScrollArea.Bar.displayName], true);

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

function ContainerRoot(props: ScrollAreaContainerProps & IRootComponentProps) {
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
  Bar: ScrollBar,
}) as typeof ScrollAreaType;

// TODO: remove named ScrollArea export
export { eventCalculate, ScrollArea };
