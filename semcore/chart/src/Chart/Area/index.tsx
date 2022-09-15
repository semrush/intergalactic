import { AreaChart as AreaChartRecharts } from 'recharts';
import Area from './Area';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const AreaChart = copyChart(AreaChartRecharts);

export { AreaChart, Area };
