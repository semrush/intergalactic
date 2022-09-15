import { Treemap as TreeMapRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const Treemap = copyChart(TreeMapRecharts);

export { Treemap };
