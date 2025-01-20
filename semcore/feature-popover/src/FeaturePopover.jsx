import React from 'react';
import { Animation } from '@semcore/animation';
import { createComponent, Root, Component, sstyled } from '@semcore/core';
import Popper from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import CloseIcon from '@semcore/icon/Close/m';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import Button from '@semcore/button';

import style from './style/feature-popover.shadow.css';

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

class FeaturePopover extends Component {
  static displayName = 'FeaturePopover';
  static style = style;
  static defaultProps = {
    offset: [0, 12],
    placement: 'bottom-start',
    defaultVisible: false,
    onOutsideClick: () => false,
    interaction: 'none',
    i18n: localizedMessages,
    locale: 'en',
  };
  static enhance = [i18nEnhance(localizedMessages)];

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

  handleVisibleChange = (visible) => {
    this.handlers.visible(visible);
  };

  handleCloseClick = (e) => {
    this.handlers.visible(false, e);
  };

  getPopperProps() {
    const { visible, getI18nText } = this.asProps;
    return {
      visible,
      $onCloseClick: this.handleCloseClick,
      getI18nText,
    };
  }

  getSpotProps() {
    const { visible } = this.asProps;
    return { visible };
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

function Trigger({ Children, styles }) {
  const STrigger = Root;
  return sstyled(styles)(
    <STrigger render={Popper.Trigger} tag={Box} aria-haspopup={false}>
      <Children />
    </STrigger>,
  );
}

class FeaturePopoverPopper extends Component {
  static defaultProps = {
    closeIcon: false,
    duration: 200,
  };

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
      'aria-describedBy': ariaDescribedBy,
      'aria-labelledby': ariaLabelledby,
      title,
    } = this.asProps;

    return sstyled(styles)(
      <Popper.Popper
        disableEnforceFocus
        zIndex={zIndex}
        tabIndex={0}
        autoFocus
        role={'dialog'}
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
                theme='muted'
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

const Spot = (props) => {
  const SSpot = Root;

  const { styles, visible } = props;

  if (!visible) return null;

  return sstyled(styles)(<SSpot render={Box} />);
};

export default createComponent(
  FeaturePopover,
  {
    Trigger: Trigger,
    Popper: FeaturePopoverPopper,
    Spot,
  },
  { parent: Popper },
);
