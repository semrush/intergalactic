import { NeighborLocation, Box, Hint } from '@semcore/base-components';
import { Component, CORE_INSTANCE, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import React from 'react';

import type { AbstractButtonProps, AbstractButtonTextProps } from './AbstractButton.type';
import SpinButton from './SpinButton';

export const MAP_USE_DEFAULT_THEME: Record<string, string> = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

type Props = AbstractButtonProps<any, any, any>;

type State = {
  ariaLabelledByContent: null | string;
};

export abstract class AbstractButton extends Component<Props, [], never, {}, State> {
  static displayName = 'AbstractButton';

  containerRef = React.createRef<HTMLButtonElement>();

  state: State = {
    ariaLabelledByContent: null,
  };

  protected abstract getTextColor(): string | undefined;

  getTextProps(props: AbstractButtonTextProps<any>) {
    const { size } = this.asProps;

    return {
      size,
      'use:hintProps': { triggerRef: this.containerRef, ...props.hintProps },
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

  render() {
    const {
      styles,
      use,
      theme = typeof use === 'string' && MAP_USE_DEFAULT_THEME[use],
      loading,
      disabled = loading,
      size,
      neighborLocation,
      children,
      title,
      ['aria-label']: ariaLabel,
      Children,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      hintPlacement,
    } = this.asProps;
    const SButton = Root;
    // @ts-ignore
    const Button = this[CORE_INSTANCE];
    const useTheme = use && theme ? `${use}-${theme}` : false;
    const SInner = Box;
    const SSpin = Box;
    const buttonAriaLabel = title ?? ariaLabel ?? this.state.ariaLabelledByContent ?? '';

    const showHint = (children === undefined || title);

    return (
      <NeighborLocation.Detect neighborLocation={neighborLocation}>
        {(neighborLocation) => {
          return sstyled(styles)(
            <>
              <SButton
                render={Box}
                invertOutline={theme === 'invert'}
                type='button'
                tag='button'
                tabIndex={0}
                disabled={disabled}
                use:theme={useTheme}
                ref={this.containerRef}
                text-color={this.getTextColor()}
                aria-busy={loading}
                __excludeProps={['title']}
                aria-label={showHint ? buttonAriaLabel : undefined}
                neighborLocation={neighborLocation}
              >
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
              </SButton>
              {showHint && (
                <Hint
                  triggerRef={this.containerRef}
                  timeout={[250, 50]}
                  placement={hintPlacement}
                >
                  {buttonAriaLabel}
                </Hint>
              )}
            </>,
          );
        }}
      </NeighborLocation.Detect>
    );
  }
}
