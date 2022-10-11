import { RadarChart as RadarChartRecharts } from 'recharts';
import copyChart from '../../copyChart';

/**
 * @deprecated Please, use package `@semcore/ui/d3-chart` instead. Package `@semcore/chart` is deprecated.
 */
const RadarChart = copyChart(RadarChartRecharts);

export { RadarChart };
