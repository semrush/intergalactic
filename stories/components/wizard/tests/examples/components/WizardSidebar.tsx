import Wizard from '@semcore/ui/wizard';
import React from 'react';

type Props = {
  step: number;
  setStep: (s: number) => void;
};

const steps = [{ title: 'Location' }, { title: 'Keywords' }, { title: 'Schedule' }];

export const WizardSidebar = ({ step, setStep }: Props) => (
  <Wizard.Sidebar title='Site Audit Settings'>
    <Wizard.Stepper step={1} onActive={() => setStep(1)} completed={step > 1}>
      {steps[0].title}
    </Wizard.Stepper>
    <Wizard.Stepper step={2} onActive={() => setStep(2)} completed={step > 2}>
      {steps[1].title}
    </Wizard.Stepper>
    <Wizard.Stepper step={3} onActive={() => setStep(3)}>
      {steps[2].title}
    </Wizard.Stepper>
  </Wizard.Sidebar>
);
