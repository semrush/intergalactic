import React, { cloneElement } from 'react';
import { Component, ReturnEl, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import trottle from '@semcore/utils/lib/rafTrottle';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { polygonContains } from 'd3-polygon';
import { line, lineRadial, curveLinearClosed, curveCardinalClosed, arc } from 'd3-shape';
import createElement from './createElement';
import { CONSTANT, eventToPoint, measureText } from './utils';
import IContext from './types/context';
import { MapProps } from './types';

import style from './style/radar.shadow.css';


interface IRadarProps extends IContext {
  /**
   * домейн
   * */
  scale: any
  /**
   * @default 'polygon'
   * */
  type?: 'polygon' | 'circle',
  /**
   * Отступ
   * */
  offset?: number
}

interface IRadarAxisProps extends IContext {

}

interface IRadarAxisTicksProps {
}

interface IRadarAxisLabelsProps {
}

interface IRadialPolygonProps extends IContext {
}

interface IRadialPolygonLineProps {
}

interface IRadialPolygonDotProps {
}

interface IRadarHoverProps extends IContext {
}

function getAngle(i, range, func, total) {
  const angle = (total - i) * 2 * Math.PI / total;
  return range * (1 - func(angle)) - range;
}

function getRadianPosition(i, range, total) {
  return [
    getAngle(i, range, Math.sin, total),
    getAngle(i, range, Math.cos, total),
  ];
}

function getDirectionLabel(i, total) {
  const angle = -Math.PI / 2 + (i / total) * (Math.PI * 2);
  return [
    Math.abs(angle) === Math.PI / 2 ? 'middle' : angle < Math.PI / 2 ? 'start' : 'end',
    angle === Math.PI / 2 ? 'mathematical' : angle === -Math.PI / 2 ? 'alphabetic' : 'middle',
  ];
}

function computeTextWidth(texts, textSize, defaultWidth = 50, defaultHeight = 20) {
  const widths = texts.map((text) => {
    if (typeof text === 'string') {
      return measureText(text, textSize);
    }
    if (React.isValidElement(text)) {
      // @ts-ignore
      return Math.max(text.props?.width || defaultWidth, text.props?.height || defaultHeight);
    }
    return defaultWidth;
  });
  return Math.max(...widths);
}

function getTicks(tickSize, radius) {
  let ticks = 0;
  while (Math.trunc(radius / (tickSize / 2)) > ticks) {
    ticks += 1;
  }
  return [...Array(ticks).keys()].reduce((ticks, t, i, total) => {
    if (i) ticks.push(i / total.length);
    return ticks;
  }, []);
}

function pieContains([startAngle, endAngle, radius]: number[], [x, y]) {
  const distance = Math.sqrt(x ** 2 + y ** 2);
  if (distance > radius) return false;

  let angle = Math.atan2(y, x) + Math.PI / 2;
  if (angle < 0) {
    // angle from 0 to 6.28...
    angle += 2 * Math.PI;
  }
  if (startAngle < 0) {
    if (angle < endAngle) {
      angle += Math.abs(startAngle);
    } else {
      angle += Math.abs(startAngle) - Math.PI * 2;
    }
    endAngle += Math.abs(startAngle);
    startAngle = 0;
  }
  return angle > startAngle && angle < endAngle;
}

export function getOffsetLabelPosition(xDirection, yDirection, width, height) {
  let xOffset = 0;
  let yOffset = 0;
  switch (`${xDirection}-${yDirection}`) {
    case 'middle-alphabetic':
      yOffset = height / 2;
      break;
    case 'start-middle':
      xOffset = -width / 2;
      break;
    case 'middle-mathematical':
      yOffset = -height / 2;
      break;
    case 'end-middle':
      xOffset = width / 2;
      break;
  }
  return [xOffset + width / 2, yOffset + height / 2];
}

class RadarRoot extends Component<IRadarProps> {
  static displayName = 'Line';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  Element!: React.FC<{ children?: React.ReactNode; render: string }>;

  computeOffset = 0;

  categoriesKey = null;

  textSize = 12;

  static defaultProps = {
    type: 'polygon',
  };

  get id() {
    const { id, uid } = this.asProps;
    return id || uid;
  }

  get offset() {
    const { offset } = this.asProps;
    return offset ?? this.computeOffset;
  }

  getAxisProps() {
    return {
      offset: this.offset,
      textSize: this.textSize,
      type: this.asProps.type,
    };
  }

  getPolygonProps({ dataKey }) {
    const { data, scale } = this.asProps;

    return {
      offset: this.offset,
      data: data[dataKey] || [],
      scale,
    };
  }

  getHoverProps() {
    return {
      type: this.asProps.type,
      offset: this.offset,
      categories: this.asProps.data[this.categoriesKey],
    };
  }

  render() {
    const SRadar = this.Element;
    const { Children, style, size, data, offset } = this.asProps;
    const [width, height] = size;

    let dataKey;
    React.Children.toArray(getOriginChildren(Children)).forEach((child) => {
      if (React.isValidElement(child) && child.type === Radar.Axis) {
        dataKey = child.props.dataKey;
      }
    });
    if (dataKey) {
      if (offset === undefined) {
        // +5 because font might not be loaded and just in case)
        this.computeOffset = computeTextWidth(data[dataKey], this.textSize) + 5;
      }
      this.categoriesKey = dataKey;
    }

    return sstyled(style)(
      <SRadar
        aria-hidden
        id={this.id}
        render='g'
        childrenPosition='inside'
        transform={`translate(${width / 2},${height / 2})`}
      />,
    );
  }
}

class PolygonRoot extends Component {
  static displayName = 'Polygon';
  static style = style;

  static defaultProps = ({ scale, curve = curveLinearClosed, size, offset }) => {
    scale.range([0, (Math.min(size[0], size[1]) / 2) - offset]);

    return {
      d3: lineRadial()
        .curve(curve)
        .radius((d) => {
          return scale(d || 0);
        })
        .angle((d, i, data) => {
          return ((i / data.length) * 2 * Math.PI);
        }),
    };
  };

  getDotProps() {
    const { data, scale, color, transparent } = this.asProps;
    return {
      data,
      scale,
      color,
      transparent,
    };
  }

  getLineProps() {
    const { d3, data, color, transparent } = this.asProps;
    return {
      data,
      color,
      transparent,
      d3,
    };
  }

  render() {
    const { Element: SPolygon, styles, d3, data, color, fill } = this.asProps;
    return sstyled(styles)(
      <SPolygon render='path' d={d3(data)} color={fill || color} />,
    );
  }
}

function PolygonLine(props) {
  const { Element: SPolygonLine, styles, d3, color, data, transparent } = props;
  return sstyled(styles)(
    <SPolygonLine render='path' d={d3(data)} color={color} transparent={transparent} />,
  );
}

function PolygonDot(props) {
  const { Element: SPolygonDot, styles, color, data, scale, transparent } = props;
  return data.map((value, i) => {
    if (value === null || value === undefined) return;
    const radius = scale(value);
    const [cx, cy] = getRadianPosition(i, radius, data.length);
    return sstyled(styles)(
      <SPolygonDot
        key={i}
        render='circle'
        cx={cx}
        cy={cy}
        color={color}
        transparent={transparent}
      />,
    );
  });
}

class AxisRoot extends Component {
  static displayName = 'Polygon';
  static style = style;

  static defaultProps = ({ data, dataKey }) => {
    const categories = data[dataKey];
    return {
      categories,
    };
  };

  unsubscribeTooltipVisible = null;

  state = {
    activeLineIndex: null,
  };

  createLineRadial(radius, total) {
    return lineRadial()
      .curve(curveLinearClosed)
      .radius((d, i) => {
        return radius;
      })
      .angle((d, i) => {
        return ((i / total) * 2 * Math.PI);
      });
  }

  getTicksProps({ tickSize = 100 }) {
    const { data, offset, categories, size, type } = this.asProps;
    const radius = (Math.min(size[0], size[1]) / 2) - offset;
    return {
      type,
      data,
      categories,
      ticks: getTicks(tickSize, radius),
      offset,
      d3: this.createLineRadial(radius, categories.length),
    };
  }

  getLabelsProps() {
    const { offset, categories, textSize } = this.asProps;
    return {
      categories,
      textSize,
      offset: offset - 10,
    };
  }

  handlerTooltipVisible = (visible, { index }) => {
    this.setState({
      activeLineIndex: index,
    });
  };

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    this.unsubscribeTooltipVisible = eventEmitter.subscribe('onTooltipVisible', this.handlerTooltipVisible);
  }

  componentWillUnmount() {
    if (this.unsubscribeTooltipVisible) {
      this.unsubscribeTooltipVisible();
    }
  }

  render() {
    const { Element: SAxis, styles, categories, size, offset, type } = this.asProps;
    const { activeLineIndex } = this.state;
    const radius = (Math.min(size[0], size[1]) / 2) - offset;
    console.log(offset);
    const total = categories.length;

    return sstyled(styles)(
      <>
        {type === 'circle' ? <SAxis render='circle' cx={0} cy={0} r={radius} /> :
          <SAxis render='path' d={this.createLineRadial(radius, total)(categories)} />}
        {categories.map((category, i) => {
          const [x, y] = getRadianPosition(i, radius, total);
          const { className } = sstyled(styles).cn('SAxisLine', {
            active: activeLineIndex === i,
          });
          return <line key={i} x1={0} y1={0} x2={x} y2={y} className={className} />;
        })}
      </>,
    );
  }
}

