import { BoxProps } from '@semcore/flex-box';
import { LegendItem, LegendItemKey, ShapeType } from './LegendItem/LegendItem.type';

export type LSize = 'm' | 'l';

export type BaseChartLegendProps = {
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
};

export type LegendProps = BoxProps &
  BaseChartLegendProps & {
    /**
     * Legend items
     */
    items: LegendItem[];
  };
