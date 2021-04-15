import { IBoxProps } from '@semcore/flex-box';
import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IPlotProps extends IContext, IBoxProps {
  /** Width svg element
   * @default 0*/
  width?: number;
  /** Height svg element
   * @default 0*/
  height?: number;
}

declare const Plot: <T>(props: CProps<IPlotProps & T>) => ReturnEl;

export default Plot;
