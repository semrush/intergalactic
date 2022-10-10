import { SVGProps, ReactNode, SyntheticEvent } from 'react';
import { PresentationAttributes } from 'recharts';

export interface IVennDataItem {
  name?: string;
  sets: string[];
  size: number;
}

export interface ICirclesObjItem {
  x: number;
  y: number;
  radius: number;
  data: IVennDataItem;
}

export interface ICirclesObj {
  [key: string]: ICirclesObjItem;
}

export interface IVennPayloadItem {
  payload: IVennDataItem;
  name: string;
  value: number;
  fill: string;
  data: IVennDataItem[];
}

export interface IVennChartProps extends Partial<PresentationAttributes> {
  width?: number;
  height?: number;
  data: IVennDataItem[];
  /**
   * Internal chart padding
   * @default 2
   */
  padding?: number;
  /**
   * Rotate sets in the chart
   * @default Math.PI / 2
   */
  orientation?: number;
  /**
   * The function for sorting sets inside the chart
   * @default (area1, area2) => area2.radius - area1.radius
   */
  orientationOrder?: (el1: ICirclesObjItem, el2: ICirclesObjItem) => number;
  /**
   * Minimum radius of the set
   * @default 6
   */
  minAreaRadius?: number;
  /**
   * The function for formatting the value (size) of the intersection of sets in the tooltip
   * @default (val) => val
   */
  tooltipLabelIntersectionSizeFormatter?: (value: string | number) => string | number;
  /**
   * @ignore
   */
  className?: string;
  /**
   * @ignore
   */
  children: ReactNode[];

  /**
   * Callback on the onMouseEnter of the chart element
   */
  onMouseEnter?(e: SyntheticEvent, payload: IVennPayloadItem[]): void;
  /**
   * Callback on the onMouseLeave of the chart element
   */
  onMouseLeave?(e: SyntheticEvent, payload: IVennPayloadItem[]): void;
  /**
   * Callback on the onClick of the chart element
   */
  onClick?(e: SyntheticEvent, payload: IVennPayloadItem[]): void;
}

export interface IVennChartState {
  children: ReactNode[];
  data: IVennDataItem[];
  actualData: IVennDataItem[];
  activeNode: IVennChildProps<any>;
  isTooltipActive: boolean;
}

export interface IVennChildProps<T> extends Partial<SVGProps<T>> {
  /**
   * The `name` field of the set in the chart data array
   */
  name: string;
  /**
   * fillOpacity of the set on hover
   */
  activeFillOpacity?: number;
  /**
   * Hides the set
   * @default false
   */
  hidden?: boolean;
  /**
   * @ignore
   */
  active?: boolean;
  /**
   * @ignore
   */
  data?: IVennDataItem;
  /**
   * @ignore
   */
  circles?: ICirclesObjItem[];
  /**
   * @ignore
   */
  size?: number;
  /**
   * @ignore
   */
  sets?: string[];
}
