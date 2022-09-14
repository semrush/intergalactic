import { LineChart as LineChartRecharts } from 'recharts';
import Line from './Line';
import copyChart from '../../copyChart';

/**
 * @deprecated use package `@semcore/d3-chart` instead
 */
const LineChart = copyChart(LineChartRecharts);

export { LineChart, Line };
