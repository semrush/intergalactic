import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { TooltipTypeBase } from './Tooltip';
import { IBoxProps } from '@semcore/flex-box';

export interface IHoverProps extends IContext {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
}

type HoverTooltip = (<X, Y>(
  props: {
    /** Field name from `data` array item for the XAxis */
    x?: X;
    /** Field name from `data` array item for the YAxis */
    y?: Y;
    children: (props: {
      /** Index in `data` array of the current item */
      xIndex: X extends string ? string : never;
      /** Index in `data` array of the current item */
      yIndex: Y extends string ? string : never;
    }) => { children: ReturnEl };
  } & IBoxProps,
) => ReturnEl) &
  TooltipTypeBase;

declare const HoverLine: (<T>(props: MapProps<IHoverProps & T>) => ReturnEl) & {
  Tooltip: HoverTooltip;
};

declare const HoverRect: (<T>(props: MapProps<IHoverProps & T>) => ReturnEl) & {
  Tooltip: HoverTooltip;
};
export { HoverLine, HoverRect };
