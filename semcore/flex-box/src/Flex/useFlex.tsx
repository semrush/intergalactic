import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import {
  AlignContentProperty,
  AlignItemsProperty,
  JustifyContentProperty,
  Properties,
  FlexDirectionProperty,
  GapProperty,
  RowGapProperty,
  ColumnGapProperty,
} from 'csstype';
import { sstyled } from '@semcore/core';
import useBox, { IBoxProps, removeUndefinedKeys } from '../Box/useBox';

import style from '../style/use-flex.shadow.css';
import { getAutoOrScaleIndent } from '../utils';

export interface IFlexProps extends IBoxProps {
  /**
   * It manages the `inline-flex` property
   */
  inline?: boolean;
  /**
   * Adds the `reverse` property to `flex-direction`
   */
  reverse?: boolean;
  /**
   * It manages the `flex-wrap` property
   */
  flexWrap?: boolean;
  /**
   * It manages the `flex-direction` property
   */
  direction?: FlexDirectionProperty;
  /**
   * It manages the `align-items` property
   */
  alignItems?: AlignItemsProperty;
  /**
   * It manages the `align-content` property
   */
  alignContent?: AlignContentProperty;
  /**
   * CSS `justify-content` property
   */
  justifyContent?: JustifyContentProperty;
  /**
   * CSS `gap` property
   */
  gap?: GapProperty<number>;
  /**
   * CSS `gap` property
   */
  rowGap?: RowGapProperty<number>;
  /**
   * CSS `gap` property
   */
  columnGap?: ColumnGapProperty<number>;

  /**
   * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
   * @default 4
   */
  scaleIndent?: number;
}

function calculateFlexStyles(props) {
  const DirectionReverse = {
    row: 'row-reverse',
    column: 'column-reverse',
  };

  const scaleIndent = props.scaleIndent ?? 4;

  return removeUndefinedKeys({
    alignItems: props.alignItems,
    alignContent: props.alignContent,
    justifyContent: props.justifyContent,
    flexWrap: props.flexWrap ? `wrap${props.reverse ? '-reverse' : ''}` : undefined,
    flexDirection: (props.reverse && DirectionReverse[props.direction]) || props.direction,
    rowGap: getAutoOrScaleIndent(props.rowGap || props.gap, scaleIndent),
    columnGap: getAutoOrScaleIndent(props.columnGap || props.gap, scaleIndent),
  });
}

export default function useFlex<T extends IFlexProps>(
  props: T,
  ref,
): [React.ElementType | string, any] {
  const [Tag, { className, style: styleProp, ...other }] = useBox(
    {
      'data-ui-name': 'Flex',
      ...props,
      // inline есть в боксе
      inline: false,
    },
    ref,
  );
  const {
    inline,
    flexWrap,
    direction,
    reverse,
    alignItems,
    alignContent,
    justifyContent,
    gap,
    rowGap,
    columnGap,
    scaleIndent,
  } = props;

  const flexStyles: Properties = useMemo(() => {
    return calculateFlexStyles(props);
  }, [
    flexWrap,
    direction,
    reverse,
    alignItems,
    alignContent,
    justifyContent,
    gap,
    rowGap,
    columnGap,
    scaleIndent,
  ]);

  const styles = sstyled(style);

  return [
    Tag,
    {
      className:
        cn(
          styles.cn('SFlex', {
            inline: inline,
          }).className,
          className,
        ) || undefined,
      style: Object.assign({}, styleProp, flexStyles),
      ...other,
    },
  ];
}
