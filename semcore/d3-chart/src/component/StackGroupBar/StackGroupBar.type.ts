import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type { Stack } from 'd3-shape';
// @ts-ignore
import type { IntergalacticD3Component } from '../../Plot';

type StackGroupData = {
  [key: string]: number;
};

export type StackGroupProps = {
  children: React.ReactNode | React.ReactNode[];
  data?: StackGroupData[];
  x: keyof StackGroupData;
  scale?: [ScaleBand<any>, ScaleLinear<any, any>];
  maxBarSize?: number;
  patterns?: any;
  dataHintsHandler?: any;
  stack?: Stack<any, { [key: string]: number }, string>;
  r?: number;
};

export type StackGroupBarProps = {
  y: keyof StackGroupData;
  group: string;
  hMin?: number;
};

export type StackGroupType = IntergalacticD3Component<'g', StackGroupProps> & {
  Bar: IntergalacticD3Component<'path', StackGroupBarProps>;
};
