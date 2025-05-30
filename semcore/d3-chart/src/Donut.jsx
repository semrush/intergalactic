import React from 'react';
import { arc, pie } from 'd3-shape';
import { interpolate } from 'd3-interpolate';
import { transition } from 'd3-transition';
import { Component, Root, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import { getChartDefaultColorName } from './utils';
import Tooltip from './Tooltip';
import { PatternFill } from './Pattern';

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

function transitionRadiusPie({
  data,
  selector,
  element,
  duration,
  innerRadius,
  outerRadiusStartEnd,
  paddingAngle,
}) {
  return transition()
    .selection()
    .select(selector)
    .interrupt()
    .transition()
    .duration(duration)
    .attrTween('d', function () {
      const [start, end] = outerRadiusStartEnd;
      const iOuterRadius = interpolate(start, end);
      return function (t) {
        const outerRadiusPX = iOuterRadius(t);
        element.dataset['currentRadius'] = outerRadiusPX;
        const d3ArcOut = arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadiusPX)
          .padAngle(paddingAngle);
        return d3ArcOut(data);
      };
    });
}

const increaseFactor = 8;

function getOuterRadius({ size, halfsize }) {
  const [width, height] = size;
  const minORmax = halfsize ? Math.max : Math.min;
  return minORmax(width - increaseFactor * 2, height - increaseFactor * 2) / 2;
}

class DonutRoot extends Component {
  static displayName = 'Donut';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = ({
    innerRadius = 0,
    paddingAngle = 0,
    outerRadius,
    halfsize = false,
    $rootProps: { size },
  }) => {
    const d3Arc = arc()
      .outerRadius(outerRadius || getOuterRadius({ size, halfsize, outerRadius }))
      .innerRadius(innerRadius)
      .padAngle(paddingAngle);

    const d3ArcOut = arc()
      .outerRadius((outerRadius || getOuterRadius({ size, halfsize })) + increaseFactor)
      .innerRadius(innerRadius)
      .padAngle(paddingAngle);

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
      paddingAngle,
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
        .filter(([key, value]) => keys.includes(key) && value > 0)
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

  bindHandlerTooltip = (visible, props, tooltipProps) => ({ clientX, clientY }) => {
    const { eventEmitter } = this.asProps;

    eventEmitter.emit('setTooltipPosition', clientX, clientY);
    eventEmitter.emit('setTooltipRenderingProps', props, tooltipProps);
    eventEmitter.emit('setTooltipVisible', visible);
  };

  animationActivePie = ({ data, active, selector, element }) => {
    const { duration, innerRadius, d3Arc, paddingAngle } = this.asProps;
    const outerRadius = d3Arc.outerRadius()();
    const outerRadiusStartEnd = active
      ? [+element.dataset['currentRadius'] || outerRadius, outerRadius + increaseFactor]
      : [+element.dataset['currentRadius'] || outerRadius, outerRadius];
    if (this.canAnimatedHover && duration > 0) {
      transitionRadiusPie({
        data,
        selector: `#${this.id} ${selector}`,
        element,
        duration: duration === 0 ? 0 : 300,
        innerRadius,
        outerRadiusStartEnd,
        paddingAngle,
      });
    }
  };

  animationTimeout = null;
  animationUpdatePie = () => {
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
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
    }, 0);
  };

  getPieProps(props, index) {
    const { d3Arc, d3ArcOut, innerRadius, outerRadius, halfsize, resolveColor, uid, patterns } =
      this.asProps;
    const { active } = props;
    const data = this.arcs.find((arc) => arc.data[0] === props.dataKey);
    if (active) {
      this.activeIndexPie = index;
    }
    const tooltipProps = {
      dataKey: props.dataKey,
      name: props.name,
      resolveColor,
      color: props.color || getChartDefaultColorName(index),
      active: props.active,
      transparent: props.transparent,
      patterns,
    };

    return {
      data,
      d3Arc,
      d3ArcOut,
      innerRadius,
      outerRadius,
      uid: `${uid}-${index}`,
      patterns,
      halfsize,
      color: props.color || getChartDefaultColorName(index),
      resolveColor,
      $animationActivePie: this.animationActivePie,
      onMouseMove: this.bindHandlerTooltip(true, props, tooltipProps),
      onMouseLeave: this.bindHandlerTooltip(false, props, tooltipProps),
      onMouseOver: (e) => {
        if (!active) {
          this.animationActivePie({
            active: true,
            data,
            selector: `[d="${e.target.getAttribute('d')}"]`,
            element: e.target,
          });
        }
      },
      onMouseOut: (e) => {
        if (!active) {
          this.animationActivePie({
            active: false,
            data,
            selector: `[d="${e.target.getAttribute('d')}"]`,
            element: e.target,
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
        render='g'
        childrenPosition='inside'
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
  innerRadius,
  outerRadius,
  resolveColor,
  halfsize,
  uid,
  patterns,
  ...other
}) {
  const [isMount, setIsMount] = React.useState(false);
  const pieRef = React.useRef(null);

  React.useEffect(() => {
    if (!pieRef.current) return;
    pieRef.current.dataset['currentRadius'] = (active ? d3ArcOut : d3Arc).outerRadius()();

    // do not run animation on first render
    if (!isMount) {
      setIsMount(true);
      return;
    }
    if (active !== undefined && active !== null) {
      $animationActivePie({
        active,
        data,
        selector: `[name="${other.name}"]`,
        element: pieRef.current,
      });
    }
  }, [active, Boolean(data)]);
  React.useEffect(() => {
    if (!pieRef.current) return;
    pieRef.current.dataset['currentRadius'] = (active ? d3ArcOut : d3Arc).outerRadius()();
  }, [active, innerRadius, outerRadius, halfsize, Boolean(data)]);

  if (!data) return null;

  dataHintsHandler.establishDataType('values-set');
  dataHintsHandler.describeValueEntity(dataKey, name);

  return (
    <React.Fragment>
      {sstyled(styles)(
        <SPie
          render='path'
          ref={pieRef}
          color={resolveColor(color)}
          pattern={patterns ? `url(#${uid}-pattern)` : undefined}
          d={active ? d3ArcOut(data) : d3Arc(data)}
          transparent={transparent}
        />,
      )}
      {patterns && (
        <PatternFill
          id={`${uid}-pattern`}
          patternKey={color}
          color={resolveColor(color)}
          patterns={patterns}
        />
      )}
    </React.Fragment>
  );
}

function EmptyData({ Element: SEmptyData, styles, d3Arc, color, resolveColor }) {
  return sstyled(styles)(
    <SEmptyData
      render='path'
      color={resolveColor(color)}
      d={d3Arc({ endAngle: Math.PI * 2, startAngle: 0 })}
    />,
  );
}

function Label({
  Element: SLabel,
  styles,
  Children,
  children,
  label,
  dataHintsHandler,
  x = 0,
  y = 0,
}) {
  dataHintsHandler.setTitle('vertical', label || children);

  return sstyled(styles)(
    <SLabel render='text' x={x} y={y} aria-hidden>
      <Children />
    </SLabel>,
  );
}

const DonutTooltip = (props) => {
  const SDonutTooltip = Root;
  return sstyled(props.styles)(<SDonutTooltip render={Tooltip} excludeAnchorProps />);
};

const Donut = createElement(DonutRoot, {
  Pie,
  Label,
  EmptyData,
  Tooltip: [DonutTooltip, Tooltip._______childrenComponents],
});

export default Donut;
