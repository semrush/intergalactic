import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { IRootComponentProps } from '@semcore/core/src';

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
  /** Width for items in zooming modal */
  zoomWidth?: number;
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
  zoom?: boolean;
};

export type CarouselItemProps = BoxProps & {
  /**
   * Enable zoom in modal for each item.
   * @default false
   */
  zoom?: boolean;
  /** Flag for css cursor */
  zoomIn?: boolean;
  /** Flag for css cursor */
  zoomOut?: boolean;

  toggleItem?: (item: CarouselItem, toRemove?: boolean) => void;

  /** Index of item in carousel */
  index: number;

  uid: string;

  /** Flag - is current item shown now */
  current: boolean;

  /** Handler for show item in modal window */
  onToggleZoomModal?: () => void;

  /** Value for transform item */
  transform?: number;
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
  };

declare const CarouselType: Intergalactic.Component<
  'div',
  CarouselProps,
  CarouselContext & CarouselState
> & {
  Container: Intergalactic.Component<'div', BoxProps>;
  Indicators: Intergalactic.Component<'div', BoxProps & { inverted?: boolean }, CarouselState>;
  Indicator: Intergalactic.Component<
    'div',
    Omit<BoxProps, 'position'> & {
      active?: boolean;
      onClick?: () => void;
    } & CarouselItem
  >;
  Item: Intergalactic.Component<'div', CarouselItemProps>;
  Prev: Intergalactic.Component<'div', CarouselButtonProps>;
  Next: Intergalactic.Component<'div', CarouselButtonProps>;
};

export default CarouselType;
