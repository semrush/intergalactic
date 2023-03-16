import IContext from './context';
import { MapProps } from './Plot';
import { ReturnEl } from '@semcore/core';
import { CurveFactory } from 'd3-shape';

export interface IRadarProps extends IContext {
  /**
   * Scale for radar element
   * */
  scale: any;
  /**
   * Graph type to be displayed
   * @default 'polygon'
   * */
  type?: 'polygon' | 'circle';
  /**
   * Indent from the edge of svg to graph
   * */
  offset?: number;

  /**
   * Label font size
   * @default 12
   * */
  textSize?: number;

  /**
   * Base angle of chart rotation
   * @default 0
   * @example Math.PI/3
   * */
  angleOffset?: number;
}

export interface IRadarAxisProps extends IContext {
  /**
   * Sets the field name for categories
   * */
  dataKey: string;
}

export interface IRadarAxisTicksProps {
  /**
   * Distance between auxiliary lines
   * @default 100
   * */
  tickSize?: number;
}

export interface IRadarAxisLabelsProps {
  /**
   * Indent from graph to label
   * @default 10
   * */
  labelOffset?: number;
}

export interface IRadialPolygonProps extends IContext {
  /**
   * Sets the field name for data
   * */
  dataKey: string;
  /**
   * Curve method
   * @default curveLinearClosed
   * */
  curve?: CurveFactory;
  /**
   * Sets the color of the entire polygon
   * */
  color?: string;
  /**
   * Sets the fill color
   * */
  fill?: string;
}

export interface IRadialPolygonLineProps {
  /**
   * Sets the line color
   * */
  color?: string;
}

export interface IRadialPolygonDotsProps {
  /**
   * Sets the dot color
   * */
  color?: string;
}

export interface IRadarHoverProps extends IContext {}

declare const Radar: (<T>(props: MapProps<IRadarProps & T>) => ReturnEl) & {
  Axis: (<T>(props: MapProps<IRadarAxisProps & T>) => ReturnEl) & {
    Ticks: <T>(props: MapProps<IRadarAxisTicksProps & T>) => ReturnEl;
    Labels: <T>(props: MapProps<IRadarAxisLabelsProps & T>) => ReturnEl;
  };
  Polygon: (<T>(props: MapProps<IRadialPolygonProps & T>) => ReturnEl) & {
    Line: <T>(props: MapProps<IRadialPolygonLineProps & T>) => ReturnEl;
    Dots: <T>(props: MapProps<IRadialPolygonDotsProps & T>) => ReturnEl;
  };
  Hover: <T>(props: MapProps<IRadarHoverProps & T>) => ReturnEl;
};

export default Radar;
