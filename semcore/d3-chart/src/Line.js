import React, { useEffect, useState } from 'react';
import { line as d3Line } from 'd3-shape';
import { bisector } from 'd3-array';
import { Component, sstyled } from '@semcore/core';
import createXYElement from './XYElement';
import { definedData, scaleOfBandwidth } from './utils';

import style from './style/line.shadow.css';

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

class LineRoot extends Component {
  static displayName = 'Line';
  static defaultProps = ({ x, y, $rootProps }) => {
    const [xScale, yScale] = $rootProps.scale;
    return {
      d3: d3Line()
        .defined(definedData(x, y))
        .x((p) => scaleOfBandwidth(xScale, p[x]))
        .y((p) => scaleOfBandwidth(yScale, p[y])),
      color: '#50aef4',
    };
  };

  static style = style;

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
    const { y, d3, color, data } = this.asProps;
    return {
      d3,
      // TODO: vertical
      data: getNullData(data, d3.defined(), y),
      fill: color,
    };
  }

  render() {
    const SLine = this.Element;
    const { styles, hide, color, d3, data } = this.asProps;

    return sstyled(styles)(<SLine render="path" hide={hide} stroke={color} d={d3(data)} />);
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
        sstyled(styles)(
          <SDot
            key={i}
            __excludeProps={['data', 'scale', 'value', 'display']}
            value={d}
            index={i}
            render="circle"
            cx={d3.x()(d)}
            cy={d3.y()(d)}
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
  const { Element: SNull, styles, d3, data, hide } = props;
  return sstyled(styles)(<SNull render="path" d={d3(data)} hide={hide} />);
}

export default createXYElement(LineRoot, {
  Dots,
  Null,
});
