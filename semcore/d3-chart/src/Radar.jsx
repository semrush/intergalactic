import React, { cloneElement } from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { polygonContains } from 'd3-polygon';
import { line, lineRadial, curveLinearClosed, arc } from 'd3-shape';
import createElement from './createElement';
import { eventToPoint, getChartDefaultColorName, measureText } from './utils';
import Tooltip from './Tooltip';
import { PatternFill, PatternSymbol, getPatternSymbolSize } from './Pattern';

import style from './style/radar.shadow.css';

const clampAngle = (angle) => {
  angle = angle % (2 * Math.PI);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
};

function getBoxAxesValue(i, range, axes, total, angleOffset) {
  const func = axes === 'y' ? Math.sin : Math.cos;

  const angle = clampAngle(((total - i) * 2 * Math.PI) / total + angleOffset);
  return range * (1 - func(angle)) - range;
}

function getRadianPosition(i, range, total, angleOffset) {
  return [
    getBoxAxesValue(i, range, 'y', total, angleOffset),
    getBoxAxesValue(i, range, 'x', total, angleOffset),
  ];
}

const getLabelXPlacement = (i, total, angleOffset) => {
  const angle = clampAngle((i / total) * (Math.PI * 2) - angleOffset);
  if (angle >= Math.PI + Math.PI * (8 / 9) || angle <= Math.PI * (1 / 9)) return 'middle';
  if (angle >= Math.PI * (8 / 9) && angle <= Math.PI + Math.PI * (1 / 9)) return 'middle';

  return angle < Math.PI ? 'start' : 'end';
};
const getLabelYPlacement = (i, total, angleOffset) => {
  const angle = clampAngle((i / total) * (Math.PI * 2) - angleOffset);
  if (angle >= Math.PI + Math.PI * (8 / 9) || angle <= Math.PI * (1 / 9)) return 'alphabetic';
  if (angle >= Math.PI * (8 / 9) && angle <= Math.PI + Math.PI * (1 / 9)) return 'mathematical';

  return 'middle';
};

