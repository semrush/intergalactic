import { sstyled } from '@semcore/core';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import { bisector } from 'd3-array';
import React from 'react';

import { HIGHLIGHT_DOT, GOOD, BAD, INSIGHTFUL } from './component/Chart/AbstractChart.type';
import createElement from './createElement';
import { PatternSymbol, getPatternSymbolSize, PotentialGradient } from './Pattern';
import style from './style/dot.shadow.css';
import { eventToPoint, invert, interpolateValue, getChartDefaultColorName } from './utils';

const BASE_RADIUS = 3.5;
const ACTIVE_RADIUS = 4.5;

function Dots(props) {
  const SDotHighlight = 'circle';
  const SDotBorder = 'circle';
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
    radius: radiusBase = BASE_RADIUS,
    resolveColor,
    patterns,
    onClick,
    uid,
  } = props;
  const bisect = bisector((d) => d[x]).center;
  const [activeIndex, setActiveIndex] = React.useState(null);
  const patternKey = color || getChartDefaultColorName(0);
  const svgPatternId = `template_${patternKey}`;
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

  const handlerOnClick = React.useCallback((e) => {
    e.stopPropagation();

    if (!onClick) return;

    const [xScale] = scale;
    const [pX] = eventToPoint(e, rootRef.current);
    const vX = invert(xScale, pX);
    const index = bisect(data, vX);

    onClick(index, e);
  }, [scale, data, onClick]);

  const resolveHighlightColor = React.useCallback((highlight) => {
    switch (highlight) {
      case GOOD: {
        return resolveColor('--intergalactic-chart-data-success');
      }
      case BAD: {
        return resolveColor('--intergalactic-chart-data-critical');
      }
      case INSIGHTFUL: {
        return `url(#dotGradient_${uid})`;
      }
      default:
        return '';
    }
  }, []);

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

  const [width, height] = getPatternSymbolSize({
    patternKey,
    patterns,
  });

  const dots = data.reduce((acc, d, i) => {
    const isPrev = d3.defined()(data[i - 1] || {});
    const isNext = d3.defined()(data[i + 1] || {});
    const active = i === activeIndex;
    const visible =
      typeof display === 'function'
        ? display(i, active, !isPrev && !isNext, d)
        : display || active || (!isPrev && !isNext);
    const radius = active ? ACTIVE_RADIUS : radiusBase;
    if (!d3.defined()(d)) return acc;
    if (!visible) return acc;

    if (!patterns) {
      acc.push(
        sstyled(styles)(
          <React.Fragment key={i}>
            {d[HIGHLIGHT_DOT] && (
              <>
                <SDotBorder
                  visible={visible}
                  active={active}
                  hide={hide}
                  transparent={transparent}
                  cx={d3.x()(d)}
                  cy={d3.y()(d)}
                  r={11.5}
                />
                <SDotHighlight
                  color={resolveHighlightColor(d[HIGHLIGHT_DOT])}
                  value={d}
                  visible={visible}
                  active={active}
                  hide={hide}
                  transparent={transparent}
                  cx={d3.x()(d)}
                  cy={d3.y()(d)}
                  r={8.5}
                />
              </>
            )}
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
              __excludeProps={['display', 'data', 'scale']}
            />
          </React.Fragment>,
        ),
      );
    } else {
      acc.push(
        sstyled(styles)(
          <SDot
            key={i}
            render='use'
            href={`#${svgPatternId}`}
            x={width + (d3.x()(d) - width / 2)}
            y={d3.y()(d) - height / 2}
            value={d}
            transparent={transparent}
            radius={radius}
            visible={visible}
            active={active}
            hide={hide}
            __excludeProps={['display', 'data', 'scale']}
          />,
        ),
      );
    }
    return acc;
  }, []);
  const SDots = 'g';
  return sstyled(styles)(
    <SDots duration={`${duration}ms`} onClickCapture={handlerOnClick}>
      <PotentialGradient id={`dotGradient_${uid}`} />
      { patterns && (
        <PatternSymbol
          color={resolveColor(color)}
          patternKey={color}
          id={svgPatternId}
          patterns={patterns}
          x={-1 * width}
        />
      )}
      {dots}
    </SDots>,
  );
}

Dots.style = style;

export default createElement(Dots);
