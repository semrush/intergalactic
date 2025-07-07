import type { ButtonAddonProps, ButtonComponent } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

export type HighLightedButtonAddonProps = ButtonAddonProps & {
  animatedSparkleCount?: number;
};

export type HighlightedButtonComponent = ButtonComponent & {
  Addon: Intergalactic.Component<'div', HighLightedButtonAddonProps>;
};
