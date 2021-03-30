import { bisector } from 'd3-array';
import React, { useEffect, useState } from 'react';
import { styled } from '@semcore/core';

function Dots(props) {
  const { Element: SDot, styles, data, d3, x, y, eventEmitter, display, hide } = props;
  const bisect = bisector((d) => d[x]).center;
  const [activeIndex, setActiveIndex] = useState(props.activeIndex || null);

  useEffect(() => {
    const unsubscribeNearestXY = eventEmitter.subscribe('onNearestXY', (point) => {
      if (point[0] === undefined) {
        setActiveIndex(null);
      } else {
        setActiveIndex(bisect(data, point[0]));
      }
    });

    return () => {
      unsubscribeNearestXY();
    };
  }, [eventEmitter, data, x, y]);

  return data.reduce((acc, d, i) => {
    const isPrev = d3.defined()(data[i - 1] || {});
    const isNext = d3.defined()(data[i + 1] || {});
    const active = i === activeIndex;
    if (!d3.defined()(d)) return acc;
    if (display || i === activeIndex || (!isPrev && !isNext)) {
      acc.push(
        styled(styles)(
          <SDot
            key={i}
            __excludeProps={['data', 'scale', 'value', 'display']}
            value={d}
            index={i}
            render="circle"
            cx={d3.x()(d)}
            cy={d3.y()(d)}
            active={active}
            hide={hide}
          />,
        ),
      );
    }
    return acc;
  }, []);
}

export default Dots;
