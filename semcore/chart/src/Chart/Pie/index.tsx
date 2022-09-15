import copyChart from '../../copyChart';
import PieChartRecharts from './PieChart';
import Pie from './Pie';

/**
 * @deprecated Please, use package `@semcore/d3-chart` instead. Package `@semcore/chart` will be removed in the next major release
 */
const PieChart = copyChart(PieChartRecharts);

export { PieChart, Pie };

export * from './Pie';
