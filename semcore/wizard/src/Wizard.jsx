import React, { useMemo } from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import CheckM from '@semcore/icon/Check/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/wizard.shadow.css';

class WizardRoot extends Component {
  static displayName = 'Wizard';
  static style = style;
  static defaultProps = {
    currentStep: 1,
    defaultStep: 1,
  };

  uncontrolledProps() {
    return {
      step: null,
    };
  }

  getStepProps() {
    const { currentStep } = this.asProps;
    return {
      currentStep,
    };
  }

  getStepperProps(props) {
    const { currentStep, steps } = this.asProps;
    const isActive = props.step === currentStep;
    const currentStepObject = useMemo(
      () => steps.find((s) => s.step && s.step === props.step),
      [props.step],
    );
    const isDisabled = currentStepObject ? !!currentStepObject.disabled : false;

    return {
      currentStep,
      steps,
      isDisabled,
      isActive,
      currentStepObject,
      'aria-disabled': isDisabled,
      'aria-current': isActive,
    };
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles } = this.asProps;

    return sstyled(styles)(
      <SWizard render={Box}>
        <Children />
      </SWizard>,
    );
  }
}

function Sidebar(props) {
  const { Children, styles, title } = props;
  const SSidebar = Root;
  const SSidebarHeader = Text;
  return sstyled(styles)(
    <SSidebar render={Box} role="menu">
      {title && <SSidebarHeader tag="div">{title}</SSidebarHeader>}
      <Children />
    </SSidebar>,
  );
}

function Step(props) {
  const SStep = Root;
  const { styles, currentStep, step } = props;
  return sstyled(styles)(<>{currentStep === step ? <SStep render={Box} /> : null}</>);
}

function Stepper(props) {
  const { Children, styles, currentStep, step, isActive, isDisabled, currentStepObject } = props;
  const SStepper = Root;
  const SStepNumber = Text;
  const SStepDescription = Box;

  return sstyled(styles)(
    <SStepper active={isActive} disabled={isDisabled} render={Box} role="menuitem">
      <SStepNumber>{step < currentStep ? <CheckM /> : step}</SStepNumber>
      <SStepDescription tag="span">
        {currentStepObject ? currentStepObject.title : null}
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
