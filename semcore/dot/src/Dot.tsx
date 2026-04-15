import { Animation, Box, Portal } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import logger from '@semcore/core/lib/utils/logger';
import { contextThemeEnhance } from '@semcore/core/lib/utils/ThemeProvider';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import React from 'react';

import type { DotComponent, DotProps } from './Dot.type';
import style from './style/dot.shadow.css';

class DotRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<DotComponent>,
  typeof DotRoot.enhance
> {
  static displayName = 'Dot';
  static style = style;
  static defaultProps = {
    size: 'm',
    keyframes: [style['@enter'], style['@exit']],
  };

  static enhance = [
    uniqueIDEnhancement(),
    cssVariableEnhance({
      variable: '--intergalactic-duration-counter',
      fallback: '200',
      map: (value: string) => `${Number.parseInt(value)}`,
      prop: 'duration',
    }),
    contextThemeEnhance(({ hidden }: DotProps) => !hidden),
  ] as const;

  ref = React.createRef();

  render() {
    const SDot = Root;
    const SA11yAlert = Box;

    const {
      Children,
      styles,
      hidden,
      duration,
      keyframes,
      uid,
      size,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    } = this.asProps;

    const hasChildren = React.Children.toArray(getOriginChildren(Children)).length !== 0;

    const hasLabel = Boolean(ariaLabel || ariaLabelledBy);

    logger.warn(
      !hasLabel,
      '\'aria-label\' or \'aria-labelledby\' are required for Dot component',
      this.asProps['data-ui-name'] || Dot.displayName,
    );

    return sstyled(styles)(
      <SDot
        render={Animation}
        tag='span'
        visible={!hidden}
        duration={duration}
        keyframes={keyframes}
        id={`igc-${uid}-dot`}
        hasChildren={hasChildren}
      >
        <Children />
        {!hidden && (
          <Portal>
            <SA11yAlert
              role={hasLabel && !hidden ? 'alert' : undefined}
              aria-live={hasLabel && !hidden ? 'polite' : undefined}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
            >
              <Children />
            </SA11yAlert>
          </Portal>
        )}
      </SDot>,
    );
  }
}

const Dot = createComponent(DotRoot) as DotComponent;

export default Dot;
