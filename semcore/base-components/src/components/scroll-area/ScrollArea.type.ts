import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { NSBox } from '../flex-box';

declare namespace NSScrollArea {
  type ShadowTheme = 'dark' | 'light';
  type Props = NSBox.Props & {
    /** Shadow display on container */
    shadow?: boolean;
    /** Scroll direction */
    orientation?: 'horizontal' | 'vertical';
    /** Link to the dom element, which will be a container with overflow */
    container?: React.RefObject<HTMLElement | null>;
    /** Link to the dom element that will be stretched along with the content */
    inner?: React.RefObject<HTMLElement | null>;
    /** Callback executed when container change size  */
    onResize?: ResizeObserverCallback;
    /** Called every time user scrolls area  */
    onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
    /** Tab index that is being bypassed to the scroll container. */
    tabIndex?: number;
    /**
     * Flag to enable resizing if the parent of ScrollArea is resized
     * @default false
     */
    observeParentSize?: boolean;

    /**
     * Flag to disable autoscroll to focused content.
     * @default false
     */
    disableAutofocusToContent?: boolean;

    /** Top offset for scroll positioning */
    topOffset?: number;
    /** Right offset for scroll positioning */
    rightOffset?: number;
    /** Bottom offset for scroll positioning */
    bottomOffset?: number;
    /** Left offset for scroll positioning */
    leftOffset?: number;
    /**
     * Size for shadows in px.
     * @default 5
     */
    shadowSize?: number | { horizontal: number; vertical: number };
    /**
     * Style for shadows (black or white).
     * @default dark
     */
    shadowTheme?:
      | NSScrollArea.ShadowTheme
      | {
        horizontalTop?: NSScrollArea.ShadowTheme;
        horizontalBottom?: NSScrollArea.ShadowTheme;
        verticalLeft?: NSScrollArea.ShadowTheme;
        verticalRight?: NSScrollArea.ShadowTheme;
      };
  };
  type DefaultProps = {
    container: React.RefObject<HTMLElement | null>;
    inner: React.RefObject<HTMLElement | null>;
    tabIndex: 0;
    observeParentSize: false;
    disableAutofocusToContent: false;
    shadowSize: 5;
    shadowTheme: 'dark';
  };
  type State = {
    shadowHorizontal: boolean | string;
    shadowVertical: boolean | string;
  };
  type Ctx = {
    getContainerProps: PropGetterFn;
    getBarProps: PropGetterFn;
  };

  namespace Bar {
    type Props = NSBox.Props & {
      /** The direction of the scroll that can be calculated automatically  */
      orientation?: 'horizontal' | 'vertical';
      /** Reference to the scrollable container element */
      container?: React.RefObject<HTMLElement | null>;
    };
    type DefaultProps = {
      container: React.RefObject<HTMLElement | null>;
      children: React.JSX.Element;
    };
    type State = {
      visibleScroll: boolean;
    };
    type Ctx = {
      getSliderProps: PropGetterFn;
    };

    namespace Slider {
      type Component = NSBox.Component;
    }

    interface Instance {
      get isScrollVisible(): boolean;
    }

    type Component = Intergalactic.Component<'div', Props, Ctx, [], Instance> & {
      Slider: Slider.Component;
    };
  }

  namespace Container {
    type Props = NSBox.Props & {
      /** Inner prop */
      $refInner?: React.RefObject<any>;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Container: Container.Component;
    Bar: Bar.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type ShadowTheme = NSScrollArea.ShadowTheme;
/** @deprecated It will be removed in v19. */
export type ScrollAreaProps = NSScrollArea.Props;
/** @deprecated It will be removed in v19. */
export type ScrollAreaDefaultProps = NSScrollArea.DefaultProps;
/** @deprecated It will be removed in v19. */
export type ScrollAreaContext = NSScrollArea.Ctx;
/** @deprecated It will be removed in v19. */
export type ScrollBarProps = NSScrollArea.Bar.Props;
/** @deprecated It will be removed in v19. */
export type ScrollBarDefaultProps = NSScrollArea.Bar.DefaultProps;
/** @deprecated It will be removed in v19. */
export type ScrollBarContext = NSScrollArea.Bar.Ctx;
/** @deprecated It will be removed in v19. */
export type ScrollAreaContainerProps = NSScrollArea.Container.Props;

export type { NSScrollArea };
