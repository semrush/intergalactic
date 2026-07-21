import type { ButtonTriggerProps } from '@semcore/base-trigger';
import type BaseTrigger from '@semcore/base-trigger';
import type { Intergalactic } from '@semcore/core';

declare namespace NSButtonTriggerFH {
  type Props = ButtonTriggerProps;

  namespace Text {
    type Component = typeof BaseTrigger.Text;
  }

  namespace Addon {
    type Component = typeof BaseTrigger.Addon;
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Text: Text.Component;
    Addon: Addon.Component;
  };
}

export type { NSButtonTriggerFH };
