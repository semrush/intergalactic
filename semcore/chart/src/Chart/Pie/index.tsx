import copyChart from '../../copyChart';
import PieChartRecharts from './PieChart';
import Pie from './Pie';

/**
 * @deprecated use package `@semcore/d3-chart` instead
 */
const PieChart = copyChart(PieChartRecharts);

export { PieChart, Pie };

export * from './Pie';
