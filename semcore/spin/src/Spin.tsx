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

  get sizeAndStroke(): [number, number] {
    const { size } = this.asProps;

    switch (size) {
      case 'xs' : {
        return [16, 2];
      }
      case 's': {
        return [20, 2.5];
      }
      case 'm': {
        return [24, 3];
      }
      case 'l': {
        return [32, 3.5];
      }
      case 'xl': {
        return [48, 4];
      }
      case 'xxl': {
        return [72, 5];
      }
      default: {
        const s: never = size;
        throw new Error(`Handle size "${s}"`);
      }
    }
  }

  render() {
    const SSpin = Root;
    const SCircle = 'circle';
    const { Children, styles, theme, resolveColor, getI18nText } = this.asProps;
    const [sizeNumber, strokeWidth] = this.sizeAndStroke;
    const radius = (sizeNumber - strokeWidth) / 2;
    return sstyled(styles)(
      <SSpin
        render={Box}
        tag='svg'
        width={sizeNumber}
        height={sizeNumber}
        use:theme={resolveColor(theme)}
        role='img'
        aria-label={getI18nText('loading')}
      >
        <SCircle
          cx={sizeNumber / 2}
          cy={sizeNumber / 2}
          r={radius}
          fill='none'
          strokeWidth={strokeWidth}
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
