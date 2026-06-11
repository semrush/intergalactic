import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import Wizard from '@semcore/ui/wizard';
import React from 'react';

const steps = [{ title: 'Location' }, { title: 'Keywords' }, { title: 'Schedule' }];

const Demo = () => {
  const [step, setStep] = React.useState<number>(1);
  const [visible, setVisible] = React.useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open wizard</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings'>
          <Wizard.Stepper step={1} onActive={() => setStep(1)} completed>
            {steps[0].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={() => setStep(2)}>
            {steps[1].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={() => setStep(3)}>
            {steps[2].title}
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          <Wizard.Step step={1}>
            <Wizard.StepTitle>
              {steps[0].title}
            </Wizard.StepTitle>
          </Wizard.Step>
          <Wizard.Step step={2}>
            <Wizard.StepTitle>
              {steps[1].title}
            </Wizard.StepTitle>
          </Wizard.Step>
          <Wizard.Step step={3}>
            <Wizard.StepTitle>
              {steps[2].title}
            </Wizard.StepTitle>
          </Wizard.Step>
          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack
                onActive={() => setStep(step - 1)}
                stepName={steps[step - 2].title}
              />
            )}
            {step !== steps.length && (
              <Wizard.StepNext
                ml='auto'
                onActive={() => setStep(step + 1)}
                stepName={steps[step].title}
              />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
