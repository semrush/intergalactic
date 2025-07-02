import type { ButtonTriggerProps } from '@semcore/base-trigger';
import type BaseTrigger from '@semcore/base-trigger';
import type { Intergalactic } from '@semcore/core';

export type HighlightedButtonTriggerComponent = Intergalactic.Component<'div', ButtonTriggerProps> & {
  Text: typeof BaseTrigger.Text;
  Addon: typeof BaseTrigger.Addon;
};
