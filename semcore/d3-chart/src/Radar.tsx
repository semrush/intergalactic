import React from 'react';
import { transition } from 'd3-transition';
import { Component, sstyled, ReturnEl } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { lineRadial, curveLinearClosed } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import createElement from './createElement';

import style from './style/radar.shadow.css';

function getPosition(i, range, func, total) {
  const radians = 2 * Math.PI;
  return range * (1 - 1 * func((total - i) * radians / total));
}

function getHorizontalPosition(i, range, total) {
  return getPosition(i, range, Math.sin, total);
}

function getVerticalPosition(i, range, total) {
  return getPosition(i, range, Math.cos, total);
}

class RadarRoot extends Component {
  static displayName = 'Line';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  Element!: React.FC<{ children?: React.ReactNode; render: string }>;

  get id() {
    const { uid, id } = this.asProps;
    return id || uid;
  }

  getAxisProps() {
    return {
      d3Axis: this.d3Axis,
    };
  }

  getAxisTicksProps() {
    const { data, scale } = this.asProps;
    const ticks = scale[0].ticks(5).slice(1).slice(0, -1);
    return {
      data,
      ticks,
      d3AxisTicks: this.d3AxisTicks,
    };
  }

  getPolygonProps({ dataKey }) {
    const { data, scale } = this.asProps;

    return {
      data: data[dataKey],
      scale: scale[0]
    };
  }

  createRadial(value, angle) {
    const { scale } = this.asProps;
    const scaleAxis = scale[0];
    return lineRadial()
      .curve(curveLinearClosed)
      .radius((d, i) => {
        return scaleAxis(value) / 2;
      })
      .angle((d, i) => {
        return ((i / angle) * 2 * Math.PI);
      });
  }

  render() {
    const SRadar = this.Element;
    const { style, size, data, scale } = this.asProps;
    const [width, height] = size;
    const { categories } = data;
    const scaleAxis = scale[0];
    this.d3Axis = lineRadial()
      .curve(curveLinearClosed)
      .radius((d, i) => {
        return scaleAxis(scaleAxis.domain()[1]) / 2;
      })
      .angle((d, i) => {
        return ((i / categories.length) * 2 * Math.PI);
      });
    this.d3AxisTicks = lineRadial()
      .curve(curveLinearClosed)
      .radius((d, i, categories) => {
        return scaleAxis(categories.tick) / 2;
      })
      .angle((d, i) => {
        return ((i / categories.length) * 2 * Math.PI);
      });

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

  static defaultProps = ({ scale, data, dataKey }) => {
    return {
      d3: lineRadial()
        .curve(curveLinearClosed)
        .radius((d, i, categories) => {
          return scale(data[i] || 0) / 2;
        })
        .angle((d, i, data) => {
          return ((i / data.length) * 2 * Math.PI);
        }),
    };
  };

  getDotProps() {
    const { data, scale, color } = this.asProps;

    return {
      data,
      scale,
      color,
      // categories,
    };
  }

  getLineProps() {
    const { d3, data, color } = this.asProps;
    return {
      data,
      color,
      d3,
    };
  }

  render() {
    const { Element: SPolygon, styles, d3, data, color } = this.asProps;
    return sstyled(styles)(
      <SPolygon render='path' d={d3(data)} color={color} />,
    );
  }
}

function PolygonLine(props) {
  const { Element: SPolygonLine, styles, d3, color, data, size, scale, categories } = props;
  return sstyled(styles)(
    <SPolygonLine render='path' d={d3(data)} color={color} />,
  );
}

function PolygonDot(props) {
  const { Element: SPolygonDot, styles, d3Axis, color, data, size, scale, categories } = props;
  return data.map((value, i) => {
    if (value === null || value === undefined) return;
    const radius = scale(value) / 2;
    const cx = getHorizontalPosition(i, radius, data.length) - radius;
    const cy = getVerticalPosition(i, radius, data.length) - radius;
    return sstyled(styles)(
      <SPolygonDot
        key={i}
        render='circle'
        cx={cx}
        cy={cy}
        color={color}
      />,
    );
  });
}

function Axis(props) {
  const { Element: SAxis, styles, d3Axis, d3AxisLine, data, size, scale } = props;
  const SAxisLine = 'line';
  const { categories } = data;
  const scaleAxis = scale[0];
  const radius = scaleAxis(scaleAxis.domain()[1]) / 2;
  // const rScale = scaleLinear()
  //   .domain([-0, 10])
  //   .range([0, size[0] / 2]);

  return sstyled(styles)(
    <>
      <SAxis render='path' d={d3Axis(categories)} />
      {categories.map((category, i) => {
        const x = getHorizontalPosition(i, radius, categories.length) - radius;
        const y = getVerticalPosition(i, radius, categories.length) - radius;
        return sstyled(styles)(
          <React.Fragment key={i}>
            <SAxisLine key={i} x1={0} y1={0} x2={x} y2={y} />,
            <text x={x} y={y}>{category}</text>
          </React.Fragment>,
        );
      })}
    </>,
  );
}

function AxisTicks(props) {
  const { Element: SAxisTick, styles, d3AxisTicks, ticks, data } = props;
  const { categories } = data;
  return sstyled(styles)(
    <g className='Ticks'>
      {ticks.map((tick, i) => {
        categories.tick = tick;
        return sstyled(styles)(
          <SAxisTick render='path' key={i} d={d3AxisTicks(categories)} />,
        );
      })}
    </g>,
  );
}

function AxisLabel() {
  return null;
}

const Polygon = createElement(PolygonRoot, {
  Line: PolygonLine,
  Dot: PolygonDot,
});

const Radar = createElement(RadarRoot, {
  Axis: [Axis, {
    Ticks: AxisTicks,
    Label: AxisLabel,
  }],
  Polygon,
});

export default Radar;