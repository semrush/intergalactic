import type Input from '@semcore/input';

declare namespace NSInputFH {
  namespace Addon {
    type Component = typeof Input.Addon;
  }

  type Component = typeof Input;
}

export type { NSInputFH };
