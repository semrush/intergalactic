import type { ButtonAddonProps, ButtonComponent } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

export type ButtonAccentAddonProps = ButtonAddonProps & {
  animatedSparkleCount?: number;
};

export type ButtonAccentComponent = ButtonComponent & {
  AccentAddon: Intergalactic.Component<'div', ButtonAccentAddonProps>;
};
