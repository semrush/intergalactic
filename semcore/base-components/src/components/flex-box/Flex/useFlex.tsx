import { sstyled } from '@semcore/core';
import type { Intergalactic } from '@semcore/core';
import { getAutoOrScaleIndent, removeUndefinedKeys } from '@semcore/core/lib/utils/indentStyles';
import cn from 'classnames';
import type { Properties } from 'csstype';
import React from 'react';

import type { NSFlex } from './Flex.type';
import useBox from '../Box/useBox';
import style from '../style/use-flex.shadow.css';

function calculateFlexStyles(props: Intergalactic.InternalTypings.InferComponentProps<NSFlex.Component>) {
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
    flexDirection: props.direction ? (props.reverse && DirectionReverse[props.direction]) || props.direction : undefined,
    rowGap: getAutoOrScaleIndent(props.rowGap || props.gap, scaleIndent),
    columnGap: getAutoOrScaleIndent(props.columnGap || props.gap, scaleIndent),
  });
}

export default function useFlex<T extends Intergalactic.InternalTypings.InferComponentProps<NSFlex.Component>>(
  props: T,
  ref: React.Ref<HTMLElement>,
): [React.ElementType | string, any] {
  const [Tag, { className, style: styleProp, ...other }] = useBox(
    {
      'data-ui-name': 'Flex',
      ...props,
      'inline': false,
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
