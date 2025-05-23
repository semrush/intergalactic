import React from 'react';
import { transition } from 'd3-transition';
import { Component, Root, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import { getBubbleChartValueScale, measureText } from './utils';
import Tooltip from './Tooltip';
import { PatternFill } from './Pattern';

import style from './style/bubble.shadow.css';

class BubbleRoot extends Component {
  static displayName = 'Bubble';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    markedCross: true,
  };

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
    const { duration, uid, data, value } = this.asProps;
    const z = getBubbleChartValueScale(data, value);

    const selectRect = transition().selection().selectAll(`[id^=${uid}${uid}]`).attr('r', 0);

    const selectRectNode = selectRect.node();
    if (selectRectNode) {
      selectRect
        .transition()
        .duration(duration)
        .attr('r', function (_, ind) {
          return z(data[ind]?.[value]);
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { data, x, y, value } = this.asProps;
    const { x: prevX, y: prevY, value: prevValue } = prevProps;
    const prevData = prevProps.$rootProps.data;

    if (data !== prevData || x !== prevX || y !== prevY || value !== prevValue) {
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
      offset,
      styles,
      uid,
      duration,
      value,
      label,
      markedCross,
      size,
      data,
      transparent,
      resolveColor,
      patterns,
    } = this.asProps;
    const [xScale, yScale] = scale;

    const SBubble = this.Element;
    const SCenter = 'text';
    const SLabel = 'text';
    const z = getBubbleChartValueScale(data, value);

    const margin = Math.min(xScale.range()[0], xScale.range()[1]);

    const labelPosition =
      size[0] - 2 * margin - (xScale(d[x]) + offset[0] + z(d[value])) < measureText(d[label])
        ? 'right'
        : 'left';
    const labelDistance = {
      right: xScale(d[x]) + offset[0] - z(d[value]),
      left: xScale(d[x]) + offset[0] + z(d[value]),
    }[labelPosition];

    return sstyled(styles)(
      <g
        key={`circle(#${i})`}
        onMouseMove={this.bindHandlerTooltip(true, this.props, { xIndex: i, index: i, patterns })}
        onMouseLeave={this.bindHandlerTooltip(false, this.props, { xIndex: i, index: i, patterns })}
      >
        {markedCross && (
          <SCenter
            aria-hidden
            x={xScale(d[x]) + offset[0]}
            y={yScale(d[y]) + offset[1]}
            dy='.3em'
            clipPath={`url(#${uid})`}
            color={resolveColor(d[color] ?? color)}
            transparent={transparent}
          >
            &#43;
          </SCenter>
        )}
        <SBubble
          aria-hidden
          id={`${uid}${uid}`}
          index={i}
          render='circle'
          clipPath={`url(#${uid})`}
          cx={xScale(d[x]) + offset[0]}
          cy={yScale(d[y]) + offset[1]}
          color={resolveColor(d[color])}
          pattern={patterns ? `url(#${uid}-${i}-pattern)` : undefined}
          r={z(d[value])}
          use:duration={`${duration}ms`}
          transparent={transparent}
        />
        {patterns && (
          <PatternFill
            id={`${uid}-${i}-pattern`}
            patternKey={d[color]}
            color={resolveColor(d[color])}
            patterns={patterns}
          />
        )}
        {d[label] && (
          <SLabel
            aria-hidden
            x={labelDistance}
            y={yScale(d[y]) + offset[1]}
            dy='.3em'
            clipPath={`url(#${uid})`}
            position={labelPosition}
            color={resolveColor(d[color])}
            transparent={transparent}
          >
            {d[label]}
          </SLabel>
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
        <clipPath aria-hidden id={uid}>
          <rect x={xMargin} y={yMargin} width={`${xSize}px`} height={`${ySize}px`} />{' '}
        </clipPath>
      </>
    );
  }
}

const BubbleTooltip = (props) => {
  const SBubbleTooltip = Root;
  return sstyled(props.styles)(<SBubbleTooltip render={Tooltip} excludeAnchorProps />);
};

const Bubble = createElement(BubbleRoot, {
  Tooltip: [BubbleTooltip, Tooltip._______childrenComponents],
});

export default Bubble;
