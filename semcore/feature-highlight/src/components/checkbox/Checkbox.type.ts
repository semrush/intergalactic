import type {
  CheckboxContext,
  CheckboxProps,
  CheckboxTextProps,
  CheckboxValueProps,
} from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';

import type { AnimatedSparklesProps } from '../../inner-components/sparkle/AnimatedSparkles';

export type HighlightedCheckboxComponent = Intergalactic.Component<'label', CheckboxProps, CheckboxContext> & {
  Text: Intergalactic.Component<'span', CheckboxTextProps>;
  Value: Intergalactic.Component<'input', CheckboxValueProps>;
  AnimatedSparkles: Intergalactic.Component<'div', AnimatedSparklesProps>;
};
