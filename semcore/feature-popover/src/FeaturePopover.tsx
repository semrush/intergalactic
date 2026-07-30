import { Box, Popper, Animation } from '@semcore/base-components';
import Button from '@semcore/button';
import type { Intergalactic, IRootComponentProps } from '@semcore/core';
import { createComponent, Root, Component, sstyled } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import CloseIcon from '@semcore/icon/Close/m';
import React from 'react';

import type { NSFeaturePopover } from './FeaturePopover.type';
import style from './style/feature-popover.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

const stylePopper = sstyled.css`
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes exit {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-10px);
    }
  }
`;

class FeaturePopover extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSFeaturePopover.Component>,
  typeof FeaturePopover.enhance,
  NSFeaturePopover.Handlers,
  NSFeaturePopover.InternalProps,
  {},
  NSFeaturePopover.DefaultProps
> {
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static displayName = 'FeaturePopover';
  static style = style;
  static defaultProps: NSFeaturePopover.DefaultProps = {
    offset: [0, 12],
    placement: 'bottom-start',
    defaultVisible: false,
    onOutsideClick: () => {},
    interaction: 'none',
    i18n: localizedMessages,
    locale: 'en',
    theme: 'accent',
  };

  defaultModifiers = [
    {
      name: 'flip',
      enabled: false,
    },
  ];

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  handleVisibleChange = (visible: boolean) => {
    this.handlers.visible(visible);
  };

  handleCloseClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    this.handlers.visible(false, e);
  };

  getPopperProps() {
    const { visible, getI18nText, theme } = this.asProps;
    return {
      visible,
      $onCloseClick: this.handleCloseClick,
      getI18nText,
      theme,
    };
  }

  getSpotProps() {
    const { visible, theme } = this.asProps;
    return { visible, theme };
  }

  render() {
    const { styles, forwardRef, onVisibleChange, modifiers = [], ...other } = this.asProps;

    return sstyled(styles)(
      <Popper
        ref={forwardRef}
        onVisibleChange={callAllEventHandlers(onVisibleChange, this.handleVisibleChange)}
        modifiers={[...this.defaultModifiers, ...modifiers]}
        {...other}
      />,
    );
  }
}

function Trigger({ Children, styles }: IRootComponentProps) {
  const STrigger = Root;
  return sstyled(styles)(
    <STrigger render={Popper.Trigger} tag={Box} aria-haspopup={false}>
      <Children />
    </STrigger>,
  );
}

class FeaturePopoverPopper extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSFeaturePopover.Popper.Component, typeof FeaturePopover, 'Popper'>
> {
  static defaultProps = {
    closeIcon: false,
    duration: 200,
    autoFocus: true,
  };

  popperRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.asProps.autoFocus) {
      setTimeout(() => {
        this.popperRef.current?.focus();
      }, 0);
    }
  }

  render() {
    const SFeaturePopover = Root;
    const SClose = Button;
    const {
      Children,
      styles,
      visible,
      closeIcon,
      duration,
      $onCloseClick,
      animationsDisabled,
      getI18nText,
      zIndex,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledby,
      title,
      theme,
    } = this.asProps;

    return sstyled(styles)(
      <Popper.Popper
        ref={this.popperRef}
        disableEnforceFocus
        zIndex={zIndex}
        tabIndex={0}
        role='dialog'
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        title={title}
      >
        <Animation
          visible={visible}
          duration={duration}
          keyframes={[stylePopper['@enter'], stylePopper['@exit']]}
          initialAnimation
          animationsDisabled={animationsDisabled}
        >
          <SFeaturePopover
            render={Box}
            __excludeProps={['aria-label', 'aria-describedBy', 'title']}
          >
            {closeIcon && (
              <SClose
                aria-label={getI18nText('close')}
                onClick={$onCloseClick}
                use='tertiary'
                theme={theme === 'accent' ? 'muted' : 'invert'}
                size='m'
                addonLeft={CloseIcon}
                type='button'
              />
            )}
            <Children />
          </SFeaturePopover>
        </Animation>
      </Popper.Popper>,
    );
  }
}

function Spot(props: Intergalactic.InternalTypings.InferChildComponentProps<NSFeaturePopover.Spot.Component, typeof FeaturePopover, 'Spot'>) {
  const SSpot = Root;

  const { styles, visible } = props;

  if (!visible) return null;

  return sstyled(styles)(<SSpot render={Box} />);
}

/**
 * FeaturePopover
 *
 * {@link https://developer.semrush.com/intergalactic/components/feature-popover/feature-popover-api/|API} | {@link https://developer.semrush.com/intergalactic/components/feature-popover/feature-popover-code/|Examples}
 */
export default createComponent<
  NSFeaturePopover.Component,
  typeof FeaturePopover
>(
  FeaturePopover,
  {
    Trigger: Trigger,
    Popper: FeaturePopoverPopper,
    Spot,
  },
  // @ts-ignore
  { parent: Popper },
);
