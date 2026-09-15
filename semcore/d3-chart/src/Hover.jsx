import { Component, sstyled, Root } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import React from 'react';

import createElement from './createElement';
import style from './style/hover.shadow.css';
import Tooltip from './Tooltip';
import { scaleOfBandwidth, getIndexFromData, eventToPoint, invert, scaleToBand } from './utils';
import { TextMeasurer } from './utils/TextMeasurer';

const STROKE_WIDTH = 1;
const NOTCH_WIDTH = 9;
const NOTCH_DELTA = NOTCH_WIDTH / 2 - STROKE_WIDTH / 4;

function formatValue(value) {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}
class Hover extends Component {
  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  measurer = new TextMeasurer();

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  handlerMouseMoveRoot = trottle((e, currentTarget, isTickUnder) => {
    const { eventEmitter, data, scale, x, y, rootRef, patterns, plotId } = this.asProps;
    const { clientX, clientY } = e;
    const [xScale, yScale] = scale;
    const [pX, pY] = eventToPoint(e, rootRef.current);
    const vX = invert(xScale, pX);
    const vY = invert(yScale, pY);
    const xIndex =
      x === undefined || vX === undefined ? null : getIndexFromData(data, xScale, x, vX);
    const yIndex =
      y === undefined || vY === undefined ? null : getIndexFromData(data, yScale, y, vY);
    const state = { xIndex, yIndex, patterns };

    const { x: xRect, y: yRect, height } = rootRef.current.getBoundingClientRect();
    const { y: yOriginal, height: heightOriginal } = currentTarget.getBoundingClientRect();
    const isRootTooltip = hasParent(e.target, rootRef.current);

    this.setState(state, () => {
      let x, y;

      if (isRootTooltip) {
        x = clientX;
        // preserve static vertical position if it's a move on a tick.
        y = isTickUnder ? yRect + height / 2 : clientY;
      } else {
        const diff = clientY - yOriginal;
        const dimension = (diff / heightOriginal) * 100;
        const heightValue = (height / 100) * dimension;

        x = pX + xRect;
        // preserve static vertical position if it's a move on tick.
        y = isTickUnder ? yRect + height / 2 : yRect + heightValue;
      }

      eventEmitter.emit(`setTooltipPosition_${plotId}`, x, y);
      eventEmitter.emit(`setTooltipRenderingProps_${plotId}`, {}, state);
      eventEmitter.emit(`setTooltipVisible_${plotId}`, xIndex !== null || yIndex !== null);
    });
  });

  handlerMouseLeaveRoot = trottle(() => {
    const state = {
      xIndex: null,
      yIndex: null,
      patterns: this.asProps.patterns,
    };
    this.setState(state, () => {
      this.asProps.eventEmitter.emit(`setTooltipVisible_${this.asProps.plotId}`, false);
    });
  });

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    this.unsubscribeMouseMoveRoot = eventEmitter.subscribe('onMouseMoveChart', (e, _, isTickUnder) => {
      e.persist();
      this.handlerMouseMoveRoot(e, e.currentTarget, isTickUnder);
    });
    this.unsubscribeMouseLeaveRoot = eventEmitter.subscribe(
      'onMouseLeaveChart',
      this.handlerMouseLeaveRoot,
    );
  }

  componentWillUnmount() {
    if (this.unsubscribeMouseMoveRoot) {
      this.unsubscribeMouseMoveRoot();
    }
    if (this.unsubscribeMouseLeaveRoot) {
      this.unsubscribeMouseLeaveRoot();
    }
  }
}

class HoverLineRoot extends Hover {
  static displayName = 'HoverLine';

  render() {
    const { hideHoverLine } = this.asProps;

    const isHide =
      typeof hideHoverLine === 'function' ? hideHoverLine(xIndex, yIndex) : hideHoverLine;

    if (isHide) {
      return null;
    }

    const SHoverLine = this.Element;
    const { styles, x, y, data, scale, dataHints, hideTickHover } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const x1 = xIndex !== null ? scaleOfBandwidth(xScale, data[xIndex][x]) : undefined;
    const y1 = yIndex !== null ? scaleOfBandwidth(yScale, data[yIndex][y]) : undefined;

    return sstyled(styles)(
      <>
        {xIndex !== null
          ? (
              <>
                <SHoverLine render='g' index={xIndex} stroke-width={STROKE_WIDTH} aria-hidden>
                  <line x1={x1 - NOTCH_DELTA} x2={x1 + NOTCH_DELTA} y1={yRange[0]} y2={yRange[0]} />
                  <line x1={x1} y1={yRange[0]} x2={x1} y2={yRange[1]} />
                  <line x1={x1 - NOTCH_DELTA} x2={x1 + NOTCH_DELTA} y1={yRange[1]} y2={yRange[1]} />
                </SHoverLine>
                {!hideTickHover && (
                  <HoveredTick
                    tickFormatter={dataHints.titles.getHorizontalAxesTitle ?? formatValue}
                    value={data[xIndex]?.[x]}
                    isFirstTick={xIndex === 0}
                    isLastTick={xIndex === data.length - 1}
                    textMeasurer={this.measurer}
                    styles={styles}
                    x={x1}
                    y={yRange[0]}
                  />
                )}
              </>
            )
          : null}
        {yIndex !== null
          ? (
              <SHoverLine render='g' index={yIndex} stroke-width={STROKE_WIDTH} aria-hidden>
                <line x1={xRange[0]} y1={y1 - NOTCH_DELTA} x2={xRange[0]} y2={y1 + NOTCH_DELTA} />
                <line x1={xRange[0]} y1={y1} x2={xRange[1]} y2={y1} />
                <line x1={xRange[1]} y1={y1 - NOTCH_DELTA} x2={xRange[1]} y2={y1 + NOTCH_DELTA} />
              </SHoverLine>
            )
          : null}
      </>,
    );
  }
}

