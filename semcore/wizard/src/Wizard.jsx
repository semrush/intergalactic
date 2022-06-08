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

  getStepProps(props) {
    const { currentStep } = this.asProps;
    const active = props.step === currentStep;
    return {
      currentStep,
      active,
    };
  }

  getStepperProps(props) {
    const { currentStep, steps } = this.asProps;
    const active = props.step === currentStep;
    const currentStepObject = useMemo(
      () => steps.find((s) => s.step && s.step === props.step),
      [props.step],
    );
    const title = currentStepObject.title;
    const disabled = currentStepObject ? !!currentStepObject.disabled : false;

    return {
      currentStep,
      steps,
      disabled,
      active,
      title,
      'aria-disabled': disabled,
      'aria-current': active,
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
  const { styles, active } = props;
  if (active) {
    return sstyled(styles)(<SStep render={Box} />);
  }
  return null;
}

function Stepper(props) {
  const { Children, styles, currentStep, step, active, disabled, title } = props;
  const SStepper = Root;
  const SStepNumber = Text;
  const SStepDescription = Box;

  return sstyled(styles)(
    <SStepper active={active} disabled={disabled} render={Box} role="menuitem">
      <SStepNumber>{step < currentStep ? <CheckM /> : step}</SStepNumber>
      <SStepDescription tag="span">
        {title}
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
