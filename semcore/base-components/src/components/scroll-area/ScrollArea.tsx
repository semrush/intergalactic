import type { Intergalactic } from '@semcore/core';
import { createComponent, sstyled, Component, Root, lastInteraction } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React, { type ForwardedRef } from 'react';

import { Box } from '../flex-box';
import type { NSScrollArea } from './ScrollArea.type';
import { setAreaValue, ScrollBar } from './ScrollBar';
import style from './style/scroll-area.shadow.css';

let eventCalculate: Event | undefined = undefined;
if (typeof window !== 'undefined') {
  eventCalculate = new Event('calculate');
}

const BoxWithoutPosition = React.forwardRef(({ position, ...props }: any, ref: ForwardedRef<HTMLElement>) => (
  <Box ref={ref} {...props} />
));

const DEFAULT_SHADOW_THEME = 'dark';

class ScrollAreaRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSScrollArea.Component>,
  typeof ScrollAreaRoot.enhance,
  {},
  {},
  NSScrollArea.State,
  NSScrollArea.DefaultProps
> {
  static displayName = 'ScrollArea';

  static style = style;
  static enhance = [uniqueIDEnhancement()] as const;

  static defaultProps = () =>
    ({
      container: React.createRef<HTMLElement | null>(),
      inner: React.createRef<HTMLElement | null>(),
      tabIndex: 0,
      observeParentSize: false,
      disableAutofocusToContent: false,
      shadowSize: 5,
      shadowTheme: DEFAULT_SHADOW_THEME,
    }) as const;

  hasAutoFocusToContent = false;

  $wrapper: HTMLElement | null = null;
  observer: ResizeObserver | null = null;
  horizontalBarRef: React.MutableRefObject<HTMLElement | null> = React.createRef();
  verticalBarRef: React.MutableRefObject<HTMLElement | null> = React.createRef();

  get $container(): HTMLElement | null {
    const element = this.asProps.container.current;

    return element;
  }

  get $inner(): HTMLElement | null {
    const element = this.asProps.inner.current;

    return element;
  }

  state: NSScrollArea.State = {
    shadowHorizontal: false,
    shadowVertical: false,
  };

  constructor(props: NSScrollArea.Props) {
    super(props);

    if (canUseDOM()) {
      this.observer = new ResizeObserver(callAllEventHandlers(props.onResize, this.calculate));
    }
  }

  refWrapper = (node: HTMLElement | null) => {
    this.$wrapper = node;
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
    if (!wMax && !hMax) return size;
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
      const { leftOffset, rightOffset, topOffset, bottomOffset } = this.asProps;

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

          if (outOfViewport && lastInteraction.isKeyboard()) {
            this.$container.scrollTo({
              top: element.top + this.$container.scrollTop - offset.top - viewPort.top,
              left: element.left + this.$container.scrollLeft - offset.left - viewPort.left,
            });
          }
        }
      }
    }, 0);
  };

  toggleShadow = (scroll: number, maxScroll: number, orientation: keyof NSScrollArea.State) => {
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

    const { scrollWidth, clientWidth, scrollHeight, clientHeight, scrollLeft, scrollTop } = this.$container;
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
    const { container, orientation, uid, leftOffset, rightOffset, topOffset, bottomOffset } = this.asProps;

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
    if (this.$wrapper) {
      this.observer?.observe(this.$wrapper);
    }

    if (!this.asProps.disableAutofocusToContent) {
      this.hasAutoFocusToContent = true;
      this.$inner?.addEventListener('focusin', this.handleFocusIn);
    }
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
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
      leftOffset,
      rightOffset,
      topOffset,
      bottomOffset,
      shadowSize,
      shadowTheme,
    } = this.asProps;
    const { shadowVertical, shadowHorizontal } = this.state;

    const advancedMode = isAdvanceMode(Children, [ScrollArea.Container.displayName, ScrollArea.Bar.displayName], true);

    const horizontalShadowSize = typeof shadowSize === 'number' ? shadowSize : shadowSize.horizontal;
    const verticalShadowSize = typeof shadowSize === 'number' ? shadowSize : shadowSize.vertical;
    const horizontalShadowThemeTop = typeof shadowTheme === 'string' ? shadowTheme : shadowTheme.horizontalTop ?? DEFAULT_SHADOW_THEME;
    const horizontalShadowThemeBottom = typeof shadowTheme === 'string' ? shadowTheme : shadowTheme.horizontalBottom ?? DEFAULT_SHADOW_THEME;
    const verticalShadowThemeLeft = typeof shadowTheme === 'string' ? shadowTheme : shadowTheme.verticalLeft ?? DEFAULT_SHADOW_THEME;
    const verticalShadowThemeRight = typeof shadowTheme === 'string' ? shadowTheme : shadowTheme.verticalRight ?? DEFAULT_SHADOW_THEME;

    return sstyled(styles)(
      <SScrollArea
        render={Box}
        ref={this.refWrapper}
        onScroll={this.handleScroll}
        __excludeProps={['tabIndex']}
      >
        {advancedMode
          ? (
              <Children />
            )
          : (
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
            themeTop={horizontalShadowThemeTop}
            themeBottom={horizontalShadowThemeBottom}
            size={`${verticalShadowSize}px`}
          />
        )}
        {shadowHorizontal && (
          <SShadowHorizontal
            position={shadowHorizontal}
            leftOffset={leftOffset ? `${leftOffset}px` : undefined}
            rightOffset={rightOffset ? `${rightOffset}px` : undefined}
            themeLeft={verticalShadowThemeLeft}
            themeRight={verticalShadowThemeRight}
            size={`${horizontalShadowSize}px`}
          />
        )}
      </SScrollArea>,
    );
  }
}

function ContainerRoot(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSScrollArea.Container.Component, typeof ScrollAreaRoot, 'Container'>,
) {
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
      inAfterOutline={true}
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

export type ScrollAreaRootType = typeof ScrollAreaRoot;

/**
 * ScrollArea
 *
 * {@link https://developer.semrush.com/intergalactic/components/scroll-area/scroll-area-api|API} | {@link https://developer.semrush.com/intergalactic/components/scroll-area/scroll-area-code|Examples}
 */
const ScrollArea = createComponent<
  NSScrollArea.Component,
  ScrollAreaRootType
>(ScrollAreaRoot, {
  Container: ContainerRoot,
  Bar: ScrollBar,
});

// TODO: remove named ScrollArea export
export { eventCalculate, ScrollArea };
