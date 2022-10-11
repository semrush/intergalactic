import { AreaChart as AreaChartRecharts } from 'recharts';
import Area from './Area';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const AreaChart = copyChart(AreaChartRecharts);

export { AreaChart, Area };
