import { Component, Root, sstyled } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import findComponent from '@semcore/core/lib/utils/findComponent';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { transition } from 'd3-transition';
import React from 'react';

import { SvgElement } from './component/SvgElement';
import createElement from './createElement';
import { PatternFill } from './Pattern';
import style from './style/bubble.shadow.css';
import Tooltip from './Tooltip';
import { getBubbleChartValueScale, measureText } from './utils';

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
    const { eventEmitter, plotId } = this.asProps;

    eventEmitter.emit(`setTooltipPosition_${plotId}`, clientX, clientY);
    eventEmitter.emit(`setTooltipRenderingProps_${plotId}`, props, tooltipProps);
    eventEmitter.emit(`setTooltipVisible_${plotId}`, visible);
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

  handlerOnClick(index) {
    return (e) => {
      e.stopPropagation();

      const { onClick } = this.asProps;

      onClick?.(index, e);
    };
  }

  getCircleProps() {
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
      onClick,
    } = this.asProps;

    return {
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
      bindHandlerTooltip: this.bindHandlerTooltip,
      clickable: Boolean(onClick),
      onClickCircleRoot: this.handlerOnClick.bind(this),
    };
  }

  render() {
    const { data, uid, scale, x, y, value, Children } = this.asProps;
    const [xScale, yScale] = scale;
    const xSize = Math.abs(xScale.range()[0] - xScale.range()[1]);
    const ySize = Math.abs(yScale.range()[0] - yScale.range()[1]);
    const xMargin = Math.min(xScale.range()[0], xScale.range()[1]);
    const yMargin = Math.min(yScale.range()[0], yScale.range()[1]);

    this.asProps.dataHintsHandler.specifyDataRowFields(x, y, value);
    this.asProps.dataHintsHandler.establishDataType('points-cloud');

    const isAdvancedMode = Boolean(findComponent(Children, [Bubble.Circle.displayName]));

    return (
      <>
        {isAdvancedMode
          ? (
              <Children />
            )
          : (
              data.map((_, idx) => <Bubble.Circle key={idx} index={idx} />)
            )}
        <clipPath aria-hidden id={uid}>
          <rect x={xMargin} y={yMargin} width={`${xSize}px`} height={`${ySize}px`} />
          {' '}
        </clipPath>
      </>
    );
  }
}

function BubbleTooltip(props) {
  const SBubbleTooltip = Root;
  return sstyled(props.styles)(<SBubbleTooltip render={Tooltip} excludeAnchorProps />);
}

function BubbleCircle(props) {
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
    index,
    bindHandlerTooltip,
    Element,
    visible = true,
    clickable,
    onClick,
    onClickCircleRoot,
  } = props;
  const circleData = data[index];

  if (!circleData) return null;

  const [xScale, yScale] = scale;

  const SBubble = Element;
  const SCenter = 'text';
  const SLabel = 'text';
  const z = getBubbleChartValueScale(data, value);

  const margin = Math.min(xScale.range()[0], xScale.range()[1]);

  const labelPosition =
    size[0] - 2 * margin - (xScale(circleData[x]) + offset[0] + z(circleData[value])) <
      measureText(circleData[label])
      ? 'right'
      : 'left';
  const labelDistance = {
    right: xScale(circleData[x]) + offset[0] - z(circleData[value]),
    left: xScale(circleData[x]) + offset[0] + z(circleData[value]),
  }[labelPosition];

  return sstyled(styles)(
    <SvgElement
      tag='g'
      key={`circle(#${index})`}
      onClickCapture={callAllEventHandlers(onClickCircleRoot(index), onClick)}
      onMouseMove={bindHandlerTooltip(true, props, { xIndex: index, index, patterns })}
      onMouseLeave={bindHandlerTooltip(false, props, { xIndex: index, index, patterns })}
      visible={`${visible}`}
    >
      {markedCross && (
        <SCenter
          aria-hidden
          x={xScale(circleData[x]) + offset[0]}
          y={yScale(circleData[y]) + offset[1]}
          dy='.3em'
          clipPath={`url(#${uid})`}
          color={resolveColor(circleData[color] ?? color)}
          transparent={transparent}
        >
          &#43;
        </SCenter>
      )}
      <SBubble
        aria-hidden
        id={`${uid}${uid}`}
        index={index}
        render='circle'
        clipPath={`url(#${uid})`}
        cx={xScale(circleData[x]) + offset[0]}
        cy={yScale(circleData[y]) + offset[1]}
        color={resolveColor(circleData[color])}
        pattern={patterns ? `url(#${uid}-${index}-pattern)` : undefined}
        r={z(circleData[value])}
        use:duration={`${duration}ms`}
        transparent={transparent}
        clickable={clickable || Boolean(onClick)}
      />
      {patterns && (
        <PatternFill
          id={`${uid}-${index}-pattern`}
          patternKey={circleData[color]}
          color={resolveColor(circleData[color])}
          patterns={patterns}
        />
      )}
      {circleData[label] && (
        <SLabel
          aria-hidden
          x={labelDistance}
          y={yScale(circleData[y]) + offset[1]}
          dy='.3em'
          clipPath={`url(#${uid})`}
          position={labelPosition}
          color={resolveColor(circleData[color])}
          transparent={transparent}
        >
          {circleData[label]}
        </SLabel>
      )}
    </SvgElement>,
  );
}

const Bubble = createElement(BubbleRoot, {
  Tooltip: [BubbleTooltip, Tooltip._______childrenComponents],
  Circle: BubbleCircle,
});

export default Bubble;
