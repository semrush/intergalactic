import React from 'react';
import { transition } from 'd3-transition';
import { Component, Root, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import { getScatterPlotRadius } from './utils';
import Tooltip from './Tooltip';
import { PatternFill } from './Pattern';

import style from './style/scatterplot.shadow.css';

class ScatterPlotRoot extends Component {
  static displayName = 'ScatterPlot';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  bindHandlerTooltip = (visible, props, tooltipProps) => ({ clientX, clientY }) => {
    const { eventEmitter } = this.asProps;

    eventEmitter.emit('setTooltipPosition', clientX, clientY);
    eventEmitter.emit('setTooltipRenderingProps', props, tooltipProps);
    eventEmitter.emit('setTooltipVisible', visible);
  };

  animationCircle() {
    const { duration, uid, r, value } = this.asProps;
    const radius = r ? r : getScatterPlotRadius(value);
    const selectRect = transition().selection().selectAll(`[id^=${uid}]`).attr('r', 0);
    const selectRectNode = selectRect.node();

    if (duration > 0 && selectRectNode) {
      selectRect.transition().duration(duration).attr('r', radius);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.animationCircle();
    }
  }

  componentDidMount() {
    this.animationCircle();
  }

  renderCircle(d, i) {
    const {
      color,
      scale,
      x,
      y,
      r,
      offset,
      styles,
      uid,
      duration,
      value,
      valueColor,
      transparent,
      resolveColor,
      patterns,
    } = this.asProps;
    const [xScale, yScale] = scale;
    const SScatterPlot = this.Element;
    const SValue = 'text';

    if (Number.isNaN(d[x]) || Number.isNaN(d[y])) {
      return null;
    }

    return sstyled(styles)(
      <g
        aria-hidden
        key={`circle(#${i})`}
        onMouseMove={this.bindHandlerTooltip(true, this.props, { xIndex: i, index: i, patterns })}
        onMouseLeave={this.bindHandlerTooltip(false, this.props, { xIndex: i, index: i, patterns })}
      >
        <SScatterPlot
          aria-hidden
          id={`${uid}${i}`}
          index={i}
          render='circle'
          clipPath={`url(#${uid})`}
          cx={xScale(d[x]) + offset[0]}
          cy={yScale(d[y]) + offset[1]}
          color={resolveColor(color)}
          pattern={patterns ? `url(#${uid}-${i}-pattern)` : undefined}
          r={r}
          use:duration={`${duration}ms`}
          transparent={transparent}
        />
        {patterns && (
          <PatternFill
            id={`${uid}-${i}-pattern`}
            patternKey={color}
            color={resolveColor(color)}
            patterns={patterns}
          />
        )}
        {d[value] !== undefined && (
          <SValue
            aria-hidden
            x={xScale(d[x]) + offset[0]}
            y={yScale(d[y]) + offset[1]}
            dy='.3em'
            clipPath={`url(#${uid})`}
            color={resolveColor(valueColor)}
            transparent={transparent}
          >
            {d[value]}
          </SValue>
        )}
      </g>,
    );
  }

  render() {
    const { data, uid, scale, x, y, value } = this.asProps;
    const [xScale, yScale] = scale;
    const xSize = Math.abs(xScale.range()[0] - xScale.range()[1]);
    const ySize = Math.abs(yScale.range()[0] - yScale.range()[1]);
    const xMargin = Math.min(xScale.range()[0], xScale.range()[1]);
    const yMargin = Math.min(yScale.range()[0], yScale.range()[1]);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y, value);
    this.asProps.dataHintsHandler.establishDataType('points-cloud');

    return (
      <>
        {data.map(this.renderCircle.bind(this))}
        <clipPath id={uid}>
          <rect x={xMargin} y={yMargin} width={`${xSize}px`} height={`${ySize}px`} />
        </clipPath>
      </>
    );
  }
}

const ScatterPlotTooltip = (props) => {
  const SScatterPlotTooltip = Root;
  return sstyled(props.styles)(<SScatterPlotTooltip render={Tooltip} excludeAnchorProps />);
};

const ScatterPlot = createElement(ScatterPlotRoot, {
  Tooltip: [ScatterPlotTooltip, Tooltip._______childrenComponents],
});

export default ScatterPlot;
