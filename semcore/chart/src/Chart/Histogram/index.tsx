import copyChart from '../../copyChart';
import HistogramChartRecharts from './HistogramChart';

HistogramChartRecharts.defaultProps.barGap = 2;

const HistogramChart = copyChart(HistogramChartRecharts);

export { HistogramChart };
