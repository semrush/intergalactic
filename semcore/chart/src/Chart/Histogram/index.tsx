import copyChart from '../../copyChart';
import HistogramChartRecharts from './HistogramChart';

HistogramChartRecharts.defaultProps.barGap = 2;

/**
 * @deprecated use package `@semcore/d3-chart` instead
 */
const HistogramChart = copyChart(HistogramChartRecharts);

export { HistogramChart };
