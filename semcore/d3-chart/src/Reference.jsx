import { Component, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import React from 'react';

import { SvgElement } from './component/SvgElement';
import createElement from './createElement';
import style from './style/reference.shadow.css';
import { scaleOfBandwidth } from './utils';

const STROKE_WIDTH = 1;
const NOTCH_WIDTH = 9;
const NOTCH_DELTA = NOTCH_WIDTH / 2 - STROKE_WIDTH / 4;

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
      notchFirst: {
        x1: x - NOTCH_DELTA,
        x2: x + NOTCH_DELTA,
        y1: yRange[0],
        y2: yRange[0],
      },
      notchLast: {
        x1: x - NOTCH_DELTA,
        x2: x + NOTCH_DELTA,
        y1: yRange[1],
        y2: yRange[1],
      },
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
      notchFirst: {
        x1: xRange[0],
        x2: xRange[0],
        y1: y - NOTCH_DELTA,
        y2: y + NOTCH_DELTA,
      },
      notchLast: {
        x1: xRange[1],
        x2: xRange[1],
        y1: y - NOTCH_DELTA,
        y2: y + NOTCH_DELTA,
      },
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
    const SArea = SvgElement;
    const { title, scale, position, value, color, resolveColor, styles, uid, area } = this.asProps;
    const positionProps = lineDirection2props[side2direction[position]];
    const { notchFirst, notchLast, ...line } = positionProps(scale, value);
    const patternId = `${uid}-pattern`;

    return sstyled(styles)(
      <>
        <g>
          <defs>
            <linearGradient id={patternId} x1='0%' y1='0%' x2='0%' y2='100%'>
              {getColorByUse('neutral')}
            </linearGradient>
          </defs>

          <SArea
            tag='path'
            d={getReferenceAreaPath({ x: line.x1 - area / 2, y: line.y2, width: area, height: line.y1 - line.y2 })}
            // childrenPosition='inside'
            fill={`url(#${patternId})`}
          />
        </g>
        <SReferenceLine
          render='g'
          __excludeProps={['data', 'scale', 'format', 'value', 'color']}
          stroke={resolveColor(color)}
        >
          <line {...notchFirst} />
          <line {...line} />
          {!area && (<line {...notchLast} />)}
        </SReferenceLine>
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

function getColorByUse(use) {
  switch (use) {
    case 'bad': {
      return (
        <>
          <stop offset='0%' stopColor='var(--red-300)' stopOpacity='0.8' />
          <stop offset='12.68%' stopColor='#FF8786' stopOpacity='0.9' />
          <stop offset='87.98%' stopColor='#FF8786' stopOpacity='0.1' />
        </>
      );
    }
    case 'good': {
      return (
        <>
          <stop offset='0%' stopColor='var(--green-200)' stopOpacity='0.5' />
          <stop offset='12.68%' stopColor='rgba(89, 221, 170, 0.9)' stopOpacity='0.3' />
          <stop offset='87.98%' stopColor='rgba(89, 221, 170, 0.1)' stopOpacity='0.1' />
        </>
      );
    }
    case 'insight': {
      return (
        <>
          <stop offset='0%' stopColor='var(--violet-300)' stopOpacity='0.8' />
          <stop offset='12.68%' stopColor='var(--violet-300)' stopOpacity='0.9' />
          <stop offset='87.98%' stopColor='rgba(198, 149, 255, 0.01)' stopOpacity='0.1' />
        </>
      );
    }
    default: {
      return (
        <>
          <stop offset='0%' stopColor='var(--gray-50)' stopOpacity='0.8' />
          <stop offset='41.83%' stopColor='var(--gray-50)' stopOpacity='0.5' />
          <stop offset='87.98%' stopColor='rgba(255, 255, 255, 0.00)' stopOpacity='0.2' />
        </>
      );
    }
  }
}

function getReferenceAreaPath({ x, y, width, height }) {
  const r = 12;

  const path = `M ${x},${y + r} Q ${x},${y} ${x + r},${y} H ${x + width - r} Q ${x + width},${y} ${x + width},${y + r} V ${y + height} H ${x} Z`;

  return path;
}

function Stripes(props) {
  const { Element: SStripes, styles, scale, position = 'left', value, endValue, uid, use = 'neutral', title, subTitle } = props;
  const positionProps = rectDirection2props[side2direction[position]](scale, value, endValue);
  const patternId = `${uid}-pattern`;
  const STitle = SvgElement;
  const SSubTitle = SvgElement;

  const textX = positionProps.x + 4;
  const textY = positionProps.y + 4;

  return sstyled(styles)(
    <g>
      <defs>
        <linearGradient id={patternId} x1='0%' y1='0%' x2='0%' y2='100%'>
          {getColorByUse(use)}
        </linearGradient>
      </defs>

      <SStripes
        render='path'
        d={getReferenceAreaPath(positionProps)}
        childrenPosition='inside'
        fill={`url(#${patternId})`}
      />

      {title && (
        <STitle
          tag='text'
          childrenPosition='inside'
          position='top'
          x={textX}
          y={textY}
        >
          {title}
        </STitle>
      )}

      {subTitle && (
        <SSubTitle
          tag='text'
          childrenPosition='inside'
          position='top'
          x={textX}
          y={textY + 26}
        >
          {subTitle}
        </SSubTitle>
      )}
    </g>,
  );
}
Stripes.style = style;
Stripes.enhance = [uniqueIDEnhancement()];

export const ReferenceLine = createElement(ReferenceLineRoot, {
  Title,
  Background: Stripes,
  Stripes,
});

export const ReferenceBackground = createElement(Stripes);
export const ReferenceStripes = createElement(Stripes);
