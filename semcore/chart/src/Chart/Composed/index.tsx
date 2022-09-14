import { ComposedChart as ComposedChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated use package `@semcore/d3-chart` instead
 */
const ComposedChart = copyChart(ComposedChartRecharts);

export { ComposedChart };
