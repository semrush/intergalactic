import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box, InvalidStateBox } from '@semcore/flex-box';
import NeighborLocation from '@semcore/neighbor-location';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import logger from '@semcore/core/lib/utils/logger';
import animatedSizeEnhance from '@semcore/core/lib/utils/enhances/animatedSizeEnhance';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';

import style from './style/base-trigger.shadow.css';

class RootBaseTrigger extends Component {
  static displayName = 'BaseTrigger';
  static enhance = [
    cssVariableEnhance({
      variable: '--intergalactic-duration-control',
      fallback: '200',
      map: Number.parseInt,
      prop: 'duration',
    }),
    animatedSizeEnhance({
      animateProps: ['width'],
      onChangeOf: ['value'],
    }),
  ];
  static style = style;
  static defaultProps = {
    size: 'm',
    empty: false,
  };

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
    };
  }

  render() {
    const SBaseTrigger = Root;
    const SInner = 'span';
    const SInvalidPattern = InvalidStateBox;
    const { Children, styles, theme, neighborLocation, empty, state, size } = this.asProps;

    logger.warn(
      theme !== undefined,
      "The 'theme' property is deprecated, use 'state'",
      this.asProps['data-ui-name'] || BaseTrigger.displayName,
    );

    // TODO: add aria
    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SBaseTrigger
              render={Box}
              tag='button'
              type='button'
              tabIndex={0}
              neighborLocation={neighborLocation}
              state={theme}
            >
              {state === 'invalid' && <SInvalidPattern size={size} />}
              <SInner>
                {addonTextChildren(Children, BaseTrigger.Text, BaseTrigger.Addon, empty)}
              </SInner>
            </SBaseTrigger>,
          )
        }
      </NeighborLocation.Detect>
    );
  }
}

function Text(props) {
  const SText = Root;
  const { children, styles, empty, placeholder } = props;

  return sstyled(styles)(
    <SText render={Box} display-placeholder={empty} aria-hidden={empty}>
      {empty ? placeholder : children}
    </SText>,
  );
}

function Addon(props) {
  const SAddon = Root;
  const { styles } = props;
  return sstyled(styles)(<SAddon render={Box} />);
}

const BaseTrigger = createComponent(RootBaseTrigger, {
  Text,
  Addon,
});

export default BaseTrigger;
