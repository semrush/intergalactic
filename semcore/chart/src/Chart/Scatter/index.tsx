import { ScatterChart as ScatterChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated use package `@semcore/d3-chart` instead
 */
const ScatterChart = copyChart(ScatterChartRecharts);

export { ScatterChart };
