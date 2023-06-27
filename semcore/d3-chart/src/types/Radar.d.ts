import { Context } from './context';
import { UnknownProperties, Intergalactic } from '@semcore/core';
import { CurveFactory } from 'd3-shape';
import { TooltipType } from './Tooltip';

/** @deprecated */
export interface IRadarProps extends RadarProps, UnknownProperties {}
export type RadarProps = Context & {
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
};

/** @deprecated */
export interface IRadarAxisProps extends RadarAxisProps, UnknownProperties {}
export type RadarAxisProps = Context & {
  /**
   * Sets the field name for categories
   * */
  dataKey: string;
};

/** @deprecated */
export interface IRadarAxisTicksProps extends RadarAxisTicksProps, UnknownProperties {}
export type RadarAxisTicksProps = {
  /**
   * Distance between auxiliary lines
   * @default 100
   * */
  tickSize?: number;
};

/** @deprecated */
export interface IRadarAxisLabelsProps extends RadarAxisLabelsProps, UnknownProperties {}
export type RadarAxisLabelsProps = {
  /**
   * Indent from graph to label
   * @default 10
   * */
  labelOffset?: number;
};

/** @deprecated */
export interface IRadialPolygonProps extends RadialPolygonProps, UnknownProperties {}
export type RadialPolygonProps = Context & {
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
};

/** @deprecated */
export interface IRadialPolygonLineProps extends RadialPolygonLineProps, UnknownProperties {}
export type RadialPolygonLineProps = {
  /**
   * Sets the line color
   * */
  color?: string;
};

/** @deprecated */
export interface IRadialPolygonDotsProps extends RadialPolygonDotsProps, UnknownProperties {}
export type RadialPolygonDotsProps = {
  /**
   * Sets the dot color
   * */
  color?: string;
};

/** @deprecated */
export interface IRadarHoverProps extends RadarHoverProps, UnknownProperties {}
export type RadarHoverProps = Context & {};

declare const Radar: Intergalactic.Component<'g', RadarProps, Context> & {
  Axis: Intergalactic.Component<'path', RadarAxisProps, Context> & {
    Ticks: Intergalactic.Component<'path', RadarAxisTicksProps, Context>;
    Labels: Intergalactic.Component<'text', RadarAxisLabelsProps, Context>;
  };
  Polygon: Intergalactic.Component<'path', RadialPolygonProps, Context> & {
    Line: Intergalactic.Component<'line', RadialPolygonLineProps, Context>;
    Dots: Intergalactic.Component<'circle', RadialPolygonDotsProps, Context>;
  };
  Hover: Intergalactic.Component<'path', RadarHoverProps, Context>;
  Tooltip: TooltipType<
    IRadarHoverProps & {
      /** Index in `data` array of the current items */
      index: number;
    }
  >;
};

export default Radar;
