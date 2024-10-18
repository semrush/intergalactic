import { BoxProps, FlexProps } from '@semcore/flex-box';
import { LegendItem, LegendItemKey, ShapeType } from './LegendItem/LegendItem.type';
import { DataStructureHints } from '../../a11y/hints';
import type { PatternsConfig } from '../../Pattern';
import { AriaNameProps } from '../Chart/AbstractChart.type';

export type LSize = 'm' | 'l';

export type BaseChartLegendProps = FlexProps &
  AriaNameProps & {
    /**
     * Size for legend items
     */
    size?: LSize;
    /**
     * Shape of data item on Legend panel
     */
    shape?: ShapeType;
    /**
     * Handler for change visible for data items. Doesn't work if Shape one of 'Circle' | 'Line' | 'Square'
     */
    onChangeVisibleItem?: (key: LegendItemKey, isVisible: boolean) => void;

    onMouseEnterItem?: (key: LegendItemKey, e?: React.SyntheticEvent) => void;

    onMouseLeaveItem?: (key: LegendItemKey, e?: React.SyntheticEvent) => void;

    dataHints?: DataStructureHints;
  };

export type LegendProps = BoxProps &
  BaseChartLegendProps & {
    /**
     * Legend items
     */
    items: LegendItem[];

    /** Enables charts patterns that enhances charts accessibility */
    patterns?: PatternsConfig;
  };
