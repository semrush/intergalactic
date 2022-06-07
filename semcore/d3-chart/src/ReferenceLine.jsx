import React from 'react';
import { Component, sstyled } from '@semcore/core';
import createElement from './createElement';
import { scaleOfBandwidth } from './utils';

import style from './style/reference-line.shadow.css';

const MAP_ORIENTATION = {
  left: 'vertical',
  right: 'vertical',
  top: 'horizontal',
  bottom: 'horizontal',
};

const MAP_POSITION_LINE = {
  vertical: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x: x,
      y: yRange[1],
      width: 0.1,
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
      height: 0.1,
    };
  },
};

const OFFSET_TITLE = 10;
const MAP_POSITION_TITlE = {
  left: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x: x - OFFSET_TITLE,
      y: (yRange[0] + yRange[1]) / 2,
    };
  },
  right: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x: x + OFFSET_TITLE,
      y: (yRange[0] + yRange[1]) / 2,
    };
  },
  top: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x: (xRange[1] + xRange[0]) / 2,
      y: y - OFFSET_TITLE,
    };
  },
  bottom: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x: (xRange[1] + xRange[0]) / 2,
      y: y + OFFSET_TITLE,
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
    const pos = MAP_POSITION_LINE[MAP_ORIENTATION[position]];

    return sstyled(styles)(
      <>
        <SReferenceLine
          render="rect"
          __excludeProps={['data', 'scale', 'format', 'value', 'color']}
          stroke={color}
          {...pos(scale, value)}
        />
        {title && <ReferenceLine.Title>{title}</ReferenceLine.Title>}
      </>,
    );
  }
}

function Title(props) {
  const { Element: STitle, styles, scale, position, value } = props;
  const { x, y } = MAP_POSITION_TITlE[position](scale, value);

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
  const pos = MAP_POSITION_LINE[MAP_ORIENTATION[position]];

  return sstyled(styles)(
    <SBackground render="rect" childrenPosition="inside" {...pos(scale, value)} />,
  );
}

const ReferenceLine = createElement(ReferenceLineRoot, {
  Title,
  Background,
});

export default ReferenceLine;
