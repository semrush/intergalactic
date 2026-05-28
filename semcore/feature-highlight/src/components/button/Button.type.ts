import type { ButtonAddonProps, ButtonComponent, ButtonProps } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

export type HighlightedButtonDefaultProps = {
  theme: 'highlighted';
};

export type HighLightedButtonAddonProps = ButtonAddonProps & {
  animatedSparkleCount?: number;
};

export type HighlightedButtonComponent = ButtonComponent & {
  Addon: Intergalactic.Component<'div', HighLightedButtonAddonProps>;
};
