import { bisector } from 'd3-array';
import React from 'react';
import { sstyled } from '@semcore/core';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import createElement from './createElement';
import { eventToPoint, invert, interpolateValue, getChartDefaultColorName } from './utils';

import style from './style/dot.shadow.css';
import { PatternSymbol, getPatternSymbolSize } from './Pattern';

const EXCLUDE_PROPS = ['data', 'scale', 'value', 'display'];

function Dots(props) {
  const {
    Element: SDot,
    styles,
    color,
    d3,
    x,
    y,
    eventEmitter,
    display,
    hide,
    rootRef,
    scale,
    duration = 500,
    transparent,
    radius: radiusBase = 4,
    resolveColor,
    patterns,
  } = props;
  const bisect = bisector((d) => d[x]).center;
  const [activeIndex, setActiveIndex] = React.useState(null);
  const data = React.useMemo(
    () => props.data.filter((item) => item[y] !== interpolateValue),
    [props.data],
  );

  const handlerMouseMoveRoot = React.useCallback(
    trottle((e) => {
      const [xScale] = scale;
      const [pX] = eventToPoint(e, rootRef.current);
      const vX = invert(xScale, pX);
      setActiveIndex(bisect(data, vX));
    }),
    [scale, data],
  );

  const handlerMouseLeaveRoot = React.useCallback(
    trottle(() => {
      setActiveIndex(null);
    }),
    [],
  );

  React.useEffect(() => {
    const unsubscribeMouseMoveRoot = eventEmitter.subscribe('onMouseMoveChart', (e) => {
      e.persist();
      handlerMouseMoveRoot(e);
    });

    const unsubscribeMouseLeaveRoot = eventEmitter.subscribe(
      'onMouseLeaveChart',
      handlerMouseLeaveRoot,
    );

    return () => {
      unsubscribeMouseMoveRoot();
      unsubscribeMouseLeaveRoot();
    };
  }, [eventEmitter, scale, data, x, y]);

  const dots = data.reduce((acc, d, i) => {
    const isPrev = d3.defined()(data[i - 1] || {});
    const isNext = d3.defined()(data[i + 1] || {});
    const active = i === activeIndex;
    const visible =
      typeof display === 'function'
        ? display(i, i === activeIndex, !isPrev && !isNext)
        : display || i === activeIndex || (!isPrev && !isNext);
    const radius = radiusBase * (active ? 5 / 4 : 1);
    if (!d3.defined()(d)) return acc;
    if (!visible) return acc;

    const patternKey = color || getChartDefaultColorName(0);
    const [width, height] = getPatternSymbolSize({
      patternKey,
      patterns,
    });

    if (!patterns) {
      acc.push(
        sstyled(styles)(
          <SDot
            render='circle'
            color={resolveColor(color)}
            patternKey={patternKey}
            patterns={patterns}
            key={`${i}`}
            value={d}
            visible={visible}
            active={active}
            hide={hide}
            transparent={transparent}
            cx={d3.x()(d)}
            cy={d3.y()(d)}
            r={radius}
          />,
        ),
      );
    } else {
      acc.push(
        sstyled(styles)(
          <SDot
            render={PatternSymbol}
            color={resolveColor(color)}
            patternKey={patternKey}
            patterns={patterns}
            key={`${i}`}
            value={d}
            visible={visible}
            active={active}
            hide={hide}
            transparent={transparent}
            x={d3.x()(d) - width / 2}
            y={d3.y()(d) - height / 2}
            radius={radius}
          />,
        ),
      );
    }
    // acc.push(<PatternSymbol color={resolveColor(color)} patternKey={color} />);
    return acc;
  }, []);
  const SDots = 'g';
  return sstyled(styles)(<SDots duration={`${duration}ms`}>{dots}</SDots>);
}

Dots.style = style;

export default createElement(Dots);
