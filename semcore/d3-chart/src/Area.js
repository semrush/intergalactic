import React, { useEffect, useState } from 'react';
import { area, curveBasis, line } from 'd3-shape';
import { bisector } from 'd3-array';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import { definedData, scaleOfBandwidth } from './utils';

import style from './style/area.shadow.css';

function getNullData(data, defined, name) {
  return data.reduce((acc, d, i, data) => {
    if (defined(d)) {
      acc.push({
        [name]: null,
      });
    } else {
      const prev = data[i - 1];
      const next = data[i + 1];

      if (i === 0) {
        const defNext = data.find(defined);
        acc.push({
          ...d,
          [name]: defNext ? defNext[name] : null,
        });
      }

      // prev
      if (prev && defined(prev)) {
        acc.push(prev);
      }

      // next
      if (next && defined(next)) {
        acc.push(next);
      }

      if (data.length - 1 === i) {
        const defPrev = data
          .slice()
          .reverse()
          .find(defined);
        acc.push({
          ...d,
          [name]: defPrev ? defPrev[name] : null,
        });
      }
    }
    return acc;
  }, []);
}

class AreaRoot extends Component {
  static displayName = 'Area';
  static style = style;

  static defaultProps = ({ x, y, $rootProps }) => {
    const [xScale, yScale] = $rootProps.scale;
    const yRange = yScale.range();
    return {
      d3: area()
        .defined(definedData(x, y))
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y1((p) => scaleOfBandwidth(yScale, p[y]))
        .y0(yRange[0]),
      d3Line: line()
        .defined(definedData(x, y))
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, p[y])),
      color: '#50aef4',
      fill: '#50aef450',
      curve: false,
    };
  };

  getDotsProps() {
    const { x, y, d3, color } = this.asProps;
    return {
      x,
      y,
      d3,
      fill: color,
    };
  }

  getNullProps() {
    const { y, color, data, d3Line } = this.asProps;
    return {
      d3Line,
      data: getNullData(data, d3Line.defined(), y),
      fill: color,
    };
  }

  render() {
    const SArea = this.Element;
    const { styles, hide, d3, d3Line, data, fill, curve, color } = this.asProps;
    return styled(styles)(
      <>
        <SArea
          render="path"
          hide={hide}
          curve={curve}
          fill={fill}
          d={curve ? d3.curve(curveBasis)(data) : d3(data)}
        />
        <path color={color} d={d3Line(data)} />
      </>,
    );
  }
}

function Dots(props) {
  const { Element: SDot, styles, data, d3, x, y, eventEmitter, display, hide } = props;
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
    const isPrev = d3.defined()(data[i - 1] || {});
    const isNext = d3.defined()(data[i + 1] || {});
    const active = i === activeIndex;
    if (!d3.defined()(d)) return acc;
    if (display || i === activeIndex || (!isPrev && !isNext)) {
      acc.push(
        styled(styles)(
          <SDot
            key={i}
            __excludeProps={['data', 'scale', 'value', 'display']}
            value={d}
            index={i}
            render="circle"
            cx={d3.x()(d)}
            cy={d3.y1()(d)}
            active={active}
            hide={hide}
          />,
        ),
      );
    }
    return acc;
  }, []);
}

function Null(props) {
  const { Element: SNull, styles, d3Line, data, hide } = props;
  return styled(styles)(<SNull render="path" d={d3Line(data)} hide={hide} />);
}

export default createXYElement(AreaRoot, {
  Dots,
  Null,
});
