import React from 'react';

import cn from 'classnames';
import { Property, Properties } from 'csstype';
import { sstyled } from '@semcore/core';
import useBox, { BoxProps, removeUndefinedKeys } from '../Box/useBox';

import style from '../style/use-flex.shadow.css';
import { getAutoOrScaleIndent } from '../utils';

export type FlexProps = BoxProps & {
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
  direction?: Property.FlexDirection;
  /**
   * It manages the `align-items` property
   */
  alignItems?: Property.AlignItems;
  /**
   * It manages the `align-content` property
   */
  alignContent?: Property.AlignContent;
  /**
   * CSS `justify-content` property
   */
  justifyContent?: Property.JustifyContent;
  /**
   * CSS `gap` property
   */
  gap?: Property.Gap<number>;
  /**
   * CSS `gap` property
   */
  rowGap?: Property.RowGap<number>;
  /**
   * CSS `gap` property
   */
  columnGap?: Property.ColumnGap<number>;

  /**
   * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
   * @default 4
   */
  scaleIndent?: number;
};

/** @deprecated */
export interface IFlexProps extends FlexProps {}

function calculateFlexStyles(props: any) {
  const DirectionReverse: Record<string, string> = {
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

export default function useFlex<T extends FlexProps>(
  props: T,
  ref: React.Ref<HTMLElement>,
): [React.ElementType | string, any] {
  const [Tag, { className, style: styleProp, ...other }] = useBox(
    {
      'data-ui-name': 'Flex',
      ...props,
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

  const flexStyles: Properties = React.useMemo(() => {
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

  if (Tag === React.Fragment) return [React.Fragment, { children: props.children }];

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
