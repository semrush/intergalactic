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
    ariaLabelledByContent: '',
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
        this.containerRef.current && !hasLabels(this.containerRef.current),
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

  renderChildren() {
    const { Children, styles, addonLeft: AddonLeft, addonRight: AddonRight } = this.asProps;

    return sstyled(styles)(
      <>
        {AddonLeft ? <Button.Addon tag={AddonLeft} /> : null}
        {addonTextChildren(Children, Button.Text, Button.Addon)}
        {AddonRight ? <Button.Addon tag={AddonRight} /> : null}
      </>,
    );
  }

  renderOnlyAddons() {
    const {
      styles,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      title,
      ['aria-label']: ariaLabel,
    } = this.asProps;

    const hintContent = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    return sstyled(styles)(
      <Hint tag={Button.Addon} title={hintContent} timeout={[250, 50]}>
        {AddonLeft && <AddonLeft />}
        {AddonRight && <AddonRight />}
      </Hint>,
    );
  }

  render() {
    const SButton = Root;
    const SInner = Box;
    const SSpin = Box;
    const {
      styles,
      use,
      theme = typeof use === 'string' && MAP_USE_DEFAULT_THEME[use],
      loading,
      disabled = loading,
      size,
      neighborLocation,
      children: hasChildren,
    } = this.asProps;
    const useTheme = use && theme ? `${use}-${theme}` : false;

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
            >
              <SInner tag='span' loading={loading}>
                {hasChildren ? this.renderChildren() : this.renderOnlyAddons()}
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
