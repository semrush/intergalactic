import type { NSCheckbox } from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';

import type { AnimatedSparklesProps } from '../../inner-components/sparkle/AnimatedSparkles';

export type HighlightedCheckboxComponent = Intergalactic.Component<'label', NSCheckbox.Props, NSCheckbox.Ctx> & {
  Text: Intergalactic.Component<'span', NSCheckbox.Text.Props>;
  Value: Intergalactic.Component<'input', NSCheckbox.Value.Props>;
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
