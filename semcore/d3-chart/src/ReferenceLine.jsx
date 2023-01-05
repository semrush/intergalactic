import React from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import { scaleOfBandwidth } from './utils';

import style from './style/reference-line.shadow.css';

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
  vertical: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x: x,
      y: yRange[1],
      width: 100,
      height: yRange[0] - yRange[1],
    };
  },
  horizontal: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x: xRange[0],
      y: y,
      width: xRange[1] - xRange[0],
      height: 100,
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
    const { title, scale, position, value, color, styles } = this.asProps;
    const positionProps = lineDirection2props[side2direction[position]];

    return sstyled(styles)(
      <>
        <SReferenceLine
          render="line"
          __excludeProps={['data', 'scale', 'format', 'value', 'color']}
          stroke={color}
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
      render="text"
      childrenPosition="inside"
      className={sTitleStyles.className}
      style={sTitleStyles.style}
      position={position}
      x={x}
      y={y}
    />,
  );
}

function Background(props) {
  const { Element: SBackground, styles, scale, position, value } = props;
  const positionProps = rectDirection2props[side2direction[position]];

  return sstyled(styles)(
    <SBackground render="rect" childrenPosition="inside" {...positionProps(scale, value)} />,
  );
}

const ReferenceLine = createElement(ReferenceLineRoot, {
  Title,
  Background,
});

export default ReferenceLine;
