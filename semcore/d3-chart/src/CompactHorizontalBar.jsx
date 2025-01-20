import React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import createElement from './createElement';
import AnimatedClipPath from './AnimatedClipPath';
import { roundedPath, scaleToBand } from './utils';
import { PatternFill } from './Pattern';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import Tooltip from './Tooltip';
import { eventToPoint } from './utils';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';

import style from './style/bar.shadow.css';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { Box } from '@semcore/flex-box';

export const MIN_WIDTH = 4;

const barHeight = 20;
const hoverOffset = 6;

class CompactHorizontalBarRoot extends Component {
  static displayName = 'CompactHorizontalBar';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    wMin: MIN_WIDTH,
    locale: 'en',
    color: 'chart-palette-order-1',
  };

  getBarProps(_props, index) {
    return {
      index,
    };
  }
  getBarBackgroundProps(_props, index) {
    const { data, scale } = this.asProps;
    const bar = this.computeBarData(data[index], index);

    return {
      scale,
      index,
      x: bar.x,
      y: bar.y + bar.height - barHeight - hoverOffset,
      height: barHeight,
      width: bar.fullWidth,
    };
  }

  getBarFillProps(_props, index) {
    const { data, uid, patterns, color, transparent, hide, scale } = this.asProps;
    const bar = this.computeBarData(data[index], index);
    return {
      x: bar.x,
      y: bar.y + bar.height - barHeight - hoverOffset,
      height: barHeight,
      width: bar.width,
      i: index,
      uid,
      resolveColor: this.asProps.resolveColor,
      patterns,
      color,
      transparent,
      hide,
      scale,
      index,
    };
  }
  getAnnotationProps(_props, index) {
    const { data, size } = this.asProps;
    const bar = this.computeBarData(data[index], index);
    return {
      y: bar.y,
      height: barHeight * 2,
      width: size[0],
      index,
    };
  }

  getLabelProps(_props, index) {
    const { data, y } = this.asProps;
    const label = data[index][y];

    return {
      children: label,
      index,
    };
  }

  percentFormatter = null;
  percentFormatterLocale = null;
  getPercentFormatter() {
    if (!this.percentFormatter || this.percentFormatterLocale !== this.asProps.locale) {
      this.percentFormatter = new Intl.NumberFormat(this.asProps.locale, { style: 'percent' });
      this.percentFormatterLocale = this.asProps.locale;
    }
    return this.percentFormatter;
  }

  valueFormatter = null;
  valueFormatterLocale = null;
  getValueFormatter() {
    if (!this.valueFormatter || this.valueFormatterLocale !== this.asProps.locale) {
      this.valueFormatter = new Intl.NumberFormat(this.asProps.locale);
      this.valueFormatterLocale = this.asProps.locale;
    }
    return this.valueFormatter;
  }

  getPercentProps(_props, index) {
    const { data, x, scale } = this.asProps;
    const value = data[index][x];
    const domain = scale[0].domain();
    const percent = value / domain[1];
    const formatter = this.getPercentFormatter();
    const formatted = formatter.format(percent);

    return { children: formatted, formatted, percent };
  }
  getValueProps(_props, index) {
    const { data, x } = this.asProps;
    const value = data[index][x];
    const formatter = this.getValueFormatter();
    const formatted = formatter.format(value);

    return { children: formatted, formatted, value };
  }

  getHoverProps(_props, index) {
    const { data } = this.asProps;
    return {
      data,
      getBarData: (index) => this.computeBarData(data[index], index),
      render: index === 0,
    };
  }
  getTooltipProps(_props, index) {
    return {
      render: index === 0,
      index,
    };
  }

  computeBarData(d) {
    const {
      x,
      y,
      scale,
      offset: offsetProps,
      wMin,
      height: heightProps,
      maxBarSize = Infinity,
      size,
    } = this.asProps;

    const offset = typeof offsetProps === 'function' ? offsetProps(i) : offsetProps;
    const [xScale, yScale] = scale;
    const absWidth = xScale(d[x]);
    const bandHeight = heightProps || scaleToBand(yScale).bandwidth();
    const height = Math.min(bandHeight, maxBarSize);
    const width = absWidth === 0 ? 0 : Math.max(absWidth, wMin);
    const barY = yScale(d[y]) + bandHeight / 2 - height / 2 + offset[1];

    return {
      x: 0,
      y: barY,
      width,
      fullWidth: size[0],
      height,
    };
  }

  renderBar(d, i) {
    const SCompactHorizontalBarGroup = this.Element;
    const { styles, groupKey } = this.asProps;
    const { x, y } = this.computeBarData(d, i);

    this.asProps.dataHintsHandler.describeValueEntity(`${i}.${x}`, groupKey ?? d[y]);

    return (
      <React.Fragment key={`horizontal-bar-${i}`}>
        {sstyled(styles)(<SCompactHorizontalBarGroup render='g' />)}
      </React.Fragment>
    );
  }

  renderBars() {
    const { data } = this.asProps;

    return data.map(this.renderBar.bind(this));
  }

  render() {
    const { uid, size, duration } = this.asProps;

    return (
      <>
        {this.renderBars()}
        {duration && (
          <AnimatedClipPath
            aria-hidden
            duration={duration}
            id={uid}
            x='0'
            y='0'
            width={0}
            height={size[1]}
          />
        )}
      </>
    );
  }
}

