import WidgetEmpty from '@semcore/ui/widget-empty';
import type { NSWidgetEmpty } from '@semcore/ui/widget-empty';
import React from 'react';

export type CustomIconSizeProps = NSWidgetEmpty.Props & {
  iconWidth?: number;
  iconHeight?: number;
};

const CustomIcon = ({ width, height }: { width: number; height: number }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      width={width}
      height={height}
      rx='8'
      fill='var(--intergalactic-bg-primary-neutral, #f4f5f9)'
    />
    <path
      d={`M16 ${height - 16}L${width * 0.4} ${height * 0.45}L${width * 0.6} ${
        height * 0.62
      }L${width - 16} 16`}
      stroke='var(--intergalactic-icon-primary-info, #008ff8)'
      strokeWidth='6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle
      cx={width * 0.7}
      cy={height * 0.32}
      r='10'
      fill='var(--intergalactic-icon-primary-success, #00bc98)'
    />
  </svg>
);

const Demo = ({ iconWidth = 128, iconHeight = 48, ...rest }: CustomIconSizeProps) => (
  <WidgetEmpty icon={<CustomIcon width={iconWidth} height={iconHeight} />} {...rest}>
    <WidgetEmpty.Title>Custom icon size</WidgetEmpty.Title>
    <WidgetEmpty.Description>
      The icon wrapper follows the custom illustration dimensions.
    </WidgetEmpty.Description>
  </WidgetEmpty>
);

export const defaultProps: CustomIconSizeProps = {
  iconWidth: 128,
  iconHeight: 48,
};

Demo.defaultProps = defaultProps;

export default Demo;
