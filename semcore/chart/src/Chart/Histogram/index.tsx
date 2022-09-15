import copyChart from '../../copyChart';
import HistogramChartRecharts from './HistogramChart';

HistogramChartRecharts.defaultProps.barGap = 2;

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const HistogramChart = copyChart(HistogramChartRecharts);

export { HistogramChart };
