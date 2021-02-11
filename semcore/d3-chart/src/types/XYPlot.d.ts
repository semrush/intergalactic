import { IBoxProps } from '@semcore/flex-box';
import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IXYPlotProps extends IContext, IBoxProps {
  /** Width svg element
   * @default 0*/
  width?: number;
  /** Height svg element
   * @default 0*/
  height?: number;
}

declare const XYPlot: <T>(props: CProps<IXYPlotProps & T>) => ReturnEl;

export default XYPlot;
