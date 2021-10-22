import { bisector } from 'd3-array';
import React, { useCallback, useEffect, useState } from 'react';
import { sstyled } from '@semcore/core';
import { eventToPoint, invert } from './utils';
import createElement from './createElement';
import { FadeInOut } from '@semcore/animation';
import trottle from '@semcore/utils/lib/rafTrottle';

import style from './style/dot.shadow.css';

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
  }, [eventEmitter, data, x, y]);

  const renderCircle = useCallback(
    React.forwardRef((props, ref) => {
      return <FadeInOut ref={ref} tag="circle" {...props} />;
    }),
    [props],
  );

  return data.reduce((acc, d, i) => {
    const isPrev = d3.defined()(data[i - 1] || {});
    const isNext = d3.defined()(data[i + 1] || {});
    const active = i === activeIndex;
    if (!d3.defined()(d)) return acc;
    acc.push(
      sstyled(styles)(
        <SDot
          key={i}
          render={renderCircle}
          visible={display || i === activeIndex || (!isPrev && !isNext)}
          __excludeProps={['data', 'scale', 'value', 'display']}
          value={d}
          index={i}
          cx={d3.x()(d)}
          cy={d3.y()(d)}
          active={active}
          hide={hide}
          color={color}
          use:duration={`${duration}ms`}
        />,
      ),
    );
    return acc;
  }, []);
}

Dots.style = style;

export default createElement(Dots);
