import { bisector } from 'd3-array';
import React, { useCallback, useEffect, useState } from 'react';
import { sstyled } from '@semcore/core';
import { eventToPoint, invert } from './utils';
import createElement from './createElement';
import trottle from '@semcore/utils/lib/rafTrottle';

import style from './style/dot.shadow.css';

const EXCLUDE_PROPS = ['data', 'scale', 'value', 'display'];

function Dots(props) {
  const {
    Element: SDot,
    styles,
    data,
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
  } = props;
  const SDots = 'g';
  const bisect = bisector((d) => d[x]).center;
  const [activeIndex, setActiveIndex] = useState(null);

  const handlerMouseMoveRoot = useCallback(
    trottle((e) => {
      const [xScale] = scale;
      const [pX] = eventToPoint(e, rootRef.current);
      const vX = invert(xScale, pX);
      setActiveIndex(bisect(data, vX));
    }),
    [scale, data],
  );

  const handlerMouseLeaveRoot = useCallback(
    trottle(() => {
      setActiveIndex(null);
    }),
    [],
  );

  useEffect(() => {
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
    const visible = display || i === activeIndex || (!isPrev && !isNext);
    if (!d3.defined()(d)) return acc;
    if (!visible) return acc;
    acc.push(
      sstyled(styles)(
        <SDot
          aria-hidden
          key={i}
          render="circle"
          visible={visible}
          __excludeProps={EXCLUDE_PROPS}
          value={d}
          index={i}
          cx={d3.x()(d)}
          cy={d3.y()(d)}
          active={active}
          hide={hide}
          color={color}
        />,
      ),
    );
    return acc;
  }, []);
  return sstyled(styles)(<SDots use:duration={`${duration}ms`}>{dots}</SDots>);
}

Dots.style = style;

export default createElement(Dots);
