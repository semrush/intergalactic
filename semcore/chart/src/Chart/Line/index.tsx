import { LineChart as LineChartRecharts } from 'recharts';
import Line from './Line';
import copyChart from '../../copyChart';

const LineChart = copyChart(LineChartRecharts);

export { LineChart, Line };
