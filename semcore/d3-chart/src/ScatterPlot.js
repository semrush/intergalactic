import React from 'react';
import { Component, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { CONSTANT } from './utils';
import createElement from './createElement';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { transition } from 'd3-transition';
import style from './style/scatterplot.shadow.css';
import ClipPath from './ClipPath';

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

  bindHandlerTooltip = (visible, props) => ({ clientX: x, clientY: y }) => {
    const { eventEmitter } = this.asProps;
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(x, y);
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;
    eventEmitter.emit('onTooltipVisible', visible, props, this.virtualElement);
  };

  animationCircle() {
    const { duration, uid, r, value } = this.asProps;
    const radius = r ? r : value ? 12 : 5.5;
    const selectRect = transition().selection().selectAll(`[id^=${uid}]`).attr('r', 0);
    const selectRectNode = selectRect.node();

    if (duration > 0 && selectRectNode) {
      selectRect.transition().duration(duration).attr('r', radius);
    }
  }

  componentDidUpdate() {
    this.animationCircle();
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
    } = this.asProps;
    const [xScale, yScale] = scale;
    const SScatterPlot = this.Element;
    const SValue = 'text';
    return sstyled(styles)(
      <g
        key={`circle(#${i})`}
        onMouseMove={this.bindHandlerTooltip(true, { ...this.props, xIndex: i })}
        onMouseLeave={this.bindHandlerTooltip(false, { ...this.props, xIndex: i })}
      >
        <SScatterPlot
          id={`${uid}${i}`}
          render="circle"
          clipPath={`url(#${uid})`}
          cx={xScale(d[x]) + offset[0]}
          cy={yScale(d[y]) + offset[1]}
          color={color}
          r={r}
          use:duration={`${duration}ms`}
        />
        {d[value] && (
          <SValue
            x={xScale(d[x]) + offset[0]}
            y={yScale(d[y]) + offset[1]}
            dy=".3em"
            clipPath={`url(#${uid})`}
            color={valueColor}
          >
            {d[value]}
          </SValue>
        )}
      </g>,
    );
  }

  render() {
    const { data, uid, size, scale } = this.asProps;
    const [xScale, yScale] = scale;
    const marginX = Math.min(xScale.range()[0], xScale.range()[1]);
    const marginY = Math.min(yScale.range()[0], yScale.range()[1]);

    return (
      <>
        {data.map(this.renderCircle.bind(this))}
        <ClipPath
          id={uid}
          x={marginX}
          y={marginY}
          width={`${size[0] - 2 * marginX}px`}
          height={`${size[1] - 2 * marginY}px`}
        />
      </>
    );
  }
}

const ScatterPlot = createElement(ScatterPlotRoot);

export default ScatterPlot;
