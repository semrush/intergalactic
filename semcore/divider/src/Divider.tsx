import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { NSDivider } from './Divider.type';
import style from './style/divider.shadow.css';

class DividerRoot extends Component<Intergalactic.InternalTypings.InferComponentProps<NSDivider.Component>, typeof DividerRoot.enhance> {
  static displayName = 'Divider';
  static style = style;
  static enhance = [resolveColorEnhance()] as const;
  static defaultProps = {
    use: 'primary',
    orientation: 'horizontal',
  };

  render() {
    const SDivider = Root;
    const { orientation, resolveColor, theme } = this.asProps;

    return sstyled(this.asProps.styles)(
      <SDivider
        render={Box}
        role='separator'
        aria-orientation={orientation}
        use:theme={resolveColor(theme)}
      />,
    );
  }
}

/**
 * Divider
 *
 * {@link https://developer.semrush.com/intergalactic/components/divider/divider-api/|API} | {@link https://developer.semrush.com/intergalactic/components/divider/divider-code/|Examples}
 */
const Divider = createComponent(DividerRoot) as NSDivider.Component;

export default Divider;
