import { IBoxProps } from '@semcore/flex-box';
import { CProps, ReturnEl } from '@semcore/core';

export interface IXYPlotProps extends IBoxProps {
  /** Data for graphic */
  data?: any[];
  /** Scale for svg element */
  scale?: any[];
  /** Width svg element
   * @default 0*/
  width?: number;
  /** Height svg element
   * @default 0*/
  height?: number;
}

declare const XYPlot: <T>(props: CProps<IXYPlotProps & T>) => ReturnEl;

export default XYPlot;
