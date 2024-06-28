import React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import createElement from './createElement';
import AnimatedClipPath from './AnimatedClipPath';
import { scaleToBand } from './utils';
import { PatternFill } from './Pattern';
import trottle from '@semcore/utils/lib/rafTrottle';
import Tooltip from './Tooltip';
import { eventToPoint } from './utils';

import style from './style/bar.shadow.css';
import canUseDOM from '@semcore/utils/lib/canUseDOM';

export const MIN_WIDTH = 4;

const barHeight = 20;
const hoverOffset = 4;

class DistributionBarRoot extends Component {
  static displayName = 'DistributionBar';
  static enhance = [uniqueIDEnhancement()];
  static style = style;

  static defaultProps = {
    offset: [0, 0],
    duration: 500,
    wMin: MIN_WIDTH,
    locale: 'en',
  };

  getBarBackgroundProps(_props, index) {
    const { data, scale, size } = this.asProps;
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
    const { data } = this.asProps;
    const bar = this.computeBarData(data[index], index);
    return {
      x: bar.x,
      y: bar.y + bar.height - barHeight - hoverOffset,
      height: barHeight,
      width: bar.width,
      i: index,
      resolveColor: this.asProps.resolveColor,
    };
  }
  getAnnotationProps(_props, index) {
    const { data, size } = this.asProps;
    const bar = this.computeBarData(data[index], index);
    return {
      y: bar.y,
      height: 20,
      width: size[0],
    };
  }

  getLabelProps(_props, index) {
    const { data, y } = this.asProps;
    const label = data[index][y];

    return {
      children: label,
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

    return { children: formatter.format(percent) };
  }
  getValueProps(_props, index) {
    const { data, x } = this.asProps;
    const value = data[index][x];
    const formatter = this.getValueFormatter();

    return { children: formatter.format(value) };
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
    };
  }

  computeBarData(d, index) {
    const {
      styles,
      color,
      x,
      y,
      scale,
      hide,
      offset: offsetProps,
      uid,
      duration,
      wMin,
      height: heightProps,
      onMouseMove,
      onMouseLeave,
      groupKey,
      transparent,
      maxBarSize = Infinity,
      resolveColor,
      patterns,
      Children,
      size,
    } = this.asProps;

    const offset = typeof offsetProps === 'function' ? offsetProps(i) : offsetProps;
    const [xScale, yScale] = scale;
    const absWidth = xScale(d[x]);
    const bandHeight = heightProps || scaleToBand(yScale).bandwidth();
    const height = Math.min(bandHeight, maxBarSize);
    const width = Math.max(absWidth, wMin);
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
    const SDistributionBarGroup = this.Element;
    const { styles, groupKey } = this.asProps;
    const { x, y } = this.computeBarData(d, i);

    this.asProps.dataHintsHandler.describeValueEntity(`${i}.${x}`, groupKey ?? d[y]);

    return (
      <React.Fragment key={`horizontal-bar-${i}`}>
        {sstyled(styles)(<SDistributionBarGroup render='g' />)}
      </React.Fragment>
    );
  }

  renderBars() {
    const { data } = this.asProps;

    return data.map((_, i) => {
      const index = data.length - i - 1;
      return this.renderBar(data[index], index);
    });
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
  const { Children, y, height, width } = props;
  const SBarAnnotation = 'div';
  return sstyled(props.styles)(
    <foreignObject x='0' y={y - 20} height={height} width={width}>
      <SBarAnnotation>
        <Children />
      </SBarAnnotation>
    </foreignObject>,
  );
}
function Label(props) {
  const SBarLabel = Root;
  return sstyled(props.styles)(<SBarLabel render='div' />);
}
function Percent(props) {
  const SBarPercent = Root;
  return sstyled(props.styles)(<SBarPercent render='div' />);
}
function Value(props) {
  const SBarValue = Root;
  return sstyled(props.styles)(<SBarValue render='div' />);
}
function Bar(props) {
  const { Children } = props;
  return <Children />;
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
    hide,
    uid,
    duration,
    onMouseMove,
    onMouseLeave,
    groupKey,
    resolveColor,
    patterns,
    i,
  } = props;

  return (
    <>
      {sstyled(styles)(
        <SBar
          aria-hidden
          render='rect'
          clipPath={`url(#${uid})`}
          __excludeProps={['data', 'scale', 'value', 'offset']}
          childrenPosition='above'
          index={i}
          hide={hide}
          color={resolveColor(color)}
          pattern={patterns ? `url(#${uid}-${i}-pattern)` : undefined}
          transparent={transparent}
          x={x}
          y={y}
          width={width}
          height={height}
          use:duration={`${duration}ms`}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
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

  return sstyled(styles)(
    <SBackground
      aria-hidden
      render='rect'
      childrenPosition='above'
      width={xRange[1] - xRange[0]}
      height={height}
      x={x}
      y={y}
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
    const { eventEmitter, size, rootRef, patterns } = this.asProps;
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
    const SDistributionBarHoverRect = this.Element;

    const bar = index !== null ? getBarData(index) : null;
    return sstyled(styles)(
      <SDistributionBarHoverRect
        render='rect'
        x={bar?.x ?? 0}
        y={bar?.y ?? 0}
        width={bar?.fullWidth ?? 0}
        height={bar?.height ?? 0}
      />,
    );
  }
}

const DistributionBarTooltip = (props) => {
  if (!props.render) return null;
  const SDistributionBarRadarTooltip = Root;
  return sstyled(props.styles)(
    <SDistributionBarRadarTooltip
      render={Tooltip}
      tag={DistributionBar.Hover}
      excludeAnchorProps
    />,
  );
};

const DistributionBar = createElement(DistributionBarRoot, {
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
  Tooltip: [DistributionBarTooltip, Tooltip._______childrenComponents],
});

export default DistributionBar;
