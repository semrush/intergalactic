import React from 'react';
import { Box } from '@semcore/flex-box';
import { Hint } from '@semcore/tooltip';
import NeighborLocation from '@semcore/neighbor-location';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import logger from '@semcore/core/lib/utils/logger';
import SpinButton from './SpinButton';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import { AbstractButtonProps } from './AbstractButton.type';
import { Component, CORE_INSTANCE, Root, sstyled } from '@semcore/core';

export const MAP_USE_DEFAULT_THEME: Record<string, string> = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

type Props = AbstractButtonProps<any, any, any>;

export abstract class AbstractButton extends Component<Props, {}, {}> {
  static displayName = 'AbstractButton';

  containerRef = React.createRef<HTMLButtonElement>();

  state = {
    ariaLabelledByContent: null,
  };

  protected abstract getTextColor(): string | undefined;

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
        this.asProps['data-ui-name'] || AbstractButton.displayName,
      );

      logger.warn(
        this.asProps.theme === 'warning',
        'Warning theme is deprecated and will be removed in the next major release.',
        this.asProps['data-ui-name'] || AbstractButton.displayName,
      );
    }

    const ariaLabelledby = this.asProps['aria-labelledby'];

    if (ariaLabelledby) {
      setTimeout(() => {
        this.setState({
          ariaLabelledByContent: document.getElementById(ariaLabelledby)?.textContent ?? '',
        });
      }, 0);
    }
  }

  renderButton({ buttonProps, children }: any) {
    const { styles } = this.asProps;
    const SButton = Root;

    return sstyled(styles)(
      <SButton render={Box} {...buttonProps}>
        {children}
      </SButton>,
    );
  }

  renderButtonWithHint({ buttonProps, children, hintProps }: any) {
    const { styles } = this.asProps;
    const SButton = Root;

    return sstyled(styles)(
      <SButton render={Hint} {...buttonProps} {...hintProps} ignorePortalsStacking>
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
    // @ts-ignore
    const Button = this[CORE_INSTANCE];
    const useTheme = use && theme ? `${use}-${theme}` : false;
    const SInner = Box;
    const SSpin = Box;
    const buttonAriaLabel = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    const buttonProps: Record<string, any> = {
      type: 'button',
      tag: 'button',
      disabled,
      'use:theme': useTheme,
      ref: this.containerRef,
      'text-color': this.getTextColor(),
      'aria-busy': loading,
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
              {/* @ts-ignore */}
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

          if (hasChildren === undefined || title) {
            return this.renderButtonWithHint({ buttonProps, hintProps, children });
          }

          return this.renderButton({ buttonProps, children });
        }}
      </NeighborLocation.Detect>
    );
  }
}
