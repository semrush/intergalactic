import type { ButtonAddonProps, ButtonComponent, ButtonProps } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

export type HighlightedButtonProps = Omit<ButtonProps, 'theme'> & {
  theme?: ButtonProps['theme'] | 'highlighted';
};

export type HighlightedButtonDefaultProps = {
  theme: 'highlighted';
};

export type HighLightedButtonAddonProps = ButtonAddonProps & {
  animatedSparkleCount?: number;
};

// TODO: looks like the `HighlightedButtonComponent` should be constructed considering `HighlightedButtonProps`...
export type HighlightedButtonComponent = ButtonComponent & {
  Addon: Intergalactic.Component<'div', HighLightedButtonAddonProps>;
};
