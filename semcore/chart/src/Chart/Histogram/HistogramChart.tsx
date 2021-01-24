import { Bar } from 'recharts';
import { parseChildIndex } from 'recharts/lib/util/ReactUtils';
import generateCategoricalChartRecharts from 'recharts/lib/chart/generateCategoricalChart';
import {
  getBarSizeList,
  getStackedDataOfItem,
  getBandSizeOfAxis,
  getTicksOfAxis,
  getBarPosition,
  combineEventHandlers,
} from 'recharts/lib/util/ChartUtils';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import { formatAxisMap } from 'recharts/lib/util/CartesianUtils';

const axisComponents = [
  { axisType: 'xAxis', AxisComp: XAxis },
  { axisType: 'yAxis', AxisComp: YAxis },
];

const generateCategoricalChart = function (params) {
  const ReactComponent = generateCategoricalChartRecharts(params);

  ReactComponent.prototype.getFormatItems = function (props, currentState) {
    const {
      graphicalItems,
      stackGroups,
      offset,
      updateId,
      dataStartIndex,
      dataEndIndex,
    } = currentState;
    const { barSize, layout, barGap, barCategoryGap, maxBarSize: globalMaxBarSize } = props;
    const { numericAxisName, cateAxisName } = this.constructor.getAxisNameByLayout(layout);
    const hasBar = this.constructor.hasBar(graphicalItems);
    const sizeList = hasBar && getBarSizeList({ barSize, stackGroups });
    const formatedItems = [];

    graphicalItems.forEach((item, index) => {
      const displayedData = this.constructor.getDisplayedData(
        props,
        { dataStartIndex, dataEndIndex },
        item,
      );
      const { dataKey, maxBarSize: childMaxBarSize } = item.props;
      const numericAxisId = item.props[`${numericAxisName}Id`];
      const cateAxisId = item.props[`${cateAxisName}Id`];
      const axisObj = axisComponents.reduce((result, entry) => {
        const axisMap = currentState[`${entry.axisType}Map`];
        const id = item.props[`${entry.axisType}Id`];
        const axis = axisMap && axisMap[id];

        return {
          ...result,
          [entry.axisType]: axis,
          [`${entry.axisType}Ticks`]: getTicksOfAxis(axis),
        };
      }, {});
      const cateAxis = axisObj[cateAxisName];
      const cateTicks = axisObj[`${cateAxisName}Ticks`];
      const stackedData =
        stackGroups &&
        stackGroups[numericAxisId] &&
        stackGroups[numericAxisId].hasStack &&
        getStackedDataOfItem(item, stackGroups[numericAxisId].stackGroups);
      const bandSize = getBandSizeOfAxis(cateAxis, cateTicks);
      const maxBarSize = childMaxBarSize == null ? globalMaxBarSize : childMaxBarSize;
      let barPosition =
        hasBar &&
        getBarPosition({
          barGap,
          barCategoryGap,
          bandSize,
          sizeList: sizeList[cateAxisId],
          maxBarSize,
        });
      const componsedFn = item && item.type && item.type.getComposedData;
      barPosition = barPosition.map((bar) => {
        const { position } = bar;
        const { offset: offsetBar, size } = position;
        return { ...bar, position: { offset: barGap, size: size + offsetBar * 2 - 2 * barGap } };
      });

      if (componsedFn) {
        formatedItems.push({
          props: {
            ...componsedFn({
              ...axisObj,
              displayedData,
              props,
              dataKey,
              item,
              bandSize,
              barPosition,
              offset,
              stackedData,
              layout,
              dataStartIndex,
              dataEndIndex,
              onItemMouseLeave: combineEventHandlers(
                this.handleItemMouseLeave,
                null,
                item.props.onMouseLeave,
              ),
              onItemMouseEnter: combineEventHandlers(
                this.handleItemMouseEnter,
                null,
                item.props.onMouseEnter,
              ),
            }),
            key: item.key || `item-${index}`,
            [numericAxisName]: axisObj[numericAxisName],
            [cateAxisName]: axisObj[cateAxisName],
            animationId: updateId,
          },
          childIndex: parseChildIndex(item, props.children),
          item,
        });
      }
    });

    return formatedItems;
  };
  return ReactComponent;
};

export default generateCategoricalChart({
  chartName: 'BarChart',
  GraphicalChild: Bar,
  axisComponents: [
    { axisType: 'xAxis', AxisComp: XAxis },
    { axisType: 'yAxis', AxisComp: YAxis },
  ],
  formatAxisMap,
});
