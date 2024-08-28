import React from 'react';
import createComponent, { Root, Component, sstyled } from '@semcore/core';
import Popper, { isInputTriggerTag } from '@semcore/popper';
import capitalizeFirstLetter from '@semcore/utils/lib/capitalizeFirstLetter';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import style from './style/dropdown.shadow.css';
import { hasFocusableIn } from '@semcore/utils/lib/use/useFocusLock';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

const INTERACTION_TAGS = ['INPUT', 'TEXTAREA'];

class Dropdown extends Component {
  static displayName = 'Dropdown';
  static style = style;
  static defaultProps = {
    // timeout: [100, 50],
    placement: 'bottom-start',
    offset: [0, 4],
    stretch: 'min',
    defaultVisible: false,
    i18n: localizedMessages,
    locale: 'en',
    interaction: 'click',
  };
  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)];

  popperRef = React.createRef();

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  defaultModifiers = [
    {
      name: 'flip',
      enabled: false,
    },
    {
      name: 'stretch',
      phase: 'beforeRead',
      enabled: true,
      fn: function ({ state, options }) {
        const [position] = state.placement.split('-');

        const isVertical = ['left', 'right'].indexOf(position) !== -1;
        const len = isVertical ? 'height' : 'width';
        const referenceLen = state.elements.reference[`offset${capitalizeFirstLetter(len)}`];

        if (options.stretch === 'min') {
          state.rects.popper.width = Math.max(state.rects.popper.width, referenceLen);
          state.elements.popper.style[`min${capitalizeFirstLetter(len)}`] = `${referenceLen}px`;
        }

        if (options.stretch === 'fixed') {
          state.rects.popper.width = referenceLen;
          state.elements.popper.style[len] = `${referenceLen}px`;
        }
      },
    },
  ];

  handlerTriggerKeyDown = (e) => {
    const { visible, interaction } = this.asProps;
    const element = this.popperRef.current;

    if (
      interaction === 'click' &&
      visible &&
      e.key === 'Tab' &&
      element &&
      !hasFocusableIn(element)
    ) {
      e.preventDefault();

      return;
    }

    if (e.key === ' ' && INTERACTION_TAGS.includes(e.target.tagName)) return;
    if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') return;

    if (['Enter', ' '].includes(e.key) && interaction !== 'none') {
      e.preventDefault();
      this.handlers.visible(true);
    }
  };

  getTriggerProps() {
    const { uid, visible, disablePortal, getI18nText } = this.asProps;

    return {
      id: `igc-${uid}-trigger`,
      'aria-controls': visible ? `igc-${uid}-popper` : undefined,
      focusHint: visible && !disablePortal ? getI18nText('triggerHint') : undefined,
      'aria-expanded': visible ? 'true' : 'false',
      onKeyDown: this.handlerTriggerKeyDown,
      'aria-haspopup': 'dialog',
    };
  }

  getPopperProps() {
    const { uid, disablePortal, ignorePortalsStacking, interaction } = this.asProps;

    return {
      id: `igc-${uid}-popper`,
      tabIndex: 0,
      role: 'dialog',
      disablePortal,
      ignorePortalsStacking,
      ref: this.popperRef,
      focusMaster: interaction === 'click',
      autoFocus: 'enforced',
    };
  }

  render() {
    const { Children, forwardRef, modifiers = [], stretch, ...other } = this.asProps;

    return (
      <Popper
        ref={forwardRef}
        modifiers={[
          ...this.defaultModifiers,
          {
            name: 'stretch',
            options: typeof stretch === 'object' ? stretch : { stretch },
          },
          ...modifiers,
        ]}
        {...other}
      >
        <Children />
      </Popper>
    );
  }
}

function DropdownTrigger({ styles, tag: Tag }) {
  const hasInputTrigger = isInputTriggerTag(Tag);
  const SDropdownTrigger = Root;

  return sstyled(styles)(
    <SDropdownTrigger render={Popper.Trigger} role={hasInputTrigger ? 'combobox' : 'button'} />,
  );
}

function DropdownPopper({ styles }) {
  const SDropdownPopper = Root;
  return sstyled(styles)(<SDropdownPopper render={Popper.Popper} />);
}

export default createComponent(
  Dropdown,
  {
    Trigger: DropdownTrigger,
    Popper: DropdownPopper,
  },
  {
    parent: Popper,
  },
);
