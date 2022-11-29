import { LineChart as LineChartRecharts } from 'recharts';
import Line from './Line';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const LineChart = copyChart(LineChartRecharts);

export { LineChart, Line };