function Annotation(props) {
  const { Children, y, height, width, styles } = props;
  const SBarAnnotation = 'div';
  return sstyled(styles)(
    <foreignObject x='0' y={y - barHeight} height={height} width={width}>
      <SBarAnnotation>
        <Children />
      </SBarAnnotation>
    </foreignObject>,
  );
}
const excludeProps = ['data', 'scale', 'value', 'offset'];
function Label(props) {
  const SBarLabel = Root;
  const { styles, Children } = props;
  return sstyled(styles)(
    <SBarLabel render={Box} __excludeProps={excludeProps}>
      <Children />
    </SBarLabel>,
  );
}
function Percent(props) {
  const SBarPercent = Root;
  const { styles, Children } = props;
  return sstyled(styles)(
    <SBarPercent render={Box} __excludeProps={excludeProps}>
      <Children />
    </SBarPercent>,
  );
}
function Value(props) {
  const SBarValue = Root;
  const { styles, Children } = props;
  return sstyled(styles)(
    <SBarValue render={Box} __excludeProps={excludeProps}>
      <Children />
    </SBarValue>,
  );
}

const BarContext = React.createContext({});
function Bar(props) {
  const { Children, index, onClick, transparent, hide } = props;
  const onClickHandler = React.useCallback(
    (event) => {
      onClick?.(index, event);
    },
    [onClick, index],
  );
  const contextValue = React.useMemo(
    () => ({ onClick: onClickHandler, transparent, hide }),
    [onClickHandler, transparent, hide],
  );
  return (
    <BarContext.Provider value={contextValue}>
      <Children />
    </BarContext.Provider>
  );
}
function BarFill(props) {
  const {
    Element: SBar,
    styles,
    color,
    x,
    y,
    width,
    height,
    uid,
    duration,
    resolveColor,
    patterns,
    i,
    scale,
  } = props;
  const [xScale] = scale;
  const xRange = xScale.range();
  const backgroundWidth = xRange[1] - xRange[0];
  const radius = 0; // left it here in case we will change our mind and return to rounded bars
  const pathD = React.useMemo(() => {
    if (backgroundWidth - radius > width) {
      return roundedPath(x, y, width, height, radius);
    }
    return roundedPath(x, y, width, height, radius, false, true, false, true);
  }, [x, y, height, width, radius]);

  const barProps = React.useContext(BarContext);

  return (
    <>
      {sstyled(styles)(
        <SBar
          aria-hidden
          render='path'
          d={pathD}
          clipPath={`url(#${uid})`}
          __excludeProps={['data', 'scale', 'value', 'offset']}
          childrenPosition='above'
          index={i}
          color={resolveColor(color)}
          pattern={patterns ? `url(#${uid}-${i}-pattern)` : undefined}
          x={x}
          y={y}
          width={width}
          height={height}
          use:duration={`${duration}ms`}
          onClick={callAllEventHandlers(props.onClick, barProps.onClick)}
          transparent={barProps.transparent || props.transparent}
          hide={barProps.hide || props.hide}
        />,
      )}
      {patterns && (
        <PatternFill
          id={`${uid}-${i}-pattern`}
          patternKey={color}
          color={resolveColor(color)}
          patterns={patterns}
        />
      )}
    </>
  );
}
function BarBackground(props) {
  const { Element: SBackground, styles, scale, y, x, height } = props;
  const [xScale] = scale;
  const xRange = xScale.range();
  const width = xRange[1] - xRange[0];
  const radius = 0; // left it here in case we will change our mind and return to rounded bars
  const pathD = React.useMemo(() => {
    return roundedPath(x, y, width, height, radius, false, true, false, true);
  }, [x, y, height, width, radius]);
  const barProps = React.useContext(BarContext);

  return sstyled(styles)(
    <SBackground
      aria-hidden
      render='path'
      d={pathD}
      childrenPosition='above'
      width={xRange[1] - xRange[0]}
      height={height}
      x={x}
      y={y}
      transparent={barProps.transparent}
      onClick={callAllEventHandlers(props.onClick, barProps.onClick)}
    />,
  );
}

