import type { NSBox } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSCarousel {
  type Props = NSBox.Props & {
    /** Index active item */
    index?: number;
    /**
     * Index of the active item selected by default
     * @default 0
     */
    defaultIndex?: number;
    /**  Called when the selection is changed */
    onIndexChange?: (index: number) => void;
    /** Animation duration
     * @default 300 */
    duration?: number;
    /** Disables infinite items change in the carousel
     * @default false */
    bounded?: boolean;
    /** Internal */
    step?: number;
    /** Specifies the locale for i18n support */
    locale?: string;
    /** Enable zoom feature for carousel items */
    zoom?: boolean;
    /** Width for items in zooming modal */
    zoomWidth?: number;
    /** Type of indicators */
    indicators?: 'default' | 'hide' | 'preview';
  };
  type DefaultProps = {
    defaultIndex: 0;
    duration: 350;
    step: 100;
    bounded: false;
    i18n: LocalizedMessages;
    locale: 'en';
    indicators: 'default';
  };
  type State = {
    isOpenZoom: boolean;
    selectedIndex: number;
    items: NSCarousel.Item[];
  };
  type Ctx = {
    getContainerProps: PropGetterFn;
    getItemProps: PropGetterFn;
    getPrevProps: PropGetterFn;
    getNextProps: PropGetterFn;
    getIndicatorsProps: PropGetterFn;
  };
  type Handlers = {
    index: [
      null,
      (index: NSCarousel.Props['index']) => void,
    ];
  };
  type Item = {
    node: HTMLElement;
  };

export type CarouselItemProps = NSBox.Props & {
  /** Flag for css cursor
   * @private
   */
  zoomIn?: boolean;
  /** Flag for css cursor
   * @private
   */
  zoomOut?: boolean;

  /** Function to add item to list in Carousel
       * @private
       */
  toggleItem?: (item: NSCarousel.Item, toRemove?: boolean) => void;

  /** Index of item in carousel */
  index?: number;

  uid?: string;

  /** Flag - is current item shown now */
  current?: boolean;

  /** Handler for show item in modal window
       * @private
       */
  onToggleZoomModal?: () => void;

  /** Value for transform item
       * @private
       */
  transform?: number;

      /**
       * Flag data zoomed
       * @private
       */
      isOpenZoom?: boolean;
    };
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Prev {
    type Props = NSBox.Props & {
      label?: string;
      inverted?: boolean;
      tabIndex?: number;
    };
    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Next {
    type Props = NSBox.Props & {
      label?: string;
      inverted?: boolean;
      tabIndex?: number;
    };
    type Component = Intergalactic.Component<'div', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx & State> & {
    Container: Container.Component;
    ContentBox: ContentBox.Component;
    Indicators: Indicators.Component;
    Indicator: Indicator.Component;
    Item: Item.Component;
    Prev: Prev.Component;
    Next: Next.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type CarouselProps = NSCarousel.Props;
/** @deprecated It will be removed in v18. */
export type CarouselDefaultProps = NSCarousel.DefaultProps;
/** @deprecated It will be removed in v18. */
export type CarouselContext = NSCarousel.Ctx;
/** @deprecated It will be removed in v18. */
export type CarouselItem = NSCarousel.Item;
/** @deprecated It will be removed in v18. */
export type CarouselItemProps = NSCarousel.Item.Props;
/** @deprecated It will be removed in v18. */
export type CarouselState = NSCarousel.State;
/** @deprecated It will be removed in v18. */
export type CarouselButtonProps = NSCarousel.Prev.Props;
/** @deprecated It will be removed in v18. */
export type CarouselIndicatorsProps = NSCarousel.Indicators.Props;
/** @deprecated It will be removed in v18. */
export type CarouselIndicatorProps = NSCarousel.Indicator.Props;

export type { NSCarousel };
