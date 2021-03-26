import React, { useEffect, useState } from 'react';
import { area, stack, line } from 'd3-shape';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import Area from './Area';
import style from './style/area.shadow.css';
import { bisector } from 'd3-array';
import { definedData, scaleOfBandwidth, getNullData } from './utils';

class StackedAreaRoot extends Component {
  static displayName = 'StackedArea';

  static style = style;

  static defaultProps = () => {
    return {
      color: '#50aef4',
    };
  };

  getSeries() {
    const { data, x } = this.asProps;
    const keys = Object.keys(data[0]).filter((oY) => oY !== x);
    return stack().keys(keys)(data);
  }

  getAreaProps({ y }) {
    const { x } = this.asProps;
    const series = this.series.find((s) => s.key === y);
    return {
      data: series.map((s) => ({
        [x]: s.data[x],
        [y]: s[1] === 0 ? null : s[1],
        y0: s[0],
      })),
      x,
    };
  }

  generateDotYByNum(dataStack, stackNames, dotIndex) {
    let sum = 0;
    for (let i = 0; i <= dotIndex; i++) {
      sum += dataStack[stackNames[i]];
    }
    return sum;
  }

  getDotsProps() {
    const { x, scale, data, Children } = this.asProps;
    const [xScale, yScale] = scale;
    const oY = [];
    const colors = [Children.props.color];
    Children.props.children.map((dot) => (dot.props.color ? colors.push(dot.props.color) : ''));
    Children.props.children.map((y) => (y.props.y ? oY.push(y.props.y) : ''));
    const countDots = Object.keys(data[0]).length - 1;

    const dotD3 = Array(countDots)
      .fill({})
      .map((element, index) => {
        return area()
          .defined(definedData(x, oY[0]))
          .x((p) => {
            return scaleOfBandwidth(xScale, p[x]);
          })
          .y1((p) => {
            return scaleOfBandwidth(yScale, this.generateDotYByNum(p, oY, index));
          });
      });

    return {
      x,
      d3: dotD3,
      colors: colors,
    };
  }

  getNullProps() {
    const { x, color, data, Children, scale } = this.asProps;
    const oY = [];
    const [xScale, yScale] = scale;
    Children.props.children.map((y) => (y.props.y ? oY.push(y.props.y) : ''));
    const countDots = Object.keys(data[0]).length - 1;

    const d3 = Array(countDots)
      .fill({})
      .map((element, index) => {
        return line()
          .defined(definedData(x, oY[index]))
          .x((p) => scaleOfBandwidth(xScale, p[x]))
          .y((p) => scaleOfBandwidth(yScale, this.generateDotYByNum(p, oY, index)));
      });

    const nullData = d3.map((d3, index) => getNullData(data, d3.defined(), oY[index]));

    return {
      d3Line: d3,
      data: nullData,
      fill: color,
    };
  }

  render() {
    const Element = this.Element;
    this.series = this.getSeries();
    return <Element render="g" series={this.series} />;
  }
}

function Dots(props) {
  const { Element: SDot, styles, data, d3, colors, x, y, eventEmitter, display, hide } = props;
  const bisect = bisector((d) => d[x]).center;
  const [activeIndex, setActiveIndex] = useState(props.activeIndex || null);

  useEffect(() => {
    const unsubscribeNearestXY = eventEmitter.subscribe('onNearestXY', (point) => {
      if (point[0] === undefined) {
        setActiveIndex(null);
      } else {
        setActiveIndex(bisect(data, point[0]));
      }
    });

    return () => {
      unsubscribeNearestXY();
    };
  }, [eventEmitter, data, x, y]);

  return data.reduce((acc, d, i) => {
    const isPrev = d3[0].defined()(data[i - 1] || {});
    const isNext = d3[0].defined()(data[i + 1] || {});
    const active = i === activeIndex;
    if (!d3[0].defined()(d)) return acc;
    if (display || i === activeIndex || (!isPrev && !isNext)) {
      d3.forEach((elem, index) =>
        acc.push(
          styled(styles)(
            <SDot
              key={i + index}
              __excludeProps={['data', 'scale', 'value', 'display']}
              value={d}
              index={i}
              fill={colors[index]}
              render="circle"
              cx={elem.x()(d)}
              cy={elem.y1()(d)}
              active={active}
              hide={hide}
            />,
          ),
        ),
      );
    }
    return acc;
  }, []);
}

function Null(props) {
  const { Element: SNull, styles, d3Line, data, hide } = props;
  return d3Line.map((elem, index) => styled(styles)(
    <SNull key={index} render="path" d={d3Line[index](data[index])} hide={hide} />,
  ));
}

const StackedArea = createXYElement(StackedAreaRoot, {
  Area,
  Dots,
  Null,
});

export default StackedArea;
