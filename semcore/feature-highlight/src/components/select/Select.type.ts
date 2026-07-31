import type Select from '@semcore/select';

declare namespace NSSelectFH {
  namespace Trigger {
    type Component = typeof Select.Trigger;
  }

  type Component = typeof Select & {
    Trigger: Trigger.Component;
  };
}

export type { NSSelectFH };
