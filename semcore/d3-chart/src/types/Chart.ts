import { IBoxProps } from '@semcore/flex-box';
import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IChartProps extends IContext, IBoxProps {
  /** Width svg element
   * @default 0*/
  width?: number;
  /** Height svg element
   * @default 0*/
  height?: number;
}

declare const Chart: <T>(props: CProps<IChartProps & T>) => ReturnEl;

export default Chart;