function getLabelPlacement(i, total, angleOffset) {
  return [getLabelXPlacement(i, total, angleOffset), getLabelYPlacement(i, total, angleOffset)];
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

function pieContains([startAngle, endAngle, radius], [x, y]) {
  const distance = Math.sqrt(x ** 2 + y ** 2);
  if (distance > radius) return false;

  startAngle = clampAngle(startAngle);
  endAngle = clampAngle(endAngle);
  startAngle = startAngle < endAngle ? startAngle : startAngle - 2 * Math.PI;

  const angle = clampAngle(Math.atan2(y, x) + Math.PI / 2);
  const prevAngle = angle - Math.PI * 2;
  const nextAngle = angle + Math.PI * 2;

  if (angle > startAngle && angle < endAngle) return true;
  if (prevAngle > startAngle && prevAngle < endAngle) return true;
  if (nextAngle > startAngle && nextAngle < endAngle) return true;
  return false;
}

export function getLabelOffsetPosition(xDirection, yDirection, width, height) {
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

const MINIMUM_OFFSET = 5;

class RadarRoot extends Component {
  static displayName = 'Line';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  computeOffset = 0;

  categoriesKey = null;

  static defaultProps = {
    type: 'polygon',
    angleOffset: 0,
  };

  get id() {
    const { id, uid } = this.asProps;
    return id || uid;
  }

  get offset() {
    const { offset } = this.asProps;
    return offset ?? this.computeOffset;
  }

  get textSize() {
    const { textSize } = this.asProps;
    return textSize ?? 12;
  }

  getAxisProps() {
    return {
      offset: this.offset,
      textSize: this.textSize,
      type: this.asProps.type,
      angleOffset: this.asProps.angleOffset,
    };
  }

  getPolygonProps({ dataKey }, index) {
    const { data, scale, angleOffset, uid, patterns } = this.asProps;

    return {
      offset: this.offset,
      data: data[dataKey] || [],
      scale,
      angleOffset,
      color: getChartDefaultColorName(index),
      uid: `${uid}-${index}`,
      patterns,
    };
  }

  getHoverProps() {
    return {
      type: this.asProps.type,
      offset: this.offset,
      categories: this.asProps.data[this.categoriesKey],
      angleOffset: this.asProps.angleOffset,
    };
  }

  render() {
    const SRadar = this.Element;
    const { Children, styles, size, data, offset } = this.asProps;
    const [width, height] = size;

    this.asProps.dataHintsHandler.establishDataType('indexed-groups');

    let dataKey;
    React.Children.toArray(getOriginChildren(Children)).forEach((child) => {
      if (React.isValidElement(child) && child.type === Radar.Axis) {
        dataKey = child.props.dataKey;
      }
    });
    if (dataKey) {
      if (offset === undefined) {
        // +5 because font might not be loaded and just in case)
        this.computeOffset = computeTextWidth(data[dataKey], this.textSize) + MINIMUM_OFFSET;
      }
      this.categoriesKey = dataKey;
    }

    return sstyled(styles)(
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

  static defaultProps = ({ scale, curve = curveLinearClosed, size, offset, angleOffset }) => {
    scale.range([0, Math.min(size[0], size[1]) / 2 - offset]);

    return {
      d3: lineRadial()
        .curve(curve)
        .radius((d) => {
          return scale(d || 0);
        })
        .angle((d, i, data) => {
          return (i / data.length) * 2 * Math.PI - angleOffset;
        }),
    };
  };

  getDotsProps() {
    const {
      data,
      scale,
      color,
      resolveColor,
      transparent,
      dataKey,
      dataHintsHandler,
      angleOffset,
      patterns,
    } = this.asProps;
    return {
      data,
      scale,
      color,
      resolveColor,
      transparent,
      categoryKey: dataKey,
      dataHintsHandler,
      angleOffset,
      patterns,
    };
  }

  getLineProps() {
    const { d3, data, color, resolveColor, transparent } = this.asProps;
    return {
      data,
      color,
      resolveColor,
      transparent,
      d3,
    };
  }

  render() {
    const {
      Element: SPolygon,
      styles,
      d3,
      data,
      color,
      resolveColor,
      fill,
      uid,
      patterns,
    } = this.asProps;
    return (
      <>
        {sstyled(styles)(
          <SPolygon
            render='path'
            d={d3(data)}
            color={resolveColor(fill || color)}
            pattern={patterns ? `url(#${uid}-pattern)` : undefined}
          />,
        )}
        {patterns && (
          <PatternFill
            id={`${uid}-pattern`}
            patternKey={color}
            color={resolveColor(fill || color)}
            patterns={patterns}
          />
        )}
      </>
    );
  }
}

function PolygonLine(props) {
  const { Element: SPolygonLine, styles, d3, color, resolveColor, data, transparent } = props;
  return sstyled(styles)(
    <SPolygonLine
      render='path'
      d={d3(data)}
      color={resolveColor(color)}
      transparent={transparent}
    />,
  );
}

function PolygonDots(props) {
  const {
    Element: SPolygonDot,
    styles,
    color,
    resolveColor,
    data,
    scale,
    transparent,
    categoryKey,
    angleOffset,
    patterns,
  } = props;
  return data.map((value, i) => {
    if (value === null || value === undefined) return;
    const radius = scale(value);
    props.dataHintsHandler.describeGroupedValues(categoryKey, `${categoryKey}.${i}`);
    const [cx, cy] = getRadianPosition(i, radius, data.length, angleOffset);

    if (!patterns) {
      return sstyled(styles)(
        <SPolygonDot
          render='circle'
          color={resolveColor(color)}
          transparent={transparent}
          patternKey={color}
          key={`${i}`}
          cx={cx}
          cy={cy}
        />,
      );
    }

    const patternKey = color || getChartDefaultColorName(0);
    const [width, height] = getPatternSymbolSize({
      patternKey,
      patterns,
    });

    return sstyled(styles)(
      <SPolygonDot
        render={PatternSymbol}
        color={resolveColor(color)}
        transparent={transparent}
        patternKey={color}
        key={`${i}`}
        x={cx - width / 2}
        y={cy - height / 2}
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
      .radius(() => {
        return radius;
      })
      .angle((d, i) => {
        return (i / total) * 2 * Math.PI;
      });
  }

  getTicksProps({ tickSize = 100 }) {
    const { data, offset, categories, size, type } = this.asProps;
    const radius = Math.min(size[0], size[1]) / 2 - offset;
    return {
      type,
      data,
      categories,
      ticks: getTicks(tickSize, radius),
      offset,
      d3: this.createLineRadial(radius, categories.length),
    };
  }

  getLabelsProps({ labelOffset = 10 }) {
    const { offset, categories, textSize, angleOffset } = this.asProps;
    return {
      categories,
      textSize,
      offset: offset - labelOffset,
      angleOffset,
    };
  }

  handleTooltipRenderingProps = (_anchorProps, { index }) => {
    this.setState({ activeLineIndex: index });
  };

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    this.unsubscribeTooltipVisible = eventEmitter.subscribe(
      'setTooltipRenderingProps',
      this.handleTooltipRenderingProps,
    );
  }

  componentWillUnmount() {
    this.unsubscribeTooltipVisible?.();
  }

  render() {
    const { Element: SAxis, styles, categories, size, offset, type, angleOffset } = this.asProps;
    const { activeLineIndex } = this.state;
    const radius = Math.min(size[0], size[1]) / 2 - offset;
    const total = categories.length;

    return sstyled(styles)(
      <>
        {type === 'circle' ? (
          <SAxis render='circle' cx={0} cy={0} r={radius} />
        ) : (
          <SAxis render='path' d={this.createLineRadial(radius, total)(categories)} />
        )}
        {categories.map((category, i) => {
          const [x, y] = getRadianPosition(i, radius, total, angleOffset);
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
  const radius = Math.min(size[0], size[1]) / 2 - offset;

  return ticks.map((tick, i) => {
    d3.radius(() => radius * tick);
    return sstyled(styles)(
      type === 'circle' ? (
        <SAxisTick key={i} render='circle' cx={0} cy={0} r={radius * tick} />
      ) : (
        <SAxisTick render='path' key={i} d={d3(categories)} />
      ),
    );
  });
}

function AxisLabels(props) {
  const { Element: SAxisLabel, styles, textSize, size, offset, categories, angleOffset } = props;
  const radius = Math.min(size[0], size[1]) / 2 - offset;

  return categories.map((category, i) => {
    const [x, y] = getRadianPosition(i, radius, categories.length, angleOffset);
    const [xDirection, yDirection] = getLabelPlacement(i, categories.length, angleOffset);
    if (typeof category === 'string') {
      props.dataHintsHandler.labelKey('value', i, category);

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
      const { width = 0, height = 0 } = category?.props ?? {};
      const [xOffset, yOffset] = getLabelOffsetPosition(xDirection, yDirection, width, height);
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
    const { categories, size, offset, angleOffset } = this.asProps;
    const total = categories.length;
    const diam = Math.min(size[0], size[1]);
    const radius = diam / 2 - offset;
    const prevIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1 + total) % total;
    const [prevX1, prevY1] = getRadianPosition(prevIndex, radius, total, angleOffset);
    const [x, y] = getRadianPosition(index, radius, total, angleOffset);
    const [nextX1, nextY1] = getRadianPosition(nextIndex, radius, total, angleOffset);
    return [
      [0, 0],
      [(prevX1 + x) / 2, (prevY1 + y) / 2],
      [x, y],
      [(nextX1 + x) / 2, (nextY1 + y) / 2],
    ];
  }

  getPie(index) {
    const { categories, size, offset, angleOffset } = this.asProps;
    const angle = (Math.PI * 2) / categories.length;
    const radius = Math.min(size[0], size[1]) / 2 - offset;
    return [
      index * angle - angle / 2 - angleOffset,
      (index + 1) * angle - angle / 2 - angleOffset,
      radius,
    ];
  }

  getIndex(point) {
    const { categories, type } = this.asProps;
    let index;
    if (type === 'circle') {
      index = categories.findIndex((c, i) => pieContains(this.getPie(i), point));
    } else {
      index = categories.findIndex((c, i) => polygonContains(this.getPolygon(i), point));
    }
    return index === -1 ? null : index;
  }

  handlerMouseMoveRoot = trottle((e) => {
    const { eventEmitter, size, rootRef, patterns } = this.asProps;
    const point = eventToPoint(e, rootRef.current);
    const diam = Math.min(size[0], size[1]);
    const centerX = point[0] - diam / 2;
    const centerY = point[1] - diam / 2;
    const { clientX, clientY } = e;

    const index = this.getIndex([centerX, centerY]);

    this.setState({ index }, () => {
      eventEmitter.emit('setTooltipPosition', clientX, clientY);
      eventEmitter.emit('setTooltipRenderingProps', {}, { index, patterns });
      eventEmitter.emit('setTooltipVisible', index !== null);
    });
  });

  handlerMouseLeaveRoot = trottle(() => {
    this.setState({ index: null }, () => {
      this.asProps.eventEmitter.emit('setTooltipVisible', false);
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

    return null;
  }
}

const Axis = createElement(AxisRoot, {
  Ticks: AxisTicks,
  Labels: AxisLabels,
});

const Polygon = createElement(PolygonRoot, {
  Line: PolygonLine,
  Dots: PolygonDots,
});

const RadarTooltip = (props) => {
  const SRadarTooltip = Root;
  return sstyled(props.styles)(
    <SRadarTooltip render={Tooltip} tag={Radar.Hover} excludeAnchorProps />,
  );
};

const Radar = createElement(RadarRoot, {
  Axis,
  Polygon,
  Hover,
  Tooltip: [RadarTooltip, Tooltip._______childrenComponents],
});

export default Radar;