function AxisTicks(props) {
  const { Element: SAxisTick, styles, size, ticks, d3, categories, offset, type } = props;
  const radius = (Math.min(size[0], size[1]) / 2) - offset;

  return ticks.map((tick, i) => {
    d3.radius(() => radius * tick);
    return sstyled(styles)(
      type === 'circle' ? <SAxisTick key={i} render='circle' cx={0} cy={0} r={radius * tick} /> :
        <SAxisTick render='path' key={i} d={d3(categories)} />,
    );
  });
}

function AxisLabels(props) {
  const { Element: SAxisLabel, styles, textSize, size, offset, categories } = props;
  const radius = (Math.min(size[0], size[1]) / 2) - offset;

  return categories.map((category, i) => {
    const [x, y] = getRadianPosition(i, radius, categories.length);
    const [xDirection, yDirection] = getDirectionLabel(i, categories.length);
    if (typeof category === 'string') {
      const lines = category.split('\n');
      return sstyled(styles)(
        <SAxisLabel
          key={i}
          render='text'
          childrenPosition='inside'
          x={x}
          y={y}
          xDirection={xDirection}
          yDirection={yDirection}
        >
          {lines.map((lineText, lineIndex) => (
            <tspan
              x={x}
              y={y + (lineIndex - (lines.length - 1) / 2) * textSize}
              key={`#${lineIndex}-${lineText}`}
            >
              {lineText}
            </tspan>
          ))}
        </SAxisLabel>,
      );
    }
    if (React.isValidElement(category)) {
      const { width = 0, height = 0 } = category?.props;
      const [xOffset, yOffset] = getOffsetLabelPosition(xDirection, yDirection, width, height);
      return cloneElement(category, {
        key: i,
        x: x - xOffset,
        y: y - yOffset,
      });
    }
  });
}

