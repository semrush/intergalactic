import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import { removeUndefinedKeys, getAutoOrScaleIndent } from '@semcore/core/lib/utils/indentStyles';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import React from 'react';

import styles from './style/icon.shadow.css';

export type IconProps = {
  /**
   * Icon width
   * @internal
   */
  width?: string | number;
  /**
   * Icon height
   * @internal
   */
  height?: string | number;
  /**
   * SVG viewBox attribute
   * @internal
   */
  viewBox?: string;
  /** Icon color */
  color?: string;

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

  /**
   * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
   * @default 4
   */
  scaleIndent?: number;
};

function calculateIndentStyles(props: IconProps, scaleIndent: number) {
  return removeUndefinedKeys({
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
  });
}

function Icon({
  width = 16,
  height = 16,
  viewBox = '0 0 16 16',
  color: colorProps,
  scaleIndent = 4,
  m,
  mt,
  mb,
  my,
  ml,
  mr,
  mx,
  ...props
}: React.SVGProps<SVGSVGElement> & IconProps, ref: React.Ref<SVGSVGElement>) {
  const SIcon = 'svg';

  const resolveColor = useColorResolver();
  const color = resolveColor(colorProps);

  const sstyles = sstyled(styles);
  const { className, style } = sstyles.cn('SIcon', {
    'use:color': color,
  });

  const indentStyles: React.CSSProperties = React.useMemo(() => {
    return calculateIndentStyles({ m, mt, mb, my, ml, mr, mx }, scaleIndent);
  }, [
    scaleIndent,
    m,
    mt,
    mb,
    my,
    ml,
    mr,
    mx,
  ]);

  return (
    <SIcon
      width={width}
      height={height}
      viewBox={viewBox}
      aria-hidden='true'
      {...propsForElement(props)}
      style={Object.assign({}, style, props.style, indentStyles)}
      className={`${className} ${props.className ?? ''}`}
      ref={ref}
    />
  );
}

export type IconComponent = Intergalactic.Component<'svg', IconProps>;

export default createBaseComponent<IconComponent>(Icon, { isIcon: true });
