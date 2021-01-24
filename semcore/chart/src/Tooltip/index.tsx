import React, { PureComponent } from 'react';
import { Curve, Rectangle, Tooltip } from 'recharts';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';

function isNumOrStr(value) {
  return (typeof value === 'number' && !isNaN(value)) || typeof value === 'string';
}
export const defaultFormatter = (value) =>
  Array.isArray(value) && value[0] && value[1] ? value.join(' ~ ') : value;

export interface IDefaultTooltip {
  separator?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  formatter?: (value, name, entry, i) => any;
  contentStyle?: object;
  itemStyle?: object;
  labelStyle?: object;
  labelFormatter?: (label, payload) => React.ReactNode;
  label?: any;
  payload?: any;
  itemSorter?: () => {};
  title?: string;
}

class DefaultTooltipContent extends PureComponent<IDefaultTooltip> {
  static displayName = 'DefaultTooltipContent';

  static defaultProps = {
    separator: ' : ',
    contentStyle: {},
    itemStyle: {},
    labelStyle: {},
  };

  renderTooltipItem = ({ entry, name, value, separator }) => (
    <>
      {name !== undefined && (
        <span className="recharts-tooltip-item-name-wrapper">
          <span
            className="recharts-tooltip-item-color"
            style={{
              backgroundColor: entry.fill || entry.stroke /* bar charts has no stroke */,
            }}
          />
          <span className="recharts-tooltip-item-name">{name}</span>
          <span className="recharts-tooltip-item-separator">{separator}</span>
        </span>
      )}
      <span className="recharts-tooltip-item-value-wrapper">
        <span className="recharts-tooltip-item-value">{value}</span>
        <span className="recharts-tooltip-item-unit">{entry.unit || ''}</span>
      </span>
    </>
  );

  renderContent() {
    const { payload, separator, formatter, itemStyle, itemSorter } = this.props;

    if (payload && payload.length) {
      const listStyle = { padding: 0, margin: 0 };

      const items = payload.sort(itemSorter).map((entry, i) => {
        const finalFormatter = entry.formatter || formatter || defaultFormatter;
        let { name, value } = entry;
        if (name.startsWith('_')) return;
        if (finalFormatter) {
          const formatted = finalFormatter(value, name, entry, i);
          if (Array.isArray(formatted)) {
            [value, name] = formatted;
          } else {
            value = formatted;
          }
        }
        return (
          <li className="recharts-tooltip-item" key={`tooltip-item-${i}`} style={itemStyle}>
            {this.renderTooltipItem({ entry, name, value, separator })}
          </li>
        );
      });

      return (
        <ul className="recharts-tooltip-item-list" style={listStyle}>
          {items}
        </ul>
      );
    }

    return null;
  }

  render() {
    const {
      wrapperClassName,
      contentStyle,
      labelClassName,
      labelStyle,
      label,
      labelFormatter,
      payload,
    } = this.props;
    const hasLabel = isNumOrStr(label);
    let finalLabel = hasLabel ? label : '';
    const wrapperCN = cn('recharts-default-tooltip', wrapperClassName);
    const labelCN = cn('recharts-tooltip-label', labelClassName);

    if (hasLabel && labelFormatter) {
      finalLabel = labelFormatter(finalLabel, payload);
    }

    return (
      <div className={wrapperCN} style={contentStyle}>
        <p className={labelCN} style={labelStyle}>
          {finalLabel}
        </p>
        {this.renderContent()}
      </div>
    );
  }
}

class CustomCursor extends PureComponent {
  render() {
    // @ts-ignore
    const { points, payload } = this.props;

    // see renderCursor in chart/generateCategoricalChart.js
    if (points) return <Curve {...this.props} stroke="#a6b0b3" />;
    if (payload) return <Rectangle {...this.props} fill="rgba(152, 170, 175, 0.3)" />;
    return null;
  }
}

// @ts-ignore
Tooltip.defaultProps.wrapperStyle = { zIndex: 1 };
// @ts-ignore
Tooltip.defaultProps.offset = 18;
// @ts-ignore
Tooltip.defaultProps.separator = null;
// @ts-ignore
Tooltip.defaultProps.content = <DefaultTooltipContent />;
// @ts-ignore
Tooltip.defaultProps.cursor = <CustomCursor />;

export { Tooltip, DefaultTooltipContent };