class Hover extends Component {

  state = {
    index: null,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  unsubscribeMouseMoveRoot = null;
  unsubscribeMouseLeaveRoot = null;

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  getPolygon(index) {
    const { categories, size, offset } = this.asProps;
    const total = categories.length;
    const diam = Math.min(size[0], size[1]);
    const radius = (diam / 2) - offset;
    const prevIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1 + total) % total;
    const [prevX1, prevY1] = getRadianPosition(prevIndex, radius, total);
    const [x, y] = getRadianPosition(index, radius, total);
    const [nextX1, nextY1] = getRadianPosition(nextIndex, radius, total);
    return [
      [0, 0],
      [(prevX1 + x) / 2, (prevY1 + y) / 2],
      [x, y],
      [(nextX1 + x) / 2, (nextY1 + y) / 2],
    ];
  }

  getPie(index) {
    const { categories, size, offset } = this.asProps;
    const angle = Math.PI * 2 / categories.length;
    const radius = Math.min(size[0], size[1]) / 2 - offset;
    return [
      index * angle - angle / 2,
      (index + 1) * angle - angle / 2,
      radius,
    ];
  }

  getIndex(point) {
    const { categories, type } = this.asProps;
    let index;
    if (type == 'circle') {
      index = categories.findIndex((c, i) => pieContains(this.getPie(i), point));
    } else {
      index = categories.findIndex((c, i) => polygonContains(this.getPolygon(i), point));
    }
    return index === -1 ? null : index;
  }

