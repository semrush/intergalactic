import { Component, Root, sstyled } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { interpolate } from 'd3-interpolate';
import { arc, pie } from 'd3-shape';
import { transition } from 'd3-transition';
import React from 'react';

import createElement from './createElement';
import { PatternFill } from './Pattern';
import style from './style/donut.shadow.css';
import Tooltip from './Tooltip';
import { getChartDefaultColorName } from './utils';

const DEFAULT_INSTANCE = Symbol('DEFAULT_INSTANCE');

function transitionAnglePie({
  selector,
  duration,
  halfsize,
  d3Arc,
  arcs,
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
        return d3Arc(self.arc);
      };
    });
}

const increaseFactor = 4;
const donutThickness = 16;

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
    innerRadius: innerRadiusProp,
    paddingAngle = 0,
    outerRadius,
    halfsize = false,
    $rootProps: { size },
  }) => {
    const radius = outerRadius || getOuterRadius({ size, halfsize });
    const innerRadius = innerRadiusProp ?? Math.max(radius - donutThickness, 0);

    const d3Arc = arc().outerRadius(radius).innerRadius(innerRadius).padAngle(paddingAngle);

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
      paddingAngle,
      innerRadius,
    };
  };

  state = {
    active: null,
  };

  get id() {
    const { uid, id } = this.asProps;
    return id || uid;
  }

  canAnimatedHover = false;

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
    const { eventEmitter, plotId } = this.asProps;

    eventEmitter.emit(`setTooltipPosition_${plotId}`, clientX, clientY);
    eventEmitter.emit(`setTooltipRenderingProps_${plotId}`, props, tooltipProps);
    eventEmitter.emit(`setTooltipVisible_${plotId}`, visible);
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
        }).on('end', () => {
          this.canAnimatedHover = true;
        });
      } else {
        this.canAnimatedHover = true;
      }
    }, 0);
  };

  handlerOnClick(key) {
    return (e) => {
      e.stopPropagation();

      const { onClick } = this.asProps;

      if (!onClick) return;

      onClick(key, e);
    };
  }

  getPieProps(props, index) {
    const { d3Arc, innerRadius, outerRadius, halfsize, resolveColor, patterns } =
      this.asProps;
    const { transparent } = props;
    const data = this.arcs.find((arc) => arc.data[0] === props.dataKey);

    const tooltipProps = {
      dataKey: props.dataKey,
      name: props.name,
      resolveColor,
      color: props.color || getChartDefaultColorName(index),
      transparent: props.transparent,
      patterns,
    };

    const pieId = `${this.id}-${index}`;

    return {
      data,
      d3Arc,
      innerRadius,
      outerRadius,
      uid: pieId,
      patterns,
      halfsize,
      color: props.color || getChartDefaultColorName(index),
      resolveColor,
      transparent: transparent ?? (this.state.active !== null && this.state.active !== pieId),
      onMouseMove: this.bindHandlerTooltip(true, props, tooltipProps),
      onMouseLeave: this.bindHandlerTooltip(false, props, tooltipProps),
      onMouseOver: (e) => {
        this.setState({ active: pieId });
      },
      onMouseOut: (e) => {
        this.setState({ active: null });
      },
      onClickPieRoot: this.handlerOnClick(props.dataKey),
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
  name,
  dataKey,
  dataHintsHandler,
  transparent,
  resolveColor,
  uid,
  patterns,
  onClick,
  onClickPieRoot,
}) {
  const pieRef = React.useRef(null);

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
          d={d3Arc(data)}
          transparent={transparent}
          use:onClick={callAllEventHandlers(onClickPieRoot, onClick)}
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

function DonutTooltip(props) {
  const SDonutTooltip = Root;
  return sstyled(props.styles)(<SDonutTooltip render={Tooltip} excludeAnchorProps />);
};

/**
 * Donut
 *
 * {@link https://developer.semrush.com/intergalactic/data-display/donut-chart/donut-chart-api/|API} | {@link https://developer.semrush.com/intergalactic/data-display/donut-chart/donut-chart-code/|Examples}
 */
const Donut = createElement(DonutRoot, {
  Pie,
  Label,
  EmptyData,
  Tooltip: [DonutTooltip, Tooltip._______childrenComponents],
});

export default Donut;
