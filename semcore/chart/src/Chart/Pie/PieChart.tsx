import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Pie, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import generateCategoricalChartRecharts from 'recharts/lib/chart/generateCategoricalChart';
import { formatAxisMap } from 'recharts/lib/util/PolarUtils';
import { findChildByType } from 'recharts/lib/util/ReactUtils';
import { Tooltip } from '../../Tooltip';

const generateCategoricalChart = function (params) {
  const ReactComponent = generateCategoricalChartRecharts(params);

  ReactComponent.prototype.renderTooltip = function () {
    const { children } = this.props;
    const tooltipItem = findChildByType(children, Tooltip);
    const displayedData = this.constructor.getDisplayedData(this.props, this.state);

    if (!tooltipItem) {
      return null;
    }

    const { isTooltipActive, activeCoordinate, activePayload, offset } = this.state;
    let payload = [];
    if (isTooltipActive) {
      const { dataKey } = activePayload[0];
      const commonValue = displayedData.reduce((acc, item) => (acc += item[dataKey]), 0);
      payload = activePayload.map((item) => ({
        ...Object.keys(item).reduce((acc, name) => {
          if (name === 'payload') {
            return { ...acc, ...item[name] };
          }
          return { ...acc, [name]: item[name] };
        }, {}),
        percent: (item[item.dataKey] / commonValue) * 100,
      }));
    }

    return React.cloneElement(tooltipItem, {
      viewBox: { ...offset, x: offset.left, y: offset.top },
      active: isTooltipActive,
      payload,
      coordinate: activeCoordinate,
    });
  };

  return ReactComponent;
};

export default generateCategoricalChart({
  chartName: 'PieChart',
  GraphicalChild: Pie,
  eventType: 'item',
  legendContent: 'children',
  axisComponents: [
    { axisType: 'angleAxis', AxisComp: PolarAngleAxis },
    { axisType: 'radiusAxis', AxisComp: PolarRadiusAxis },
  ],
  formatAxisMap,
  defaultProps: {
    layout: 'centric',
    startAngle: 0,
    endAngle: 360,
    cx: '50%',
    cy: '50%',
    innerRadius: 0,
    outerRadius: '80%',
  },
  propTypes: {
    layout: PropTypes.oneOf(['centric']),
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    cx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
});
