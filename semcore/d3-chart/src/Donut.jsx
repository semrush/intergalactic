import React, { useEffect, useState } from 'react';
import { arc, pie } from 'd3-shape';
import { interpolate } from 'd3-interpolate';
import { transition } from 'd3-transition';
import { Component, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import createElement from './createElement';
import { CONSTANT } from './utils';
import Tooltip from './Tooltip';

import style from './style/donut.shadow.css';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');

function transitionAnglePie({
  selector,
  duration,
  halfsize,
  d3Arc,
  d3ArcOut,
  arcs,
  activeIndexPie,
}) {
  return transition()
    .selection()
    .selectAll(selector)
    .interrupt()
    .transition()
    .duration(duration)
    .attrTween('d', function (_, ind) {
      if (!arcs[ind]) return () => '';
      const d = Object.assign({}, arcs[ind]);
      const self = this;
      const initAngle = halfsize ? -Math.PI / 2 : 0;
      let prevStartAngle = initAngle;
      let prevEndAngle = initAngle;
      if (self.arc) {
        prevStartAngle = self.arc.startAngle;
        prevEndAngle = self.arc.endAngle;
      }
      const iStartAngle = interpolate(prevStartAngle, d.startAngle);
      const iEndAngle = interpolate(prevEndAngle, d.endAngle);
      return function (t) {
        d.startAngle = iStartAngle(t);
        d.endAngle = iEndAngle(t);
        self.arc = d;
        return ind === activeIndexPie ? d3ArcOut(self.arc) : d3Arc(self.arc);
      };
    });
}

function transitionRadiusPie({ data, selector, duration, innerRadius, outerRadiusMinMax }) {
  return transition()
    .selection()
    .select(selector)
    .interrupt()
    .transition()
    .duration(duration)
    .attrTween('d', function () {
      const [min, max] = outerRadiusMinMax;
      const iOuterRadius = interpolate(min, max);
      return function (t) {
        const d3ArcOut = arc().innerRadius(innerRadius).outerRadius(iOuterRadius(t));
        return d3ArcOut(data);
      };
    });
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
      .innerRadius(innerRadius);

    const d3ArcOut = arc()
      .outerRadius(getOuterRadius({ size, halfsize, outerRadius }) + increaseFactor)
      .innerRadius(innerRadius);

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
      d3ArcOut,
      duration: 500,
    };
  };

  get id() {
    const { uid, id } = this.asProps;
    return id || uid;
  }

  virtualElement = canUseDOM() ? document.createElement('div') : {};
  activeIndexPie = undefined;
  canAnimatedHover = false;

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  getArcs() {
    const { Children, data, d3Pie } = this.asProps;
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

  animationActivePie = ({ data, active, selector }) => {
    const { duration, innerRadius, outerRadius: _outerRadius, size, halfsize } = this.asProps;
    const outerRadius = getOuterRadius({ size, halfsize, outerRadius: _outerRadius });

    if (this.canAnimatedHover) {
      if (duration > 0) {
        transitionRadiusPie({
          data,
          selector: `#${this.id} ${selector}`,
          duration: duration === 0 ? 0 : 300,
          innerRadius,
          outerRadiusMinMax: active
            ? [outerRadius, outerRadius + increaseFactor]
            : [outerRadius + increaseFactor, outerRadius],
        });
      }
    }
  };

  animationUpdatePie = () => {
    const { duration, d3Arc, halfsize, d3ArcOut } = this.asProps;
    this.canAnimatedHover = false;
    if (duration > 0) {
      transitionAnglePie({
        selector: `#${this.id} [data-ui-name="Donut.Pie"]`,
        duration,
        arcs: this.arcs,
        halfsize,
        d3Arc,
        d3ArcOut,
        activeIndexPie: this.activeIndexPie,
      }).on('end', () => {
        this.canAnimatedHover = true;
      });
    } else {
      this.canAnimatedHover = true;
    }
  };

  getPieProps(props, ind) {
    const { d3Arc, d3ArcOut } = this.asProps;
    const { active } = props;
    const data = this.arcs.find((arc) => arc.data[0] === props.dataKey);
    if (active) {
      this.activeIndexPie = ind;
    }

    return {
      data,
      d3Arc,
      d3ArcOut,
      $animationActivePie: this.animationActivePie,
      onMouseMove: this.bindHandlerTooltip(true, props),
      onMouseLeave: this.bindHandlerTooltip(false, props),
      onMouseOver: (e) => {
        if (!active) {
          this.animationActivePie({
            active: true,
            data,
            selector: `[d="${e.target.getAttribute('d')}"]`,
          });
        }
      },
      onMouseOut: (e) => {
        if (!active) {
          this.animationActivePie({
            active: false,
            data,
            selector: `[d="${e.target.getAttribute('d')}"]`,
          });
        }
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
    const { data } = this.asProps;
    if (prevProps.$rootProps.data !== data) {
      this.animationUpdatePie();
    }
  }

  componentDidMount() {
    this.animationUpdatePie();
  }

  render() {
    const { halfsize, size } = this.asProps;
    this.asProps.dataHintsHandler.establishDataType('values-set');
    const [width, height] = size;
    const Element = this.Element;
    const k = halfsize ? 1 : 2;
    this.arcs = this.getArcs();
    return (
      <Element
        aria-hidden
        id={this.id}
        render="g"
        childrenPosition="inside"
        transform={`translate(${width / 2},${height / k})`}
      />
    );
  }
}

function Pie({
  Element: SPie,
  styles,
  d3Arc,
  data,
  color,
  $animationActivePie,
  active,
  d3ArcOut,
  name,
  dataKey,
  dataHintsHandler,
  transparent,
  ...other
}) {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    // do not run animation on first render
    if (!isMount) {
      setIsMount(true);
      return;
    }
    if (active !== undefined && active !== null) {
      $animationActivePie({ active, data, selector: `[name="${other.name}"]` });
    }
  }, [active]);

  dataHintsHandler.establishDataType('values-set');
  dataHintsHandler.describeValueEntity(dataKey, name);

  return sstyled(styles)(
    <SPie
      render="path"
      color={color}
      d={active ? d3ArcOut(data) : d3Arc(data)}
      transparent={transparent}
    />,
  );
}

function EmptyData({ Element: SEmptyData, styles, d3Arc, color }) {
  return sstyled(styles)(
    <SEmptyData render="path" color={color} d={d3Arc({ endAngle: Math.PI * 2, startAngle: 0 })} />,
  );
}

function Label({ Element: SLabel, styles, Children, children, label, dataHintsHandler }) {
  dataHintsHandler.setTitle('vertical', label || children);

  return sstyled(styles)(
    <SLabel render="text" x="0" y="0" aria-hidden>
      <Children />
    </SLabel>,
  );
}

const Donut = createElement(DonutRoot, { Pie, Label, EmptyData, Tooltip });

export default Donut;
