import { NeighborLocation, Box, Hint } from '@semcore/base-components';
import { Component, CORE_INSTANCE, createComponent, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './button.shadow.css';
import type { ButtonProps, ButtonAddonProps, ButtonTextProps, ButtonComponent, ButtonDefaultProps } from './Button.type';
import SpinButton from './SpinButton';

export const MAP_USE_DEFAULT_THEME: Record<string, string> = {
  primary: 'info',
  secondary: 'muted',
  tertiary: 'info',
};

type State = {
  ariaLabelledByContent: null | string;
};

export class RootButton extends Component<
  ButtonProps,
  [],
  never,
  {},
  State,
  ButtonDefaultProps
> {
  static displayName = 'Button';
  static style = style;
  static defaultProps = {
    use: 'secondary',
    size: 'm',
  } as const;

  containerRef = React.createRef<HTMLButtonElement>();

  state: State = {
    ariaLabelledByContent: null,
  };

  getTextProps() {
    const { size } = this.asProps;

    return {
      size,
      'hint:triggerRef': this.containerRef,
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
                disabled={disabled || loading}
                use:theme={useTheme}
                ref={this.containerRef}
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

function ButtonText(props: ButtonTextProps) {
  const SText = Root;
  return sstyled(props.styles)(<SText render={Text} />);
}

function Addon(props: ButtonAddonProps) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} tag='span' />);
}

const Button = createComponent<
  ButtonComponent,
  typeof RootButton
>(RootButton, {
  Text: ButtonText,
  Addon,
});

export default Button;
