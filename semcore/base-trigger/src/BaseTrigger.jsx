import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { NEIGHBOR_LOCATION_AUTO_DETECT } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';

import style from './style/base-trigger.shadow.css';

class RootBaseTrigger extends Component {
  static displayName = 'BaseTrigger';
  static enhance = [keyboardFocusEnhance()];
  static [NEIGHBOR_LOCATION_AUTO_DETECT] = true;
  static style = style;
  static defaultProps = {
    size: 'm',
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
    const SInner = 'div';
    const { Children, styles, theme } = this.asProps;

    logger.warn(
      theme !== undefined,
      "The 'theme' property is deprecated, use 'state'",
      this.asProps['data-ui-name'] || BaseTrigger.displayName,
    );

    // TODO: add aria
    return sstyled(styles)(
      <SBaseTrigger render={Box} state={theme}>
        <SInner>{addonTextChildren(Children, BaseTrigger.Text, BaseTrigger.Addon)}</SInner>
      </SBaseTrigger>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const { children, styles, empty, placeholder } = props;

  return sstyled(styles)(
    /* "use:" prefix was used for backward compatibility (by lsroman) */
    <SText render={Box} use:placeholder={empty}>
      {empty ? placeholder : children}
    </SText>,
  );
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />);
}

const BaseTrigger = createComponent(RootBaseTrigger, {
  Text,
  Addon,
});

export default BaseTrigger;
