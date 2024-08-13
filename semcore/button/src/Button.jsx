import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Hint } from '@semcore/tooltip';
import NeighborLocation from '@semcore/neighbor-location';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import logger from '@semcore/utils/lib/logger';
import SpinButton from './SpinButton';

import style from './style/button.shadow.css';
import hasLabels from '@semcore/utils/lib/hasLabels';

export const MAP_USE_DEFAULT_THEME = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

class RootButton extends Component {
  static displayName = 'Button';
  static enhance = [keyboardFocusEnhance()];
  static style = style;
  static defaultProps = {
    use: 'secondary',
    size: 'm',
  };
  containerRef = React.createRef();

  state = {
    ariaLabelledByContent: null,
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

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      logger.warn(
        this.containerRef.current && !hasLabels(this.containerRef.current) && !this.asProps.title,
        `'title' or 'aria-label' or 'aria-labelledby' are required props for buttons without text content`,
        this.asProps['data-ui-name'] || RootButton.displayName,
      );
    }

    if (this.asProps['aria-labelledby']) {
      setTimeout(() => {
        this.setState({
          ariaLabelledByContent:
            document.getElementById(this.asProps['aria-labelledby'])?.textContent ?? '',
        });
      }, 0);
    }
  }

  render() {
    const {
      styles,
      use,
      theme = typeof use === 'string' && MAP_USE_DEFAULT_THEME[use],
      loading,
      disabled = loading,
      size,
      neighborLocation,
      children: hasChildren,
      title,
      ['aria-label']: ariaLabel,
      Children,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      hintPlacement,
    } = this.asProps;
    const useTheme = use && theme ? `${use}-${theme}` : false;
    const SButton = Root;
    const SInner = hasChildren && !title ? Box : Hint;
    const SSpin = Box;
    const buttonAriaLabel = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';
    const hintProps =
      hasChildren && !title
        ? {}
        : {
            title: buttonAriaLabel,
            timeout: [250, 50],
            __excludeProps: ['aria-label'],
            placement: hintPlacement,
            theme: theme === 'invert' ? 'invert' : undefined,
          };

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) =>
          sstyled(styles)(
            <SButton
              render={Box}
              type='button'
              tag='button'
              disabled={disabled}
              neighborLocation={neighborLocation}
              use:theme={useTheme}
              ref={this.containerRef}
              aria-busy={loading}
              aria-disabled={disabled}
              aria-label={buttonAriaLabel}
              __excludeProps={['title']}
            >
              <SInner tag='span' loading={loading} {...hintProps}>
                {AddonLeft ? (
                  <Button.Addon>
                    <AddonLeft />
                  </Button.Addon>
                ) : null}
                {addonTextChildren(Children, Button.Text, Button.Addon)}
                {AddonRight ? (
                  <Button.Addon>
                    <AddonRight />
                  </Button.Addon>
                ) : null}
              </SInner>
              {loading && (
                <SSpin tag='span'>
                  <SpinButton centered size={size} theme={useTheme} />
                </SSpin>
              )}
            </SButton>,
          )
        }
      </NeighborLocation.Detect>
    );
  }
}

function Text(props) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Box} tag='span' />);
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

const Button = createComponent(RootButton, {
  Text,
  Addon,
});

export default Button;
