import type { Intergalactic } from '@semcore/core';
import { sstyled } from '@semcore/core';
import { getAutoOrScaleIndent, removeUndefinedKeys, getSize } from '@semcore/core/lib/utils/indentStyles';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import cn from 'classnames';
import type { Properties } from 'csstype';
import React from 'react';

import type { NSBox } from './Box.type';
import style from '../style/use-box.shadow.css';

function calculateIndentStyles(props: Intergalactic.InternalTypings.InferComponentProps<NSBox.Component>, scaleIndent: number, colorResolver: (color: string) => string) {
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
    inset: props.inset,
    flex: props.flex,
    zIndex: props.zIndex,
    textAlign: props.textAlign,

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

    border: props.border,
    resize: props.resize,
    overflow: props.overflow,
    borderRadius: props.borderRadius ? colorResolver(props.borderRadius) : undefined,
    backgroundColor: props.bg ? colorResolver(props.bg) : undefined,
  });
}

export default function useBox<T extends Intergalactic.InternalTypings.InferComponentProps<NSBox.Component> & { tag?: Intergalactic.Tag }>(
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
    invertOutline,
    inAfterOutline,
    bg,
    border,
    borderRadius,
    resize,
    flex,
    overflow,
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
    inset,
    zIndex,
    hoverCursor,
    focusRingTopOffset,
    focusRingRightOffset,
    focusRingBottomOffset,
    focusRingLeftOffset,
    ...other
  } = props;

  const colorResolver = useColorResolver();
  const indentStyles: Properties = React.useMemo(() => {
    return calculateIndentStyles(props, scaleIndent, colorResolver);
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
    inset,
    zIndex,
    border,
    borderRadius,
    bg,
    resize,
    overflow,
  ]);

  const styles = sstyled(style);
  const { className: rootClassName, style: rootStyle } = styles.cn('SBox', {
    SBoxSizing: boxSizing,
    SBoxInline: inline,
    SBoxInnerOutline: innerOutline,
    inAfterOutline: inAfterOutline === true ? 'true' : 'false',
    invertOutline,
    hoverCursor,
    focusRingTopOffset,
    focusRingRightOffset,
    focusRingBottomOffset,
    focusRingLeftOffset,
  });

  if (Tag === React.Fragment) return [React.Fragment, { children: props.children }];

  return [
    Tag,
    {
      ref,
      'className':
        cn(
          rootClassName,
          className,
        ) || undefined,
      'style': Object.assign({}, rootStyle, styleProp, css, indentStyles),
      'data-ui-name': 'Box',
      ...propsForElement(other, Tag),
    },
  ];
}
