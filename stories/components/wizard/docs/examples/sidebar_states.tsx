import React from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const steps = [{ title: 'Personal Info' }, { title: 'Administrative Info Administrative' }, { title: 'Documents' }, { title: 'Photos' }, { title: 'Additional Info' }, { title: 'Approval Info' }, { title: 'Other Info' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings' >
          <Wizard.Stepper step={1} onActive={setStep} completed>
            {steps[0].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep} number={1.1}>
          Import source
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep}>
            {steps[1].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={4} onActive={setStep}>
            {steps[2].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={5} onActive={setStep}>
            {steps[3].title}
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={6} onActive={setStep}>
            {steps[4].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={7} onActive={setStep} disabled>
            {steps[5].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={8} onActive={setStep} disabled>
            {steps[6].title}
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          <Wizard.Step step={1}>
            <Text size={500} tag={'h3'}>
              {steps[0].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={2}>
            <Text size={500} tag={'h3'}>
              {steps[1].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={3}>
            <Text size={500} tag={'h3'}>
              {steps[2].title}
            </Text>
          </Wizard.Step>
          <Flex mt={5}>
            {step > 1 && <Wizard.StepBack onActive={setStep} stepName={steps[step - 2].title} />}
            {step !== steps.length && (
              <Wizard.StepNext ml={'auto'} onActive={setStep} stepName={steps[step].title} />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
