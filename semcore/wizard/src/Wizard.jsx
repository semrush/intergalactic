import React from 'react';
import createComponent, { Component, Root, sstyled, styled } from '@semcore/core';

import style from './style/wizard.shadow.css';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import CheckM from '@semcore/icon/Check/m';

class WizardRoot extends Component {
  static displayName = 'Wizard';

  static style = style;

  static defaultProps = {
    currentStep: 1,
  };

  getStepProps() {
    const { currentStep } = this.asProps;
    return {
      currentStep,
    };
  }

  getStepperProps() {
    const { currentStep, steps } = this.asProps;
    return {
      currentStep,
      steps,
    };
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles } = this.asProps;

    return styled(styles)(
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
    <SSidebar render={Box} {...props}>
      <SSidebarHeader tag="div">{title}</SSidebarHeader>
      <Children />
    </SSidebar>,
  );
}

function Step(props) {
  const SStep = Root;
  const { styles, currentStep, value } = props;
  return sstyled(styles)(<>{currentStep === value ? <SStep render={Box} {...props} /> : null}</>);
}

function Stepper(props) {
  const { Children, styles, currentStep, value, steps } = props;
  const SStepper = Root;
  const SStepNumber = Text;
  const SStepDescription = Box;

  return sstyled(styles)(
    <SStepper
      active={value === currentStep}
      disabled={steps.find((s) => s.value === value).disabled}
      render={Box}
      {...props}
    >
      <SStepNumber>{value < currentStep ? <CheckM /> : value}</SStepNumber>
      <SStepDescription tag="span">
        {steps.filter((s) => s.value === value)[0].title}
        <Children />
      </SStepDescription>
    </SStepper>,
  );
}

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
