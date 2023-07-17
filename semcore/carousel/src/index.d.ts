import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';

type ChildRenderFn<Props> = Props & {
  children?: ({
    items,
  }: {
    items: { active: boolean; onClick: () => void }[];
  }) => React.ReactElement | React.ReactElement[];
};

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

/** @deprecated */
export interface ICarouselState extends CarouselState, UnknownProperties {}
export type CarouselState = {
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  items: { transform: number; position: number; node: HTMLDivElement }[];
};

declare const Carousel: Intergalactic.Component<
  'div',
  CarouselProps,
  CarouselContext & CarouselState
> & {
  Container: Intergalactic.Component<'div', BoxProps>;
  Indicators: Intergalactic.Component<'div', BoxProps, CarouselState>;
  Indicator: Intergalactic.Component<
    'div',
    Omit<BoxProps, 'position'> & {
      active?: boolean;
      onClick?: () => void;
      transform?: number;
      position?: number;
      // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
      node?: HTMLDivElement;
    }
  >;
  Item: Intergalactic.Component<'div', BoxProps>;
  Prev: Intergalactic.Component<'div', BoxProps>;
  Next: Intergalactic.Component<'div', BoxProps>;
};

export default Carousel;