  handlerMouseMoveRoot = trottle((e) => {
    const { eventEmitter, size, rootRef } = this.asProps;
    const point = eventToPoint(e, rootRef.current);
    const diam = Math.min(size[0], size[1]);
    const centerX = point[0] - diam / 2;
    const centerY = point[1] - diam / 2;
    const { clientX, clientY } = e;
    // @ts-ignore
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(
      clientX,
      clientY,
    );
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;

    const index = this.getIndex([centerX, centerY]);

    this.setState({
      index,
    }, () => {
      eventEmitter.emit(
        'onTooltipVisible',
        index !== null,
        { index },
        this.virtualElement,
      );
    });
  });

  handlerMouseLeaveRoot = trottle((e) => {
    this.setState({
      index: null,
    }, () => {
      this.asProps.eventEmitter.emit('onTooltipVisible', false, { index: null });
    });
  });

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    this.unsubscribeMouseMoveRoot = eventEmitter.subscribe('onMouseMoveRoot', (e) => {
      e.persist();
      this.handlerMouseMoveRoot(e);
    });
    this.unsubscribeMouseLeaveRoot = eventEmitter.subscribe(
      'onMouseLeaveRoot',
      this.handlerMouseLeaveRoot,
    );
  }

  componentWillUnmount() {
    if (this.unsubscribeMouseMoveRoot) {
      this.unsubscribeMouseMoveRoot();
    }
    if (this.unsubscribeMouseLeaveRoot) {
      this.unsubscribeMouseLeaveRoot();
    }
  }

  render() {
    const { styles, type } = this.asProps;
    const { index } = this.state;
    const SPieRect = this.Element;

    if (index !== null) {
      if (type === 'circle') {
        const [startAngle, endAngle, radius] = this.getPie(index);
        const circle = arc()
          .innerRadius(0)
          .outerRadius(radius)
          .startAngle(startAngle)
          .endAngle(endAngle);
        return sstyled(styles)(
          <SPieRect
            render='path'
            // @ts-ignore
            d={circle()}
          />,
        );
      } else {
        return sstyled(styles)(
          <SPieRect
            render='path'
            // @ts-ignore
            d={line()(this.getPolygon(index))}
          />,
        );
      }
    }
  }
}

const Axis = createElement(AxisRoot, {
  Ticks: AxisTicks,
  Labels: AxisLabels,
});

const Polygon = createElement(PolygonRoot, {
  Line: PolygonLine,
  Dot: PolygonDot,
});

const Radar = createElement(RadarRoot, {
  Axis,
  Polygon,
  Hover,
}) as (<T>(
  props: MapProps<IRadarProps & T>,
) => ReturnEl) & {
  Axis: (<T>(props: MapProps<IRadarAxisProps & T>) => ReturnEl) & {
    Ticks: <T>(props: MapProps<IRadarAxisTicksProps & T>) => ReturnEl;
    Labels: <T>(props: MapProps<IRadarAxisLabelsProps & T>) => ReturnEl;
  };
  Polygon: (<T>(props: MapProps<IRadialPolygonProps & T>) => ReturnEl) & {
    Line: <T>(props: MapProps<IRadialPolygonLineProps & T>) => ReturnEl;
    Dot: <T>(props: MapProps<IRadialPolygonDotProps & T>) => ReturnEl;
  };
  Hover: (<T>(props: MapProps<IRadarHoverProps & T>) => ReturnEl)
};

export default Radar;