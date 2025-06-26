import type { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { RadioCtx, RadioProps, RadioValueProps } from '@semcore/radio';
import type { Text } from '@semcore/typography';

export type RadioComponent = Intergalactic.Component<'label', RadioProps, RadioCtx> & {
  Value: Intergalactic.Component<'input', RadioValueProps>;
  Text: typeof Text;
  Addon: Intergalactic.Component<typeof Box, { animatedSparkleCount?: number }>;
};
