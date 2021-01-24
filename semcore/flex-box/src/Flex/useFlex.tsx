import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import {
  AlignContentProperty,
  AlignItemsProperty,
  JustifyContentProperty,
  Properties,
} from 'csstype';
import { styled } from '@semcore/core';
import useBox, { IBoxProps, removeUndefinedKeys } from '../Box/useBox';

import style from '../style/use-flex.shadow.css';

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
  direction?: 'row' | 'column';
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
}

function calculateFlexStyles(props) {
  return removeUndefinedKeys({
    alignItems: props.alignItems,
    alignContent: props.alignContent,
    justifyContent: props.justifyContent,
    flexWrap: props.flexWrap ? `wrap${props.reverse ? '-reverse' : ''}` : undefined,
    flexDirection: props.reverse ? `${props.direction || 'row'}-reverse` : props.direction,
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
  const { inline, flexWrap, direction, reverse, alignItems, alignContent, justifyContent } = props;

  const flexStyles: Properties = useMemo(() => {
    return calculateFlexStyles(props);
  }, [flexWrap, direction, reverse, alignItems, alignContent, justifyContent]);

  const { styles } = styled(style);

  return [
    Tag,
    {
      className: cn(
        {
          [styles['flex']]: !inline,
          [styles['flex-inline']]: inline,
        },
        className,
      ),
      style: Object.assign({}, styleProp, flexStyles),
      ...other,
    },
  ];
}
