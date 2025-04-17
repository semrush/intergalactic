import React from 'react';
import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import { scaleOfBandwidth } from './utils';

import style from './style/reference.shadow.css';

const side2direction = {
  left: 'vertical',
  right: 'vertical',
  top: 'horizontal',
  bottom: 'horizontal',
};

const lineDirection2props = {
  vertical: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x1: x,
      x2: x,
      y1: yRange[0],
      y2: yRange[1],
    };
  },
  horizontal: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x1: xRange[0],
      x2: xRange[1],
      y1: y,
      y2: y,
    };
  },
};

const rectDirection2props = {
  vertical: ([xScale, yScale], value, endValue) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    const width = endValue !== undefined ? scaleOfBandwidth(xScale, endValue) - x : 100;
    return {
      x: x,
      y: yRange[1],
      width,
      height: yRange[0] - yRange[1],
    };
  },
  horizontal: ([xScale, yScale], value, endValue) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    const height = endValue !== undefined ? scaleOfBandwidth(yScale, endValue) - y : 100;
    return {
      x: xRange[0],
      y: y,
      width: xRange[1] - xRange[0],
      height,
    };
  },
};

const titleOffset = 10;
const titleSideToProps = {
  left: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x: x - titleOffset,
      y: (yRange[0] + yRange[1]) / 2,
    };
  },
  right: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x: x + titleOffset,
      y: (yRange[0] + yRange[1]) / 2,
    };
  },
  top: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x: (xRange[1] + xRange[0]) / 2,
      y: y - titleOffset,
    };
  },
  bottom: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x: (xRange[1] + xRange[0]) / 2,
      y: y + titleOffset,
    };
  },
};

class ReferenceLineRoot extends Component {
  static displayName = 'ReferenceLine';
  static style = style;
  static defaultProps = {
    position: 'left',
  };

  getTitleProps() {
    const { position, value } = this.asProps;
    return { position, value };
  }

  getBackgroundProps() {
    const { position, value } = this.asProps;
    return { position, value };
  }

  render() {
    const SReferenceLine = this.Element;
    const { title, scale, position, value, color, resolveColor, styles } = this.asProps;
    const positionProps = lineDirection2props[side2direction[position]];

    return sstyled(styles)(
      <>
        <SReferenceLine
          render='line'
          __excludeProps={['data', 'scale', 'format', 'value', 'color']}
          stroke={resolveColor(color)}
          {...positionProps(scale, value)}
        />
        {title && <ReferenceLine.Title>{title}</ReferenceLine.Title>}
      </>,
    );
  }
}

function Title(props) {
  const { Element: STitle, styles, scale, position, value } = props;
  const { x, y } = titleSideToProps[position](scale, value);

  const sstyles = sstyled(styles);
  const sTitleStyles = sstyles.cn('STitle', {
    'transform-origin': `${x.toFixed(2)}px ${y.toFixed(2)}px`,
  });

  return sstyled(styles)(
    <STitle
      render='text'
      childrenPosition='inside'
      className={sTitleStyles.className}
      style={sTitleStyles.style}
      position={position}
      x={x}
      y={y}
    />,
  );
}
function Background(props) {
  const { Element: SBackground, styles, scale, position = 'left', value, endValue } = props;
  const positionProps = rectDirection2props[side2direction[position]];

  return sstyled(styles)(
    <SBackground
      render='rect'
      childrenPosition='inside'
      {...positionProps(scale, value, endValue)}
    />,
  );
}
Background.style = style;

const diagonalGap = 8;
const gap = Math.sqrt(diagonalGap ** 2 + diagonalGap ** 2);
const gap12 = gap * (1 / 2);
const gap32 = gap * (3 / 2);
const path = `M-${gap},-${gap12} L${gap},${gap32} M-${gap12},-${gap} L${gap32},${gap}`;
function Stripes(props) {
  const { Element: SStripes, styles, scale, position = 'left', value, endValue, uid } = props;
  const SStripesPatternPath = 'path';
  const positionProps = rectDirection2props[side2direction[position]];
  const patternId = `${uid}-pattern`;

  return sstyled(styles)(
    <g>
      <SStripes
        render='rect'
        childrenPosition='inside'
        fill={`url(#${patternId})`}
        {...positionProps(scale, value, endValue)}
      />
      <pattern id={patternId} patternUnits='userSpaceOnUse' width={gap} height={gap}>
        <SStripesPatternPath d={path} />
      </pattern>
    </g>,
  );
}
Stripes.style = style;
Stripes.enhance = [uniqueIDEnhancement()];

export const ReferenceLine = createElement(ReferenceLineRoot, {
  Title,
  Background,
  Stripes,
});

export const ReferenceBackground = createElement(Background);
export const ReferenceStripes = createElement(Stripes);
