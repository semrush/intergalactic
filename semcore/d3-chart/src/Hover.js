import React from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import trottle from '@semcore/utils/lib/rafTrottle';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { scaleOfBandwidth, getIndexFromData, eventToPoint, invert, CONSTANT } from './utils';

import style from './style/hover.shadow.css';

class Hover extends Component {
  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }

  handlerMouseMoveRoot = trottle((e) => {
    const { eventEmitter, data, scale, x, y, rootRef } = this.asProps;
    const { clientX, clientY } = e;
    const [xScale, yScale] = scale;
    const [pX, pY] = eventToPoint(e, rootRef.current);
    const vX = invert(xScale, pX);
    const vY = invert(yScale, pY);
    const xIndex =
      x === undefined || vX === undefined ? null : getIndexFromData(data, xScale, x, vX);
    const yIndex =
      y === undefined || vY === undefined ? null : getIndexFromData(data, yScale, y, vY);
    const state = { xIndex, yIndex };
    this.virtualElement.getBoundingClientRect = this.generateGetBoundingClientRect(
      clientX,
      clientY,
    );
    this.virtualElement[CONSTANT.VIRTUAL_ELEMENT] = true;

    this.setState(state, () => {
      eventEmitter.emit(
        'onTooltipVisible',
        xIndex !== null || yIndex !== null,
        state,
        this.virtualElement,
      );
    });
  });

  handlerMouseLeaveRoot = trottle(() => {
    const state = {
      xIndex: null,
      yIndex: null,
    };
    this.setState(state, () => {
      this.asProps.eventEmitter.emit('onTooltipVisible', false, state);
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
    const { styles, x, y, data, scale } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();
    const x1 = xIndex !== null ? scaleOfBandwidth(xScale, data[xIndex][x]) : undefined;
    const y1 = yIndex !== null ? scaleOfBandwidth(yScale, data[yIndex][y]) : undefined;

    return sstyled(styles)(
      <>
        {xIndex !== null ? (
          <SHoverLine render="line" index={xIndex} x1={x1} y1={yRange[0]} x2={x1} y2={yRange[1]} />
        ) : null}
        {yIndex !== null ? (
          <SHoverLine render="line" index={yIndex} x1={xRange[0]} y1={y1} x2={xRange[1]} y2={y1} />
        ) : null}
      </>,
    );
  }
}

class HoverRectRoot extends Hover {
  static displayName = 'HoverRect';

  render() {
    const SHoverRect = this.Element;
    const { styles, x, y, data, scale } = this.asProps;
    const { xIndex, yIndex } = this.state;
    const [xScale, yScale] = scale;

    const xRange = xScale.range();
    const yRange = yScale.range();

    return sstyled(styles)(
      <>
        {xIndex !== null ? (
          <SHoverRect
            render="rect"
            index={xIndex}
            width={xScale.step() - xScale.paddingInner() / 2}
            height={yRange[0] - yRange[1]}
            x={xScale(data[xIndex][x]) - (xScale.step() * xScale.paddingInner()) / 2}
            y={yRange[1]}
          />
        ) : null}
        {yIndex !== null ? (
          <SHoverRect
            render="rect"
            index={yIndex}
            width={xRange[1] - xRange[0]}
            height={yScale.step() - yScale.paddingInner() / 2}
            x={xRange[0]}
            y={yScale(data[yIndex][y]) - (yScale.step() * yScale.paddingInner()) / 2}
          />
        ) : null}
      </>,
    );
  }
}

const HoverLine = createElement(HoverLineRoot);
const HoverRect = createElement(HoverRectRoot);

export { HoverLine, HoverRect };
