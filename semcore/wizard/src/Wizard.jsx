import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import CheckM from '@semcore/icon/Check/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import { setFocus } from '@semcore/utils/lib/use/useFocusLock';

import style from './style/wizard.shadow.css';

class WizardRoot extends Component {
  static displayName = 'Wizard';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    step: null,
    i18n: localizedMessages,
    locale: 'en',
  };

  _steps = new Map();
  modalRef = React.createRef();

  getStepProps(props) {
    return {
      steps: this._steps,
      active: props.step === this.asProps.step,
    };
  }

  getStepperProps(props, i) {
    let number = i + 1;
    if (this._steps.has(props.step)) {
      const step = this._steps.get(props.step);
      number = step.number;
    } else {
      this._steps.set(props.step, { number, ...props });
    }
    return {
      active: props.step === this.asProps.step,
      number,
      getI18nText: this.asProps.getI18nText,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.step === this.asProps.step) return;
    setTimeout(() => {
      if (prevProps.step === this.asProps.step) return;
      if (document.activeElement !== document.body) return;
      if (!this.asProps.visible) return;
      if (!this.modalRef.current) return;
      setFocus(this.modalRef.current, document.body);
    }, 1);
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles } = this.asProps;

    this._steps.clear();

    return sstyled(styles)(
      <SWizard render={Modal} ref={this.modalRef}>
        <Children />
      </SWizard>,
    );
  }
}

function Sidebar(props) {
  const { Children, styles, title } = props;
  const SSidebar = Root;
  const SSidebarHeader = 'h2';
  return sstyled(styles)(
    <SSidebar render={Box} role='menu'>
      {title && <SSidebarHeader>{title}</SSidebarHeader>}
      <Children />
    </SSidebar>,
  );
}

function Step(props) {
  const SStep = Root;
  const { Children, styles, active } = props;
  if (active) {
    return sstyled(styles)(
      <SStep render={Box} tag={Box}>
        <Children />
      </SStep>,
    );
  }
  return null;
}

function Stepper(props) {
  const { Children, styles, step, active, onActive, completed, disabled, number, getI18nText } =
    props;
  const SStepper = Root;
  const SStepNumber = 'span';
  const SStepDescription = 'span';
  const SCompleted = CheckM;

  const handlerClick = React.useCallback(
    (e) => {
      if (onActive) onActive(step, e);
    },
    [step, onActive],
  );

  const handlerKeyDown = React.useCallback(
    (e) => {
      if (onActive && e.key === 'Enter') {
        onActive(step, e);
      }
    },
    [step, onActive],
  );

  return sstyled(styles)(
    <SStepper
      render={Box}
      role='menuitem'
      aria-disabled={disabled}
      aria-current={active}
      onClick={handlerClick}
      onKeyDown={handlerKeyDown}
    >
      {completed && <ScreenReaderOnly>{getI18nText('completedStep')}</ScreenReaderOnly>}
      <SStepNumber aria-hidden='true'>{completed ? <SCompleted /> : number}</SStepNumber>
      <SStepDescription>
        <Children />
      </SStepDescription>
    </SStepper>,
  );
}

Stepper.enhance = [keyboardFocusEnhance()];

function Content(props) {
  const { Children, styles } = props;
  const SContent = Root;
  return sstyled(styles)(
    <SContent render={Box}>
      <Children />
    </SContent>,
  );
}

const Wizard = createComponent(WizardRoot, {
  Sidebar,
  Content,
  Step,
  Stepper,
});

export const wrapWizardStepper = (wrapper) => wrapper;

export default Wizard;
