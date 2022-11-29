import copyChart from '../../copyChart';
import HistogramChartRecharts from './HistogramChart';

HistogramChartRecharts.defaultProps.barGap = 2;

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const HistogramChart = copyChart(HistogramChartRecharts);

export { HistogramChart };
