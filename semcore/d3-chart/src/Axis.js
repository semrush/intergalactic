import React from 'react';
import { Component, styled } from '@semcore/core';
import createXYElement from './XYElement';
import { scaleOfBandwidth } from './utils';

import style from './style/axis.shadow.css';

const CUSTOM_0 = Symbol('custom_0');
const CUSTOM_1 = Symbol('custom_1');

const MAP_INDEX_SCALE_SYMBOL = {
  0: CUSTOM_0,
  1: CUSTOM_1,
};

const MAP_POSITION_REVERT = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const MAP_POSITION_AXIS = {
  top: ([xScale, yScale]) => {
    const xRange = xScale.range();
    const yRange = yScale.range();
    return {
      x1: xRange[0],
      y1: yRange[1],
      x2: xRange[1],
      y2: yRange[1],
    };
  },
  bottom: ([xScale, yScale]) => {
    const xRange = xScale.range();
    const yRange = yScale.range();
    return {
      x1: xRange[0],
      y1: yRange[0],
      x2: xRange[1],
      y2: yRange[0],
    };
  },
  right: ([xScale, yScale]) => {
    const xRange = xScale.range();
    const yRange = yScale.range();
    return {
      x1: xRange[1],
      y1: yRange[0],
      x2: xRange[1],
      y2: yRange[1],
    };
  },
  left: ([xScale, yScale]) => {
    const xRange = xScale.range();
    const yRange = yScale.range();
    return {
      x1: xRange[0],
      y1: yRange[0],
      x2: xRange[0],
      y2: yRange[1],
    };
  },
  [CUSTOM_0]: ([xScale, yScale], pos) => {
    const xRange = xScale.range();
    return {
      x1: xRange[0],
      y1: scaleOfBandwidth(yScale, pos),
      x2: xRange[1],
      y2: scaleOfBandwidth(yScale, pos),
    };
  },
  [CUSTOM_1]: ([xScale, yScale], pos) => {
    const yRange = yScale.range();
    return {
      x1: scaleOfBandwidth(xScale, pos),
      y1: yRange[0],
      x2: scaleOfBandwidth(xScale, pos),
      y2: yRange[1],
    };
  },
};

const MAP_POSITION_TICK = {
  top: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    return {
      x: scaleOfBandwidth(xScale, value),
      y: yRange[1],
    };
  },
  bottom: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    return {
      x: scaleOfBandwidth(xScale, value),
      y: yRange[0],
    };
  },
  right: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    return {
      x: xRange[1],
      y: scaleOfBandwidth(yScale, value),
    };
  },
  left: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    return {
      x: xRange[0],
      y: scaleOfBandwidth(yScale, value),
    };
  },
  [CUSTOM_0]: ([xScale, yScale], value, pos) => {
    return {
      x: scaleOfBandwidth(xScale, value),
      y: scaleOfBandwidth(yScale, pos),
    };
  },
  [CUSTOM_1]: ([xScale, yScale], value, pos) => {
    return {
      x: scaleOfBandwidth(xScale, pos),
      y: scaleOfBandwidth(yScale, value),
    };
  },
};

const MAP_POSITION_GRID = {
  0: ([xScale, yScale], value) => {
    const yRange = yScale.range();
    const x = scaleOfBandwidth(xScale, value);
    return {
      x1: x,
      y1: yRange[0],
      x2: x,
      y2: yRange[1],
    };
  },
  1: ([xScale, yScale], value) => {
    const xRange = xScale.range();
    const y = scaleOfBandwidth(yScale, value);
    return {
      x1: xRange[0],
      y1: y,
      x2: xRange[1],
      y2: y,
    };
  },
};

const MAP_POSITION_TITlE = {
  top: ([xScale, yScale]) => {
    const xRange = xScale.range();
    const yRange = yScale.range();
    return {
      x: xRange[1] / 2,
      y: yRange[1],
    };
  },
  bottom: ([xScale, yScale]) => {
    const xRange = xScale.range();
    const yRange = yScale.range();
    return {
      x: xRange[1] / 2,
      y: yRange[0],
    };
  },
  right: ([xScale, yScale]) => {
    const xRange = xScale.range();
    return {
      x: xRange[1],
      y: (yScale.range()[0] + yScale.range()[1]) / 2,
    };
  },
  left: ([xScale, yScale]) => {
    const xRange = xScale.range();
    return {
      x: xRange[0],
      y: (yScale.range()[0] + yScale.range()[1]) / 2,
    };
  },
};

function renderValue(value) {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

class AxisRoot extends Component {
  static displayName = 'Axis';

  static style = style;

  static defaultProps = {
    ticks: [],
  };

  getTicksProps() {
    const { ticks, position, indexScale } = this.asProps;
    return {
      ticks,
      indexScale,
      position,
    };
  }

  getTitleProps() {
    const { ticks, position, indexScale, name } = this.asProps;
    return {
      ticks,
      indexScale,
      position: MAP_POSITION_REVERT[position],
      name,
    };
  }

  getGridProps() {
    const { ticks, indexScale } = this.asProps;
    return {
      ticks,
      indexScale,
    };
  }

  render() {
    const SAxis = this.Element;
    const { styles, position, scale, hide, indexScale } = this.asProps;

    const pos =
      MAP_POSITION_AXIS[position] || MAP_POSITION_AXIS[MAP_INDEX_SCALE_SYMBOL[indexScale]];

    return styled(styles)(<SAxis render="line" hide={hide} {...pos(scale, position)} />);
  }
}

function Ticks(props) {
  const { Element: STick, styles, scale, ticks, position, hide, indexScale } = props;

  const pos = MAP_POSITION_TICK[position] || MAP_POSITION_TICK[MAP_INDEX_SCALE_SYMBOL[indexScale]];
  const positionClass = MAP_POSITION_TICK[position] ? position : 'custom_' + indexScale;

  return ticks.map((value, i) => {
    return styled(styles)(
      <STick
        key={i}
        __excludeProps={['data', 'scale', 'format', 'value']}
        value={value}
        index={i}
        childrenPosition="inside"
        render="text"
        position={positionClass}
        hide={hide}
        {...pos(scale, value, position)}
      >
        {renderValue(value)}
      </STick>,
    );
  });
}

function Grid(props) {
  const { Element: SGrid, styles, scale, ticks, indexScale, hide } = props;

  return ticks.map((value, i) => {
    return styled(styles)(
      <SGrid key={i} render="line" hide={hide} {...MAP_POSITION_GRID[indexScale](scale, value)} />,
    );
  });
}

function Title(props) {
  const { Element: STitle, styles, scale, position, indexScale, name } = props;

  const pos =
    MAP_POSITION_TITlE[position] || MAP_POSITION_TITlE[MAP_INDEX_SCALE_SYMBOL[indexScale]];
  const positionClass = MAP_POSITION_TITlE[position] ? position : 'custom_' + indexScale;

  return styled(styles)(
    <STitle
      name={name}
      render="text"
      childrenPosition="inside"
      position={positionClass}
      {...pos(scale, name, position)}
    >
      {renderValue(name)}
    </STitle>,
  );
}

const XAxis = createXYElement(AxisRoot, {
  Ticks,
  Grid,
  Title,
});
XAxis.defaultProps = {
  indexScale: 0,
  position: 'bottom',
};

const YAxis = createXYElement(AxisRoot, {
  Ticks,
  Grid,
  Title,
});
YAxis.defaultProps = {
  indexScale: 1,
  position: 'left',
  hide: true,
};

export { XAxis, YAxis };
