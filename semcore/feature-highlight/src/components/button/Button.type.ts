import type { NSButton } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';

export type HighlightedButtonDefaultProps = {
  theme: 'highlighted';
};

export type HighLightedButtonAddonProps = NSButton.Addon.Props & {
  animatedSparkleCount?: number;
};

export type HighlightedButtonComponent = NSButton.Component & {
  Addon: Intergalactic.Component<'div', HighLightedButtonAddonProps>;
};
