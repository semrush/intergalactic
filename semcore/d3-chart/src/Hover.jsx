import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import createElement from './createElement';
import { scaleOfBandwidth, getIndexFromData, eventToPoint, invert, scaleToBand } from './utils';

import style from './style/hover.shadow.css';
import Tooltip from './Tooltip';

class Hover extends Component {
  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  handlerMouseMoveRoot = trottle((e) => {
    const { eventEmitter, data, scale, x, y, rootRef, patterns } = this.asProps;
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

    this.setState(state, () => {
      eventEmitter.emit('setTooltipPosition', clientX, clientY);
      eventEmitter.emit('setTooltipRenderingProps', {}, state);
      eventEmitter.emit('setTooltipVisible', xIndex !== null || yIndex !== null);
    });
  });

  handlerMouseLeaveRoot = trottle(() => {
    const state = {
      xIndex: null,
      yIndex: null,
      patterns: this.asProps.patterns,
    };
    this.setState(state, () => {
      this.asProps.eventEmitter.emit('setTooltipVisible', false);
    });
  });

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    this.unsubscribeMouseMoveRoot = eventEmitter.subscribe('onMouseMoveChart', (e) => {
      e.persist();
      this.handlerMouseMoveRoot(e);
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
    const SHoverLine = this.Element;
    const { styles, x, y, data, scale, hideHoverLine } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const x1 = xIndex !== null ? scaleOfBandwidth(xScale, data[xIndex][x]) : undefined;
    const y1 = yIndex !== null ? scaleOfBandwidth(yScale, data[yIndex][y]) : undefined;

    const isHide =
      typeof hideHoverLine === 'function' ? hideHoverLine(xIndex, yIndex) : hideHoverLine;

    if (isHide) {
      return null;
    }

    return sstyled(styles)(
      <>
        {xIndex !== null ? (
          <SHoverLine
            aria-hidden
            render='line'
            index={xIndex}
            x1={x1}
            y1={yRange[0]}
            x2={x1}
            y2={yRange[1]}
          />
        ) : null}
        {yIndex !== null ? (
          <SHoverLine
            aria-hidden
            render='line'
            index={yIndex}
            x1={xRange[0]}
            y1={y1}
            x2={xRange[1]}
            y2={y1}
          />
        ) : null}
      </>,
    );
  }
}

class HoverRectRoot extends Hover {
  static displayName = 'HoverRect';

  render() {
    const SHoverRect = this.Element;
    const { styles, x, y, data, scale, hideHoverLine } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const xBand = scaleToBand(xScale);
    const yBand = scaleToBand(yScale);

    if (hideHoverLine) {
      return null;
    }

    return sstyled(styles)(
      <>
        {xIndex !== null ? (
          <SHoverRect
            aria-hidden
            render='rect'
            index={xIndex}
            width={xBand.step() - xBand.paddingInner() / 2}
            height={yRange[0] - yRange[1]}
            x={xScale(data[xIndex][x]) - (xBand.step() * xBand.paddingInner()) / 2}
            y={yRange[1]}
          />
        ) : null}
        {yIndex !== null ? (
          <SHoverRect
            aria-hidden
            render='rect'
            index={yIndex}
            width={xRange[1] - xRange[0]}
            height={yBand.step() - yBand.paddingInner() / 2}
            x={xRange[0]}
            y={yScale(data[yIndex][y]) - (yBand.step() * yBand.paddingInner()) / 2}
          />
        ) : null}
      </>,
    );
  }
}

const HoverLineTooltip = (props) => {
  const SHoverLineTooltip = Root;
  return sstyled(props.styles)(
    <SHoverLineTooltip render={Tooltip} tag={HoverLine} excludeAnchorProps />,
  );
};
const HoverRectTooltip = (props) => {
  const SHoverRectTooltip = Root;
  return sstyled(props.styles)(
    <SHoverRectTooltip render={Tooltip} tag={HoverRect} excludeAnchorProps />,
  );
};

const HoverLine = createElement(HoverLineRoot, {
  Tooltip: [HoverLineTooltip, Tooltip._______childrenComponents],
});
const HoverRect = createElement(HoverRectRoot, {
  Tooltip: [HoverRectTooltip, Tooltip._______childrenComponents],
});

export { HoverLine, HoverRect };
