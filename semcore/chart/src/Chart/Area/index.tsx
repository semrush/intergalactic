import { AreaChart as AreaChartRecharts } from 'recharts';
import Area from './Area';
import copyChart from '../../copyChart';

/**
 * @deprecated use package `@semcore/d3-chart` instead
 */
const AreaChart = copyChart(AreaChartRecharts);

export { AreaChart, Area };
