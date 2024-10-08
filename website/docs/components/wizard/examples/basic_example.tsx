import React from 'react';
import Wizard from 'intergalactic/wizard';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const steps = [{ title: 'Location' }, { title: 'Keywords' }, { title: 'Schedule' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings'>
          <Wizard.Stepper step={1} onActive={setStep} completed>
            {steps[0].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep}>
            {steps[1].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep}>
            {steps[2].title}
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
