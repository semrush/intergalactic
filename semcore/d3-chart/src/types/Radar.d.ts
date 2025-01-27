import type { Context } from './context';
import type { UnknownProperties } from '@semcore/core';
import type { CurveFactory } from 'd3-shape';
import type { TooltipType } from './Tooltip';
import type { IntergalacticD3Component } from './Plot';
import type { BoxProps } from '@semcore/flex-box';
import type { PatternsConfig } from './Pattern';

/** @deprecated */
export interface IRadarProps extends RadarProps, UnknownProperties {}
export type RadarProps = Context & {
  /**
   * Scale for radar element
   * */
  /** @deprecated */
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
  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
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

type RadarAxisLabelsContext = Context & {
  xDirection: 'middle' | 'start' | 'end';
  yDirection: 'alphabetic' | 'mathematical' | 'middle';
  x: number;
  y: number;
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
export type RadarHoverProps = BoxProps & Context & {};

declare const Radar: IntergalacticD3Component<'g', RadarProps, Context> & {
  Axis: IntergalacticD3Component<'path', RadarAxisProps, Context> & {
    Ticks: IntergalacticD3Component<'path', RadarAxisTicksProps, Context>;
    Labels: IntergalacticD3Component<'text', RadarAxisLabelsProps, RadarAxisLabelsContext>;
  };
  Polygon: IntergalacticD3Component<'path', RadialPolygonProps, Context> & {
    Line: IntergalacticD3Component<'line', RadialPolygonLineProps, Context>;
    Dots: IntergalacticD3Component<'circle', RadialPolygonDotsProps, Context>;
  };
  Hover: IntergalacticD3Component<'path', RadarHoverProps, Context>;
  Tooltip: TooltipType<
    RadarHoverProps & {
      /** Index in `data` array of the current items */
      index: number;
    }
  >;
};

export declare function getLabelOffsetPosition(
  xDirection: 'middle' | 'start' | 'end',
  yDirection: 'alphabetic' | 'mathematical' | 'middle',
  width: number,
  height: number,
): [xOffset: number, yOffset: number];

export default Radar;
