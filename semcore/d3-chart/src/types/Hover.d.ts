import React from 'react';
import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { ReturnEl } from '@semcore/core';
import { TooltipTypeBase } from './Tooltip';
import { BoxProps } from '@semcore/flex-box';
import { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface IHoverProps extends HoverProps, UnknownProperties {}
export type HoverProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
};

type HoverTooltip = (<X, Y>(
  props: {
    /** Field name from `data` array item for the XAxis */
    x?: X;
    /** Field name from `data` array item for the YAxis */
    y?: Y;
    /** Handle click by trigger has an index - it is an index of the data array. */
    onClick?: (index: number, e: React.SyntheticEvent) => void;
    children: (props: {
      /** Index in `data` array of the current item */
      xIndex: X extends string ? number : never;
      /** Index in `data` array of the current item */
      yIndex: Y extends string ? number : never;
    }) => { children: ReturnEl };
  } & Omit<BoxProps, 'children'>,
) => ReturnEl) &
  TooltipTypeBase;

type HoverContext = {
  /** Index in `data` array of the current item */
  index: number;
};

declare const HoverLine: IntergalacticD3Component<'g', HoverProps, HoverContext> & {
  Tooltip: HoverTooltip;
};

declare const HoverRect: IntergalacticD3Component<'g', HoverProps, HoverContext> & {
  Tooltip: HoverTooltip;
};
export { HoverLine, HoverRect };
