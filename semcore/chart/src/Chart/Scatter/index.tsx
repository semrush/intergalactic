import { ScatterChart as ScatterChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const ScatterChart = copyChart(ScatterChartRecharts);

export { ScatterChart };
