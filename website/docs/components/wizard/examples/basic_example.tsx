import React from 'react';
import Wizard from 'intergalactic/wizard';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';

const steps = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(true);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={1} onActive={setStep} completed>
            Step 1
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep}>
            Step 2
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep}>
            Step 3
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          <Wizard.Step step={1}>Step 1</Wizard.Step>
          <Wizard.Step step={2}>Step 2</Wizard.Step>
          <Wizard.Step step={3}>Step 3</Wizard.Step>
          <Flex justifyContent='space-between' w='100%' mt={5}>
            {step > 1 && <Wizard.StepBack onActive={setStep} stepName={steps[step - 2].title} />}
            {step !== steps.length && (
              <Wizard.StepNext onActive={setStep} stepName={steps[step].title} />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
