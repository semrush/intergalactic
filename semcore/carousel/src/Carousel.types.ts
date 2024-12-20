import { PropGetterFn, UnknownProperties, Intergalactic, IRootComponentProps } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';

/** @deprecated */
export interface ICarouselProps extends CarouselProps, UnknownProperties {}
export type CarouselProps = BoxProps & {
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
  /** @ignore  */
  step?: number;
  locale?: string;
  /** Enable zoom feature for carousel items */
  zoom?: boolean;
  /** Width for items in zooming modal */
  zoomWidth?: number;
  /** Type of indicators */
  indicators?: 'default' | 'hide' | 'preview';
};

/** @deprecated */
export interface ICarouselContext extends CarouselContext, UnknownProperties {}
export type CarouselContext = {
  getContainerProps: PropGetterFn;
  getItemProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getIndicatorsProps: PropGetterFn;
};

export type CarouselItem = {
  node: HTMLElement;
};

export type CarouselItemProps = BoxProps & {
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
  toggleItem?: (item: CarouselItem, toRemove?: boolean) => void;

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

/** @deprecated */
export interface ICarouselState extends CarouselState, UnknownProperties {}
export type CarouselState = {
  isOpenZoom: boolean;
  selectedIndex: number;
  items: CarouselItem[];
};

export type CarouselButtonProps = IRootComponentProps &
  BoxProps & {
    label?: string;
    inverted?: boolean;
    tabIndex?: number;
  };

export type CarouselIndicatorsProps = IRootComponentProps &
  BoxProps & {
    items?: CarouselItem[];
    inverted?: boolean;
  };

export type CarouselIndicatorProps = IRootComponentProps &
  Omit<BoxProps, 'position'> & {
    active?: boolean;
    onClick?: () => void;
    inverted?: boolean;
  } & CarouselItem;

declare const CarouselType: Intergalactic.Component<
  'div',
  CarouselProps,
  CarouselContext & CarouselState
> & {
  Container: Intergalactic.Component<'div', BoxProps>;
  ContentBox: Intergalactic.Component<'div', BoxProps>;
  Indicators: Intergalactic.Component<'div', CarouselIndicatorsProps, CarouselState>;
  Indicator: Intergalactic.Component<'div', CarouselIndicatorProps>;
  Item: Intergalactic.Component<'div', CarouselItemProps>;
  Prev: Intergalactic.Component<'div', CarouselButtonProps>;
  Next: Intergalactic.Component<'div', CarouselButtonProps>;
};

export default CarouselType;
