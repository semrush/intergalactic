import { ScatterChart as ScatterChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const ScatterChart = copyChart(ScatterChartRecharts);

export { ScatterChart };
