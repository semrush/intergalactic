import { LineChart as LineChartRecharts } from 'recharts';
import Line from './Line';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const LineChart = copyChart(LineChartRecharts);

export { LineChart, Line };
