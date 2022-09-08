import { CProps } from '@semcore/core';

export interface IEllipsisProps {
  /**
   * Row count in multiline Ellipsis
   * @default 1
   */
  maxLine?: number;
  /**
   * Trimming type
   * @default right
   */
  trim?: 'right' | 'middle';
  /**
   * Shows tooltip
   * @default visible
   */
  tooltip?: string;
}

declare const Ellipsis: <T>(props: CProps<IEllipsisProps & T>) => ReturnEl;

export default Ellipsis;
