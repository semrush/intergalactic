import React, { useCallback } from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import CheckM from '@semcore/icon/Check/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/wizard.shadow.css';

class WizardRoot extends Component {
  static displayName = 'Wizard';
  static style = style;
  static defaultProps = {
    step: null,
  };

  _steps = new Map();

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
    };
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles } = this.asProps;

    this._steps.clear();

    return sstyled(styles)(
      <SWizard render={Modal}>
        <Children />
      </SWizard>,
    );
  }
}

function Sidebar(props) {
  const { Children, styles, title } = props;
  const SSidebar = Root;
  const SSidebarHeader = 'div';
  return sstyled(styles)(
    <SSidebar render={Box} role="menu">
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
      <SStep render={Box}>
        <Children />
      </SStep>,
    );
  }
  return null;
}

function Stepper(props) {
  const { Children, styles, step, active, onActive, completed, disabled, number } = props;
  const SStepper = Root;
  const SStepNumber = 'span';
  const SStepDescription = 'span';
  const SCompleted = CheckM;

  const handlerClick = useCallback(
    (e) => {
      if (onActive) onActive(step, e);
    },
    [step, onActive],
  );

  const handlerKeyPress = useCallback(
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
      role="menuitem"
      aria-disabled={disabled}
      aria-current={active}
      onClick={handlerClick}
      onKeyPress={handlerKeyPress}
    >
      <SStepNumber>{completed ? <SCompleted /> : number}</SStepNumber>
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

export default Wizard;
