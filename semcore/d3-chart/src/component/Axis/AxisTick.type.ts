import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

import type { NSAxis } from './Axis.type';

declare namespace NSAxisTick {

  type Props = NSBox.Props & {
    yAxisPosition: NSAxis.Props['yAxisPosition'];
    primaryText: NSAxis.Props['primaryText'];
  };

  type State = {
    isInteractive: boolean;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

export type {
  NSAxisTick,
};
