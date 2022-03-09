import React from 'react';
import { arc, pie } from 'd3-shape';
import { Component, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import { CONSTANT } from './utils';
import createElement from './createElement';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { interpolate } from 'd3-interpolate';
import { transition } from 'd3-transition';

import style from './style/donut.shadow.css';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');

function animationInitialPie({ halfsize, d3Arc, arcs }) {
  return function (_, ind) {
    const d = arcs[ind];
    if (!d) return () => '';
    const iStart = interpolate(halfsize ? -Math.PI / 2 : 0, d.startAngle);
    const iEnd = interpolate(halfsize ? -Math.PI / 2 : 0, d.endAngle);
    return function (t) {
      d.startAngle = iStart(t);
      d.endAngle = iEnd(t);
      return d3Arc(d);
    };
  };
}

function animationUpdatePie({ halfsize, arcs, d3Arc }) {
  return function (_, ind) {
    const d = arcs[ind];
    if (this._current) {
      const i = interpolate(this._current, d);
      this._current = i(0);
      return function (t) {
        return d3Arc(i(t));
      };
    } else {
      this._current = d;
      return animationInitialPie({ halfsize, arcs, d3Arc })(_, ind);
    }
  };
}

function animationHoverPie({ d, selector, duration, innerRadius, outerRadius }) {
  if (duration > 0) {
    transition()
      .selection()
      .select(selector)
      .transition()
      .duration(duration)
      .attrTween('d', function () {
        if (!d) return () => '';
        const [min, max] = outerRadius;
        const i = interpolate(min, max);
        return function (t) {
          const d3ArcOut = arc().innerRadius(innerRadius).outerRadius(i(t));
          return d3ArcOut(d);
        };
      });
  }
}

const increaseFactor = 8;

function getOuterRadius({ size, halfsize, outerRadius }) {
  const [width, height] = size;
  const minORmax = halfsize ? Math.max : Math.min;
  return outerRadius || minORmax(width - increaseFactor * 2, height - increaseFactor * 2) / 2;
}

class DonutRoot extends Component {
  static displayName = 'Donut';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = ({
    innerRadius = 0,
    outerRadius,
    halfsize = false,
    $rootProps: { size },
  }) => {
    const d3Arc = arc()
      .outerRadius(getOuterRadius({ size, halfsize, outerRadius }))
      .innerRadius(innerRadius > increaseFactor ? innerRadius - increaseFactor : innerRadius);
    let d3Pie = pie()
      .sort(null)
      .value(([, value]) => value);
    d3Pie[DEFAULT_INSTANCE] = true;

    if (halfsize) {
      d3Pie = d3Pie.startAngle(-Math.PI / 2).endAngle(Math.PI / 2);
    }
    return {
      d3Pie,
      d3Arc,
      duration: 500,
    };
  };

  get id() {
    const { uid, id } = this.asProps;
    return id || uid;
  }

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  getArcs() {
    let { Children, data, d3Pie } = this.asProps;
    let pieData = Object.entries(data);

    if (d3Pie[DEFAULT_INSTANCE]) {
      const keys = React.Children.toArray(getOriginChildren(Children)).reduce((acc, child) => {
        if (React.isValidElement(child) && child.type === Donut.Pie) {
          acc.push(child.props.dataKey);
        }
        return acc;
      }, []);
      pieData = Object.entries(data)
        .filter(([key]) => keys.includes(key))
        .sort(([a], [b]) => (keys.indexOf(a) > keys.indexOf(b) ? 1 : -1));
    }
    const minValue =
      pieData.reduce((acc, cur) => {
        if (cur[1]) acc += cur[1];
        return acc;
      }, 0) / 100;
    pieData = pieData.map((d) => {
      if (d[1] && d[1] < minValue) d[1] = minValue;
      return d;
    });
    return d3Pie(pieData);
  }

  bindHandlerTooltip =
    (visible, props) =>
    ({ clientX: x, clientY: y }) => {
      const { eventEmitter } = this.asProps;
      this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(x, y);
      this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;
      eventEmitter.emit('onTooltipVisible', visible, props, this.virtualElement);
    };

  getPieProps(props) {
    let { d3Arc, duration, innerRadius } = this.asProps;
    innerRadius = innerRadius > increaseFactor ? innerRadius - increaseFactor : innerRadius;
    const outerRadius = getOuterRadius(this.asProps);
    const data = this.arcs.find((arc) => arc.data[0] === props.dataKey);

    return {
      data,
      d3Arc,
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
      onMouseOver: (e) => {
        animationHoverPie({
          d: data,
          selector: `#${this.id} [d="${e.target.getAttribute('d')}"]`,
          duration: duration === 0 ? 0 : 300,
          innerRadius,
          outerRadius: [outerRadius, outerRadius + increaseFactor],
        });
      },
      onMouseOut: (e) => {
        animationHoverPie({
          d: data,
          selector: `#${this.id} [d="${e.target.getAttribute('d')}"]`,
          duration: duration === 0 ? 0 : 300,
          innerRadius,
          outerRadius: [outerRadius + increaseFactor, outerRadius],
        });
      },
    };
  }

  getEmptyDataProps() {
    const { d3Arc } = this.asProps;
    return {
      d3Arc,
    };
  }

  componentDidUpdate(prevProps) {
    const { data, duration, d3Arc, halfsize } = this.asProps;
    const arcs = this.arcs;
    if (prevProps.$rootProps.data !== data && duration > 0) {
      transition()
        .selection()
        .selectAll(`#${this.id} [data-ui-name="Donut.Pie"]`)
        .transition()
        .duration(duration)
        .attrTween('d', animationUpdatePie({ d3Arc, arcs, halfsize }));
    }
  }

  componentDidMount() {
    const { duration, d3Arc, halfsize } = this.asProps;
    const arcs = this.arcs;
    if (duration > 0) {
      transition()
        .selection()
        .selectAll(`#${this.id} [data-ui-name="Donut.Pie"]`)
        .each(function (_, ind) {
          this._current = arcs[ind];
        })
        .transition()
        .duration(duration)
        .attrTween('d', animationInitialPie({ halfsize, d3Arc, arcs }));
    }
  }

  render() {
    const { halfsize, size } = this.asProps;
    const [width, height] = size;
    const Element = this.Element;
    const k = halfsize ? 1 : 2;
    this.arcs = this.getArcs();
    return (
      <Element
        id={this.id}
        render="g"
        childrenPosition="inside"
        transform={`translate(${width / 2},${height / k})`}
      />
    );
  }
}

function Pie({ Element: SPie, styles, d3Arc, data, color }) {
  return sstyled(styles)(<SPie render="path" color={color} d={d3Arc(data)} />);
}

function EmptyData({ Element: SEmptyData, styles, d3Arc, color }) {
  return sstyled(styles)(
    <SEmptyData render="path" color={color} d={d3Arc({ endAngle: Math.PI * 2, startAngle: 0 })} />,
  );
}

function Label({ Element: SLabel, styles, Children }) {
  return sstyled(styles)(
    <SLabel render="text" x="0" y="0">
      <Children />
    </SLabel>,
  );
}

const Donut = createElement(DonutRoot, { Pie, Label, EmptyData });

export default Donut;
