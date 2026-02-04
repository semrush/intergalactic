import { createBaseComponent, sstyled } from '@semcore/core';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import React from 'react';

import styles from './style/icon.shadow.css';

export type IconProps = React.SVGProps<SVGSVGElement> & {
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
};

function Icon({
  width = 16,
  height = 16,
  viewBox = '0 0 16 16',
  color: colorProps,
  ...props
}: IconProps, ref: React.ForwardedRef<SVGSVGElement>) {
  const SIcon = 'svg';

  const resolveColor = useColorResolver();
  const color = resolveColor(colorProps);

  const sstyles = sstyled(styles);
  const { className, style } = sstyles.cn('SIcon', {
    'use:color': color,
  });

  return (
    <SIcon
      width={width}
      height={height}
      viewBox={viewBox}
      aria-hidden='true'
      {...propsForElement(props)}
      style={Object.assign({}, style, props.style)}
      className={`${className} ${props.className ?? ''}`}
      ref={ref}
    />
  );
}

export default createBaseComponent<'svg', IconProps>(Icon);
