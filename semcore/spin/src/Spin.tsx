import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { NSSpin } from './Spin.type';
import style from './style/spin.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class RootSpin extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSSpin.Component>,
  typeof RootSpin.enhance,
  {},
  {},
  {},
  NSSpin.DefaultProps
> {
  static displayName = 'Spin';
  static style = style;
  static enhance = [resolveColorEnhance(), i18nEnhance(localizedMessages)] as const;
  static defaultProps = (props: Intergalactic.InternalTypings.InferComponentProps<NSSpin.Component>) => {
    return {
      size: 'm',
      theme: props.invert ? undefined : 'dark',
    } as const;
  };

  render() {
    const SSpin = Root;
    const SCircle = 'circle';
    const { Children, styles, theme, resolveColor, getI18nText } = this.asProps;
    return sstyled(styles)(
      <SSpin
        render={Box}
        tag='svg'
        viewBox='0 0 100 100'
        use:theme={resolveColor(theme)}
        role='img'
        aria-label={getI18nText('loading')}
      >
        <SCircle
          cx='50'
          cy='50'
          r='46'
          fill='none'
          strokeLinecap='round'
        />
        <Children />
      </SSpin>,
    );
  }
}

/**
 * Spin
 *
 * {@link https://developer.semrush.com/intergalactic/components/spin/spin-api/|API} | {@link https://developer.semrush.com/intergalactic/components/spin/spin-code/|Examples}
 */
const Spin = createComponent<
  NSSpin.Component,
  typeof RootSpin
>(RootSpin);

export default Spin;
