import { ComposedChart as ComposedChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const ComposedChart = copyChart(ComposedChartRecharts);

export { ComposedChart };
