import React, { useContext, createContext } from 'react';
import { sstyled } from '@semcore/core';
import { Legend as LegendRecharts } from 'recharts';
import Checkbox from '@semcore/checkbox';
import propsForElement from '@semcore/utils/lib/propsForElement';
import setRef from '@semcore/utils/lib/setRef';
import copyComponent from '../copy';

import styles from './style/legend.shadow.css';

const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);
        map.has(key) || map.set(key, item);
        return map;
      }, new Map())
      .values(),
  ];
};

const defaultUniqBy = (entry) => entry.value;
const getUniqPayload = (option, payload) => {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy);
  }

  if (typeof option === 'function') {
    return uniqBy(payload, option);
  }

  return payload;
};

const getEventHandlerOfChild = (originalHandler, data, index) => (e) => {
  originalHandler(data, index, e);

  return null;
};

export const LegendContext = createContext({});

function ControlsInner(props) {
  const { payload, align, layout, verticalAlign, formatter, ...other } = props;

  const propsList = {};
  const propsItem = {};

  Object.keys(other).forEach((propName) => {
    if (propName.startsWith('on')) {
      propsItem[propName] = other[propName];
    } else {
      propsList[propName] = other[propName];
    }
  });

  const style = {
    list: {
      textAlign: layout === 'horizontal' ? align : 'left',
      verticalAlign,
    },
    item: {
      display: layout === 'horizontal' ? 'inline-block' : 'block',
    },
  };

  if (!payload || !payload.length) {
    return null;
  }

  const SList = 'ul';
  const SItem = 'li';
  const SControl = Checkbox;

  return sstyled(styles)(
    <SList style={style.list} {...propsForElement(propsList)}>
      {payload.map((entry, i) => {
        const { opacity } = entry.payload;
        const finalFormatter = entry.formatter || formatter;
        const handlers = Object.keys(propsItem).reduce(
          (acc, item) => ({ ...acc, [item]: getEventHandlerOfChild(propsItem[item], entry, i) }),
          {},
        );
        if (entry.type === 'none') {
          return null;
        }

        return (
          <SItem
            key={`legend-item-${i}`}
            style={style.item}
            // @ts-ignore
            opacity={opacity && opacity < 1}
            {...handlers}
          >
            <SControl theme={entry.color}>
              <Checkbox.Value checked={!entry.inactive} />
              <Checkbox.Text pr={3}>
                {finalFormatter ? finalFormatter(entry.value, entry, i) : entry.value}
              </Checkbox.Text>
            </SControl>
          </SItem>
        );
      })}
    </SList>,
  );
}

const Controls = (props) => {
  const context = useContext(LegendContext);

  // @ts-ignore
  return <ControlsInner {...context} {...props} />;
};

//@ts-ignore
LegendRecharts.defaultProps.height = 50;
//@ts-ignore
LegendRecharts.defaultProps.align = 'left';
//@ts-ignore
LegendRecharts.defaultProps.content = null;

LegendRecharts.prototype.render = function () {
  const {
    forwardedRef,
    children,
    width,
    height,
    wrapperStyle,
    paylodUniqBy,
    payload,
    style,
    align,
    layout,
    verticalAlign,
    formatter,
    ...other
  } = this.props;

  const outerStyle = {
    width: width || 'auto',
    height,
    ...this.getDefaultPosition(wrapperStyle),
    ...wrapperStyle,
    ...style,
  };

  const SLegend = 'div';

  return sstyled(styles)(
    <LegendContext.Provider
      value={{
        payload: getUniqPayload(paylodUniqBy, payload),
        align,
        layout,
        verticalAlign,
        formatter,
      }}
    >
      <SLegend
        ref={(node) => {
          this.wrapperNode = node;
          setRef(forwardedRef, node);
        }}
        style={outerStyle}
        {...propsForElement(other, 'div')}
      >
        {children}
      </SLegend>
    </LegendContext.Provider>,
  );
};

const Legend = copyComponent(LegendRecharts, {
  render() {
    const { forwardedRef, ...other } = this.props;
    return <LegendRecharts ref={forwardedRef} {...other} />;
  },
});

Legend.Controls = Controls;

export { Legend };
