import { Bar, BarChart as BarChartRecharts } from 'recharts';
import copyChart from '../../copyChart';
import { colors } from '../../utils/colors';

const BarChart = copyChart(BarChartRecharts);

// @ts-ignore
Bar.defaultProps.fill = colors['blue-01'];
// @ts-ignore
Bar.defaultProps.radius = [2, 2, 0, 0];
// @ts-ignore
Bar.defaultProps.minPointSize = 2;

export { Bar, BarChart };
