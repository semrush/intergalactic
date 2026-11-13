import { Component, sstyled, Root } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import React from 'react';

import { HoveredTick } from './component/Hover/HoveredTick';
import { HoverLine as InnerHoverLine } from './component/Hover/HoverLine';
import createElement from './createElement';
import style from './style/hover.shadow.css';
import Tooltip from './Tooltip';
import { getIndexFromData, eventToPoint, invert, scaleToBand, formatValue } from './utils';

class Hover extends Component {
  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  handlerMouseMoveRoot = trottle((e, currentTarget, isTickUnder) => {
    const { eventEmitter, data, scale, x, y, rootRef, patterns, plotId } = this.asProps;
    const { clientX, clientY } = e;
    const [xScale, yScale] = scale;
    const [pX, pY] = eventToPoint(e, rootRef.current);
    const vX = invert(xScale, pX);
    const vY = invert(yScale, pY);
    const xIndex = x === undefined || vX === undefined ? null : getIndexFromData(data, xScale, x, vX);
    const yIndex = y === undefined || vY === undefined ? null : getIndexFromData(data, yScale, y, vY);
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
    this.unsubscribeMouseLeaveRoot = eventEmitter.subscribe('onMouseLeaveChart', this.handlerMouseLeaveRoot);
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
    const { hideHoverLine, meta, locale } = this.asProps;
    const { xIndex, yIndex } = this.state;

    const isHide = typeof hideHoverLine === 'function' ? hideHoverLine(xIndex, yIndex) : hideHoverLine;

    if (isHide) {
      return null;
    }

    const { x, y, data, scale, dataHints, hideTickHover } = this.asProps;

    return (
      <InnerHoverLine
        data={data}
        x={x}
        y={y}
        dataHints={dataHints}
        hideTickHover={hideTickHover}
        meta={meta}
        scale={scale}
        xIndex={xIndex}
        yIndex={yIndex}
        formatValue={formatValue.bind(null, locale)}
      />
    );
  }
}

class HoverRectRoot extends Hover {
  static displayName = 'HoverRect';

  render() {
    const { hideHoverLine, meta } = this.asProps;

    if (hideHoverLine) {
      return null;
    }

    const SHoverRect = this.Element;
    const { styles, x, y, data, scale, dataHints, hideTickHover, locale } = this.asProps;
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
                size={meta.getTicksSize('horizontal')}
                position={meta.getTicksPosition('horizontal')}
                tickFormatter={dataHints.titles.getHorizontalAxesTitle ?? formatValue.bind(null, locale)}
                value={data[xIndex]?.[x]}
                x={xScale(data[xIndex][x]) + (xStep * (1 - xPaddingInner)) / 2}
                yRange={yRange}
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

function HoverLineTooltip(props) {
  const SHoverLineTooltip = Root;
  return sstyled(props.styles)(<SHoverLineTooltip render={Tooltip} tag={HoverLine} excludeAnchorProps />);
}
function HoverRectTooltip(props) {
  const SHoverRectTooltip = Root;
  return sstyled(props.styles)(<SHoverRectTooltip render={Tooltip} tag={HoverRect} excludeAnchorProps />);
}

const HoverLine = createElement(HoverLineRoot, {
  Tooltip: [HoverLineTooltip, Tooltip._______childrenComponents],
});
const HoverRect = createElement(HoverRectRoot, {
  Tooltip: [HoverRectTooltip, Tooltip._______childrenComponents],
});

export { HoverLine, HoverRect };
