import { NeighborLocation, Box } from '@semcore/base-components';
import { AbstractComponent, CORE_INSTANCE, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import { Hint } from '@semcore/tooltip';
import React from 'react';

import type { AbstractButtonProps } from './AbstractButton.type';
import SpinButton from './SpinButton';

export const MAP_USE_DEFAULT_THEME: Record<string, string> = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

type Props = AbstractButtonProps<any, any, any>;

export abstract class AbstractButton extends AbstractComponent<Props> {
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
    const { styles, theme } = this.asProps;
    const SButton = Root();

    return sstyled(styles)(
      <SButton render={Box} invertOutline={theme === 'invert'} {...buttonProps}>
        {children}
      </SButton>,
    );
  }

  renderButtonWithHint({ buttonProps, children, hintProps }: any) {
    const { styles, theme } = this.asProps;
    const SButton = Root();

    return sstyled(styles)(
      <SButton render={Hint} invertOutline={theme === 'invert'} {...buttonProps} {...hintProps} ignorePortalsStacking>
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
      'type': 'button',
      'tag': 'button',
      disabled,
      'use:theme': useTheme,
      'ref': this.containerRef,
      'text-color': this.getTextColor(),
      'aria-busy': loading,
      '__excludeProps': ['title'],
      'tabIndex': 0,
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
              <SInner tag='span' loading={loading} data-ui-name={`${this.asProps['data-ui-name']}.InnerWrapper`}>
                {AddonLeft
                  ? (
                      <Button.Addon>
                        <AddonLeft />
                      </Button.Addon>
                    )
                  : null}
                {addonTextChildren(Children, Button.Text, Button.Addon)}
                {AddonRight
                  ? (
                      <Button.Addon>
                        <AddonRight />
                      </Button.Addon>
                    )
                  : null}
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
