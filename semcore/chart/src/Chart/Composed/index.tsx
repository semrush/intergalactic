import { ComposedChart as ComposedChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const ComposedChart = copyChart(ComposedChartRecharts);

export { ComposedChart };
