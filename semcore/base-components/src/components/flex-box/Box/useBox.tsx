import React from 'react';

import cn from 'classnames';
import { Properties, Property } from 'csstype';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import logger from '@semcore/core/lib/utils/logger';
import { sstyled, UnknownProperties, StyledProps } from '@semcore/core';

import style from '../style/use-box.shadow.css';
import { getAutoOrScaleIndent } from '../utils';

export function removeUndefinedKeys<T extends {}>(obj: T) {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

function getSize(size: any) {
  if (typeof size !== 'number') {
    return size;
  }
  if (size < 1) {
    return `${100 * size}%`;
  }
  if (size >= 1) {
    return `${size}px`;
  }
}

export type BoxProps = StyledProps & {
  /**
   * CSS `display` property
   */
  display?: Property.Display;

  /** Sets the `inline-block` property */
  inline?: boolean;

  /** CSS `box-sizing: border-box` property */
  boxSizing?: boolean | 'border-box';

  /** CSS `flex` property */
  flex?: Property.Flex<string>;

  /** CSS `margin` property */
  m?: number | string;

  /** CSS `margin-top` property */
  mt?: number | string;

  /** CSS `margin-right` property */
  mr?: number | string;

  /** CSS `margin-bottom` property */
  mb?: number | string;

  /** CSS `margin-left` property */
  ml?: number | string;

  /** CSS `margin-left` and `margin-right` property */
  mx?: number | string;

  /** CSS `margin-top` and `margin-bottom` property */
  my?: number | string;

  /** CSS `padding` property */
  p?: number | string;

  /** CSS `padding-top` property */
  pt?: number | string;

  /** CSS `padding-right` property */
  pr?: number | string;

  /** CSS `padding-bottom` property */
  pb?: number | string;

  /** CSS `padding-left` property */
  pl?: number | string;

  /** CSS `padding-left` and `padding-right` property */
  px?: number | string;

  /** CSS `padding-top` and `padding-bottom` property */
  py?: number | string;

  /**
   * CSS `width` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  w?: number | string;

  /**
   * CSS `min-width` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  wMin?: number | string;

  /**
   * CSS `max-width` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  wMax?: number | string;

  /**
   * CSS `height` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  h?: number | string;

  /**
   * CSS `min-height` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  hMin?: number | string;

  /**
   * CSS `max-height` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  hMax?: number | string;

  /**
   * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
   * @default 4
   */
  scaleIndent?: number;

  /**
   * Flag for render outline inside box
   * @default false
   */
  innerOutline?: boolean;

  /** Property for specifying css properties in js
   * @deprecated v4.0.0 */
  css?: React.CSSProperties;

  /** CSS `position` property */
  position?: Property.Position;
  /** CSS `top` property */
  top?: number | string;
  /** CSS `left` property */
  left?: number | string;
  /** CSS `bottom` property */
  bottom?: number | string;
  /** CSS `right` property */
  right?: number | string;

  zIndex?: number;

  children?: React.ReactNode;
};

/** @deprecated */
export interface IBoxProps extends BoxProps, UnknownProperties {
  /**
   *  HTML tag name for the displayed item
   * @default div
   */
  tag?: React.ElementType | string;
}

function calculateIndentStyles(props: BoxProps, scaleIndent: number) {
  return removeUndefinedKeys({
    display: props['display'],
    width: getSize(props['w']),
    height: getSize(props['h']),
    minWidth: getSize(props['wMin']),
    maxWidth: getSize(props['wMax']),
    minHeight: getSize(props['hMin']),
    maxHeight: getSize(props['hMax']),
    position: props['position'],
    top: getSize(props['top']),
    left: getSize(props['left']),
    bottom: getSize(props['bottom']),
    right: getSize(props['right']),
    flex: props.flex,
    zIndex: props.zIndex,

    margin: getAutoOrScaleIndent(props['m'], scaleIndent),
    marginTop:
      getAutoOrScaleIndent(props['mt'], scaleIndent) ||
      getAutoOrScaleIndent(props['my'], scaleIndent),
    marginBottom:
      getAutoOrScaleIndent(props['mb'], scaleIndent) ||
      getAutoOrScaleIndent(props['my'], scaleIndent),
    marginLeft:
      getAutoOrScaleIndent(props['ml'], scaleIndent) ||
      getAutoOrScaleIndent(props['mx'], scaleIndent),
    marginRight:
      getAutoOrScaleIndent(props['mr'], scaleIndent) ||
      getAutoOrScaleIndent(props['mx'], scaleIndent),

    padding: getAutoOrScaleIndent(props['p'], scaleIndent),
    paddingTop:
      getAutoOrScaleIndent(props['pt'], scaleIndent) ||
      getAutoOrScaleIndent(props['py'], scaleIndent),
    paddingBottom:
      getAutoOrScaleIndent(props['pb'], scaleIndent) ||
      getAutoOrScaleIndent(props['py'], scaleIndent),
    paddingLeft:
      getAutoOrScaleIndent(props['pl'], scaleIndent) ||
      getAutoOrScaleIndent(props['px'], scaleIndent),
    paddingRight:
      getAutoOrScaleIndent(props['pr'], scaleIndent) ||
      getAutoOrScaleIndent(props['px'], scaleIndent),
  });
}

export default function useBox<T extends BoxProps>(
  props: T,
  ref: React.Ref<HTMLElement>,
): [React.ElementType | string, any] {
  const {
    tag: Tag = 'div',
    className,
    style: styleProp,
    scaleIndent = 4,
    display,
    boxSizing,
    inline,
    innerOutline,
    flex,
    w,
    h,
    wMin,
    wMax,
    hMin,
    hMax,
    m,
    mt,
    mb,
    my,
    ml,
    mr,
    mx,
    p,
    pt,
    pb,
    py,
    pl,
    pr,
    px,
    css,
    position,
    top,
    left,
    bottom,
    right,
    zIndex,
    ...other
  } = props as any;

  const indentStyles: Properties = React.useMemo(() => {
    return calculateIndentStyles(props, scaleIndent);
  }, [
    scaleIndent,
    display,
    w,
    h,
    wMin,
    wMax,
    hMin,
    hMax,
    flex,
    m,
    mt,
    mb,
    my,
    ml,
    mr,
    mx,
    p,
    pt,
    pb,
    py,
    pl,
    pr,
    px,
    position,
    top,
    left,
    bottom,
    right,
    zIndex,
  ]);

  logger.warn(
    css !== undefined,
    "The 'css' property is deprecated, use 'style'",
    other['data-ui-name'] || 'Box',
  );

  const styles = sstyled(style);

  if (Tag === React.Fragment) return [React.Fragment, { children: props.children }];

  return [
    Tag,
    {
      ref,
      className:
        cn(
          styles.cn('SBox', {
            SBoxSizing: boxSizing,
            SBoxInline: inline,
            SBoxInnerOutline: innerOutline,
          }).className,
          className,
        ) || undefined,
      style: Object.assign({}, styleProp, css, indentStyles),
      'data-ui-name': 'Box',
      ...propsForElement(other, Tag),
    },
  ];
}