class Hover extends Component {
  state = {
    index: null,
  };

  virtualElement = canUseDOM() ? document.createElement('div') : {};

  unsubscribeMouseMoveRoot = null;
  unsubscribeMouseLeaveRoot = null;

  generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({ width: 0, height: 0, top: y, right: x, bottom: y, left: x });
  }
  getIndex(point) {
    const { data, getBarData } = this.asProps;
    for (let i = 0; i < data.length; i++) {
      const bar = getBarData(i);
      if (
        point[0] >= bar.x &&
        point[0] <= bar.x + bar.fullWidth &&
        point[1] >= bar.y &&
        point[1] <= bar.y + bar.height
      ) {
        return i;
      }
    }
    return null;
  }

  handlerMouseMoveRoot = trottle((e) => {
    const { eventEmitter, rootRef, patterns } = this.asProps;
    const point = eventToPoint(e, rootRef.current);
    const { clientX, clientY } = e;

    const index = this.getIndex(point);

    this.setState({ index }, () => {
      eventEmitter.emit('setTooltipPosition', clientX, clientY);
      eventEmitter.emit('setTooltipRenderingProps', {}, { index, patterns });
      eventEmitter.emit('setTooltipVisible', index !== null);
    });
  });

  handlerMouseLeaveRoot = trottle(() => {
    this.setState({ index: null }, () => {
      this.asProps.eventEmitter.emit('setTooltipVisible', false);
    });
  });

  componentDidMount() {
    const { eventEmitter } = this.asProps;
    this.unsubscribeMouseMoveRoot = eventEmitter.subscribe('onMouseMoveRoot', (e) => {
      e.persist();
      this.handlerMouseMoveRoot(e);
    });
    this.unsubscribeMouseLeaveRoot = eventEmitter.subscribe(
      'onMouseLeaveRoot',
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

  render() {
    const { styles, getBarData, render } = this.asProps;
    if (!render) return null;
    const { index } = this.state;
    const SCompactHorizontalBarHoverRect = this.Element;

    if (index === null) return null;
    const bar = getBarData(index);
    return sstyled(styles)(
      <SCompactHorizontalBarHoverRect
        render='rect'
        x={bar.x}
        y={bar.y + bar.height - barHeight - hoverOffset * 2}
        width={bar.fullWidth}
        height={barHeight + hoverOffset * 2}
      />,
    );
  }
}

const CompactHorizontalBarTooltip = (props) => {
  if (!props.render) return null;
  const SCompactHorizontalBarRadarTooltip = Root;
  return sstyled(props.styles)(
    <SCompactHorizontalBarRadarTooltip
      render={Tooltip}
      tag={CompactHorizontalBar.Hover}
      excludeAnchorProps
    />,
  );
};

const CompactHorizontalBar = createElement(CompactHorizontalBarRoot, {
  Annotation,
  Label,
  Percent,
  Value,
  Bar: [
    Bar,
    {
      Fill: BarFill,
      Background: BarBackground,
    },
  ],
  Hover,
  Tooltip: [CompactHorizontalBarTooltip, Tooltip._______childrenComponents],
});

export default CompactHorizontalBar;