class HoverRectRoot extends Hover {
  static displayName = 'HoverRect';

  render() {
    const { hideHoverLine } = this.asProps;

    if (hideHoverLine) {
      return null;
    }

    const SHoverRect = this.Element;
    const { styles, x, y, data, scale, dataHints, hideTickHover } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const xBand = scaleToBand(xScale);
    const yBand = scaleToBand(yScale);

    const xStep = xBand.step();
    const xPaddingInner = xBand.paddingInner();
    const yStep = yBand.step();
    const yPaddingInner = yBand.paddingInner();

    return sstyled(styles)(
      <>
        {xIndex !== null && (
          <>
            <SHoverRect
              aria-hidden
              render='rect'
              index={xIndex}
              width={xStep - xPaddingInner / 2}
              height={yRange[0] - yRange[1]}
              x={xScale(data[xIndex][x]) - (xStep * xPaddingInner) / 2}
              y={yRange[1]}
            />
            {!hideTickHover && (
              <HoveredTick
                tickFormatter={dataHints.titles.getHorizontalAxesTitle ?? formatValue}
                value={data[xIndex]?.[x]}
                textMeasurer={this.measurer}
                styles={styles}
                x={xScale(data[xIndex][x]) + (xStep * (1 - xPaddingInner)) / 2}
                y={yRange[0]}
              />
            )}
          </>
        )}
        {yIndex !== null && (
          <SHoverRect
            aria-hidden
            render='rect'
            index={yIndex}
            width={xRange[1] - xRange[0]}
            height={yStep - yPaddingInner / 2}
            x={xRange[0]}
            y={yScale(data[yIndex][y]) - (yStep * yPaddingInner) / 2}
          />
        )}
      </>,
    );
  }
}

const HOVERED_TICK_PADDING_X = 12;
const HOVERED_TICK_PADDING_Y = 4;
const HOVERED_TOCK_BORDER_RADIUS = 6;

function HoveredTick(props) {
  const {
    paddingX = HOVERED_TICK_PADDING_X,
    paddingY = HOVERED_TICK_PADDING_Y,
    borderRadius = HOVERED_TOCK_BORDER_RADIUS,
    tickFormatter,
    value,
    isFirstTick = false,
    isLastTick = false,
    textMeasurer,
    styles,
    x,
    y,
  } = props;
  const STickWrapper = 'g';
  const STickHover = 'rect';
  const STick = 'text';

  const formattedValue = tickFormatter(value);

  const { width: textWidth, height: textHeight } = formattedValue !== undefined
    ? textMeasurer.measure(formattedValue)
    : { width: 0, height: 0 };

  const hoverX = isFirstTick
    ? x - NOTCH_DELTA
    : isLastTick
      ? x - textWidth - paddingX * 2 + NOTCH_DELTA
      : x - paddingX - textWidth / 2;

  const tickX = isFirstTick
    ? x + paddingX + textWidth / 2 - NOTCH_DELTA
    : isLastTick
      ? x - textWidth / 2 - paddingX + NOTCH_DELTA
      : x;

  const hoverPos = {
    x: hoverX,
    y: y + textHeight / 2 - paddingY / 2,
    width: textWidth + paddingX * 2,
    height: textHeight + paddingY * 2,
  };

  const tickPos = {
    x: tickX,
    y: y,
  };

  return sstyled(styles)(
    <STickWrapper>
      <STickHover
        {...hoverPos}
        rx={borderRadius}
      />
      <STick
        {...tickPos}
      >
        {formattedValue}
      </STick>
    </STickWrapper>,
  );
}

function HoverLineTooltip(props) {
  const SHoverLineTooltip = Root;
  return sstyled(props.styles)(
    <SHoverLineTooltip render={Tooltip} tag={HoverLine} excludeAnchorProps />,
  );
}
function HoverRectTooltip(props) {
  const SHoverRectTooltip = Root;
  return sstyled(props.styles)(
    <SHoverRectTooltip render={Tooltip} tag={HoverRect} excludeAnchorProps />,
  );
}

const HoverLine = createElement(HoverLineRoot, {
  Tooltip: [HoverLineTooltip, Tooltip._______childrenComponents],
});
const HoverRect = createElement(HoverRectRoot, {
  Tooltip: [HoverRectTooltip, Tooltip._______childrenComponents],
});

export { HoverLine, HoverRect };
