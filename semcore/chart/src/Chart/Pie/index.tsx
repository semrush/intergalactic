import copyChart from '../../copyChart';
import PieChartRecharts from './PieChart';
import Pie from './Pie';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const PieChart = copyChart(PieChartRecharts);

export { PieChart, Pie };

export * from './Pie';
