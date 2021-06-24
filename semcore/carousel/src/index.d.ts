import React from 'react';
import { PropGetterFn, CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';

type ChildRenderFn<Props> = Props & {
  children?: ({
    items,
  }: {
    items: { active: boolean; onClick: () => void }[];
  }) => React.ReactElement;
};

export interface ICarouselProps {
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
}

export interface ICarouselContext {
  getContainerProps: PropGetterFn;
  getItemProps: PropGetterFn;
  getPrevProps: PropGetterFn;
  getNextProps: PropGetterFn;
  getIndicatorsProps: PropGetterFn;
}

export interface ICarouselState {
  items: { transform: number; position: number; node: HTMLDivElement }[];
}

declare const Carousel: (<T>(
  props: CProps<ICarouselProps & T, ICarouselContext, ICarouselState>,
) => ReturnEl) & {
  Container: <T>(props: IBoxProps & T) => ReturnEl;
  Indicators: <T>(props: ChildRenderFn<IBoxProps & T>) => ReturnEl;
  Item: <T>(props: IBoxProps & T) => ReturnEl;
  Prev: <T>(props: IBoxProps & T) => ReturnEl;
  Next: <T>(props: IBoxProps & T) => ReturnEl;
};

export default Carousel;
