import type { Box } from '@semcore/base-components';
import type {
  CheckboxContext,
  CheckboxProps,
  CheckboxTextProps,
  CheckboxValueProps,
} from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';

export type CheckboxComponent = Intergalactic.Component<'label', CheckboxProps, CheckboxContext> & {
  Text: Intergalactic.Component<'span', CheckboxTextProps>;
  Value: Intergalactic.Component<'input', CheckboxValueProps>;
  Addon: Intergalactic.Component<typeof Box, { animatedSparkleCount?: number }>;
};
