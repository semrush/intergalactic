import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { neighborLocationEnhance } from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';
import reactToText from '@semcore/utils/lib/reactToText';
import SpinButton from './SpinButton';

import style from './style/button.shadow.css';

export const MAP_USE_DEFAULT_THEME = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

class RootButton extends Component {
  static displayName = 'Button';
  static enhance = [keyboardFocusEnhance(), neighborLocationEnhance()];
  static style = style;
  static defaultProps = {
    use: 'secondary',
    size: 'm',
  };

  getTextProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  getAddonProps() {
    const { size } = this.asProps;
    return {
      size,
    };
  }

  render() {
    const SButton = Root;
    const SInner = Box;
    const SSpin = Box;
    const {
      Children,
      styles,
      use,
      theme = typeof use === 'string' && MAP_USE_DEFAULT_THEME[use],
      loading,
      disabled = loading,
      size,
      addonLeft,
      addonRight,
      'aria-label': ariaLabel,
    } = this.asProps;

    const useTheme = use && theme ? `${use}-${theme}` : false;

    const isTextInside = reactToText(Children);

    logger.warn(
      !isTextInside && !ariaLabel,
      'aria-label is required',
      this.asProps['data-ui-name'] || Button.displayName,
    );

    return sstyled(styles)(
      <SButton
        render={Box}
        type="button"
        tag="button"
        disabled={disabled}
        use:theme={useTheme}
        role="button"
      >
        <SInner tag="span" loading={loading}>
          {addonLeft ? <Button.Addon tag={addonLeft} /> : null}
          {addonTextChildren(Children, Button.Text, Button.Addon)}
          {addonRight ? <Button.Addon tag={addonRight} /> : null}
        </SInner>
        {loading && (
          <SSpin tag="span">
            <SpinButton centered size={size} theme={useTheme} />
          </SSpin>
        )}
      </SButton>,
    );
  }
}

function Text(props) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag="span" />);
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag="span" />);
}

const Button = createComponent(RootButton, {
  Text,
  Addon,
});

export default Button;
