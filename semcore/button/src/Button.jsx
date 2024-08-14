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

  renderButton({ buttonProps, children }) {
    const { styles } = this.asProps;
    const SButton = Root;

    return sstyled(styles)(
      <SButton render={Box} {...buttonProps}>
        {children}
      </SButton>,
    );
  }

  renderButtonWithHint({ buttonProps, children, hintProps }) {
    const { styles } = this.asProps;
    const SButton = Root;

    return sstyled(styles)(
      <SButton render={Hint} {...buttonProps} {...hintProps}>
        {children}
      </SButton>,
    );
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
    const SInner = Box;
    const SSpin = Box;
    const buttonAriaLabel = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    const buttonProps = {
      type: 'button',
      tag: 'button',
      disabled,
      'use:theme': useTheme,
      ref: this.containerRef,
      'aria-busy': loading,
      'aria-disabled': disabled,
      __excludeProps: ['title'],
    };

    const hintProps = {
      title: buttonAriaLabel,
      timeout: [250, 50],
      placement: hintPlacement,
      theme: theme === 'invert' ? 'invert' : undefined,
      __excludeProps: [],
    };

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) => {
          const children = sstyled(styles)(
            <>
              <SInner tag='span' loading={loading}>
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
            </>,
          );
          buttonProps.neighborLocation = neighborLocation;

          if (!hasChildren || title) {
            return this.renderButtonWithHint({ buttonProps, hintProps, children });
          }

          return this.renderButton({ buttonProps, children });
        }}
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
