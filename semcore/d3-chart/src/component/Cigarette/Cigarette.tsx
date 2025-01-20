import React from 'react';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from '../../createElement';
import { roundedPath } from '../../utils';
import { PatternFill } from '../../Pattern';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';

class CigaretteBarRoot extends Component<any> {
  static displayName = 'Cigarette.BarItem';
  static enhance = [uniqueIDEnhancement()];
  static style = {};

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    direction: 'horizontal',
    defaultHovered: false,
  };

  refElement = React.createRef<SVGPathElement>();

  uncontrolledProps() {
    return {
      hovered: false,
    };
  }

  handleMouseMove = () => {
    this.handlers.hovered(true);
    this.setCursor('pointer');
  };

  handleMouseLeave = () => {
    this.handlers.hovered(false);
    this.setCursor('auto');
  };

  handleClick = (e: React.SyntheticEvent) => {
    const { onClick, dataKey } = this.asProps;

    if (onClick && e.currentTarget.tagName === 'path') {
      e.stopPropagation();

      onClick(dataKey, e);

      return false;
    }
  };

  setCursor = (value: 'pointer' | 'auto') => {
    const { onClick } = this.asProps;

    if (onClick) {
      this.refElement.current?.style.setProperty('cursor', value);
    }
  };

  getRect() {
    const { x, y, width, height, r: radius, direction, index, hovered } = this.asProps;

    let xV = x;
    let yV = y;
    let widthV = width;
    let heightV = height;

    if (hovered && direction === 'horizontal') {
      yV = yV - 2;
      heightV = heightV + 4;
    }

    if (hovered && direction === 'vertical') {
      xV = xV - 2;
      widthV = widthV + 4;
    }

    if (radius) {
      if (direction === 'horizontal') {
        if (index === 0) {
          return roundedPath(xV, yV, widthV, heightV, radius, true, false, true, false);
        } else {
          return roundedPath(xV, yV, widthV, heightV, radius, false, true, false, true);
        }
      } else {
        if (index === 0) {
          return roundedPath(xV, yV, widthV, heightV, radius, true, true, false, false);
        } else {
          return roundedPath(xV, yV, widthV, heightV, radius, false, false, true, true);
        }
      }
    }

    return roundedPath(xV, yV, widthV, heightV, radius);
  }

  render() {
    // @ts-ignore
    const SBar = this.Element;
    const {
      styles,
      color,
      data,
      dataKey,
      index,
      hide,
      uid,
      duration,
      onMouseMove,
      onMouseLeave,
      transparent,
      resolveColor,
      patterns,
    } = this.asProps;

    const dSvg = this.getRect();

    return (
      <React.Fragment key={`horizontal-bar-${index}`}>
        {sstyled(styles)(
          <SBar
            ref={this.refElement}
            aria-hidden
            render='path'
            clipPath={`url(#${uid})`}
            __excludeProps={['data', 'scale', 'value', 'offset']}
            childrenPosition='above'
            value={data[dataKey]}
            index={index}
            hide={hide}
            fill={resolveColor(color)}
            pattern={patterns ? `url(#${uid}-${index}-pattern)` : undefined}
            transparent={transparent}
            d={dSvg}
            use:duration={`${duration}ms`}
            onMouseMove={callAllEventHandlers(onMouseMove, this.handleMouseMove)}
            onMouseLeave={callAllEventHandlers(onMouseLeave, this.handleMouseLeave)}
            use:onClick={this.handleClick}
          />,
        )}
        {patterns && (
          <PatternFill
            id={`${uid}-${index}-pattern`}
            patternKey={color}
            color={resolveColor(color)}
            patterns={patterns}
          />
        )}
      </React.Fragment>
    );
  }
}

export default createElement(CigaretteBarRoot);
