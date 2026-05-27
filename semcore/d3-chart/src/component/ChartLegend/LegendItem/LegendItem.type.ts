import type { Box, Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Icon from '@semcore/icon';
import type { Text } from '@semcore/typography';

import type { PatternsConfig } from '../../../Pattern';
import type { LSize } from '../BaseLegend.type';

/**
 * Key of chart data item
 */
export type LegendItemKey = string;

export type LegendItem = {
  /**
   * One of keys from data set
   */
  id: LegendItemKey;
  /**
   * Label for data item in Legend
   */
  label: string;
  /**
   * Flag for selected data item
   */
  checked: boolean;
  /**
   * Color of data item
   */
  color: string;
  /**
   * Icon before label
   */
  icon?: typeof Icon;
  /**
   * Additional info with sub-label or count
   */
  additionalInfo?: { label: string } | { count: number };

  patternKey?: string;

  /** Enables patterns symbols that enhances charts accessibility */
  patterns?: PatternsConfig;
};

export type LegendItemProps = LegendItem & {
  /**
   * Size for legend item
   */
  size: LSize;
  /**
   * Shape of data item on Legend panel
   */
  shape: ShapeType;
  /**
   * Handler for select/deselect legend item.
   * !Need to redefine onClick, because we don't have `event` in it.
   * @deprecated
   */
  onClick?: () => void;

  /** Enables patterns symbols that enhances charts accessibility */
  patterns?: PatternsConfig;

  /**
   * Handler for select/deselect legend item
   */
  onChangeLegendItem: (id: LegendItemKey, checked: boolean) => void;

  /**
   * Handler for focus legend item
   */
  onFocusLegendItem: (id: LegendItemKey) => void;

  /**
   * Handler for focus out legend item
   */
  onBlurLegendItem: (id: LegendItemKey) => void;
};

export type LegendItemDefaultProps = {
  children: React.JSX.Element;
};

export type ShapeProps = LegendItem &
  (
    | {
      size: LSize;
      shape: Exclude<ShapeType, 'Checkbox'>;
    }
    | {
      'size': LSize;
      'shape': Extract<ShapeType, 'Checkbox'>;
      'onChange': (checked: boolean, e?: React.SyntheticEvent<HTMLInputElement>) => void;
      'aria-labelledby'?: string;
    }
  );

export const StaticShapes = ['Circle', 'Line', 'Square', 'Pattern'] as const;

export type ShapeType = 'Checkbox' | typeof StaticShapes[number];

export type LegendItemShapeType = Intergalactic.Component<typeof Box, Partial<ShapeProps>>;
export type LegendItemIconType = Intergalactic.Component<typeof Icon, Partial<LegendItem>>; ;
export type LegendItemLabelType = Intergalactic.Component<typeof Text, Partial<Omit<LegendItem, 'theme'>>>; ;
export type LegendItemAdditionalLabelType = Intergalactic.Component<typeof Text, Partial<LegendItem>>; ;
export type LegendItemCountType = Intergalactic.Component<typeof Text, Partial<LegendItem>>; ;

export type LegendItemType = Intergalactic.Component<typeof Flex, Partial<LegendItemProps>> & {
  Shape: LegendItemShapeType;
  Icon: LegendItemIconType;
  Label: LegendItemLabelType;
  AdditionalLabel: LegendItemAdditionalLabelType;
  Count: LegendItemCountType;
};
