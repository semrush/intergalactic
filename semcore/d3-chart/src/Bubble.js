import React from 'react';
import { Component, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { CONSTANT } from './utils';
import createElement from './createElement';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import { transition } from 'd3-transition';
import style from './style/bubble.shadow.css';
import ClipPath from './ClipPath';
import { scaleSqrt } from 'd3-scale';

function measureText(text) {
  let span = document.createElement('span');
  span.append(document.createTextNode(text));
  span.style.display = 'inline-block';
  document.body.append(span);
  const textLength = span.offsetWidth;
  span.remove();
  return textLength;
}

class BubbleRoot extends Component {
  static displayName = 'Bubble';
  static style = style;
  static enhance = [uniqueIDEnhancement()];

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    centered: true,
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
    const { duration, uid, data, value } = this.asProps;
    const z = scaleSqrt()
      .domain([0, Math.max(...data.map((el) => el[value]))])
      .range([5.5, 50.5]);

    const selectRect = transition()
      .selection()
      .selectAll(`[id^=${uid}${uid}]`)
      .attr('r', 0);

    const selectRectNode = selectRect.node();
    if (duration > 0 && selectRectNode) {
      selectRect
        .transition()
        .duration(duration)
        .attr('r', function(_, ind) {
          return z(data[ind][value]);
        });
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
      offset,
      styles,
      uid,
      duration,
      value,
      label,
      centered,
      size,
      data,
    } = this.asProps;
    const [xScale, yScale] = scale;

    const SBubble = this.Element;
    const SCenter = 'text';
    const SLabel = 'text';
    const props = { ...this.props };
    props.dataRow = d;
    const z = scaleSqrt()
      .domain([0, Math.max(...data.map((el) => el[value]))])
      .range([5.5, 50.5]);

    const margin = Math.min(xScale.range()[0], xScale.range()[1]);

    const labelDistance =
      size[0] - 2 * margin - (xScale(d[x]) + offset[0] + z(d[value])) < measureText(d[label])
        ? xScale(d[x]) + offset[0] - z(d[value]) - measureText(d[label])
        : xScale(d[x]) + offset[0] + z(d[value]);

    return sstyled(styles)(
      <g
        key={`circle(#${i})`}
        onMouseMove={this.bindHandlerTooltip(true, props)}
        onMouseLeave={this.bindHandlerTooltip(false, props)}
      >
        <SBubble
          id={`${uid}${uid}`}
          render="circle"
          clipPath={`url(#${uid})`}
          cx={xScale(d[x]) + offset[0]}
          cy={yScale(d[y]) + offset[1]}
          color={d[color] ?? color}
          r={z(d[value])}
          use:duration={`${duration}ms`}
        />
        {d[label] && (
          <SLabel
            x={labelDistance}
            y={yScale(d[y]) + offset[1]}
            dy=".3em"
            clipPath={`url(#${uid})`}
            color={d[color] ?? color}
          >
            {d[label]}
          </SLabel>
        )}
        {centered && (
          <SCenter
            x={xScale(d[x]) + offset[0]}
            y={yScale(d[y]) + offset[1]}
            dy=".3em"
            clipPath={`url(#${uid})`}
            color={d[color] ?? color}
          >
            &#43;
          </SCenter>
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
        {data.map(this.animationCircle.bind(this))}
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

const Bubble = createElement(BubbleRoot);

export default Bubble;
