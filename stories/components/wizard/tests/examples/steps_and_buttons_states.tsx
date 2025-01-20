import React from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const steps = [{ title: 'Personal Info' }, { title: 'Import source' },{ title: 'Sub step name' }, { title: 'Sub step name 2' }, { title: 'Administrative Info Administrative' }, { title: 'Documents' }, { title: 'Photos' }, { title: 'Additional Info' }, { title: 'Approval Info' }, { title: 'Other Info' },  { title: 'Something else' }];

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
          {steps[1].title}
          <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep} number={1.2} fontWeight={400}>
          <Text color='text-secondary-invert' fontWeight={400} tag='div'>
          {steps[2].title}
            </Text>
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
          Optional step
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={4} onActive={setStep} number={1.3} fontWeight={400}>
          <Text color='text-secondary-invert' fontWeight={400} tag='div'>
          {steps[3].title}
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={5} onActive={setStep} >
            {steps[4].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={6} onActive={setStep}>
            {steps[5].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={7} onActive={setStep}>
            {steps[6].title}
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={8} onActive={setStep}>
            {steps[7].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={9} onActive={setStep} disabled>
            {steps[8].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={10} onActive={setStep} disabled number={8.1}>
            {steps[9].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={11} onActive={setStep} disabled number={8.1} completed>
            {steps[10].title}
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
            Test
            </Text>
          </Wizard.Step>
          <Wizard.Step step={4}>
            <Text size={500} tag={'h3'}>
             test
            </Text>
          </Wizard.Step>
          <Wizard.Step step={5}>
            <Text size={500} tag={'h3'}>
              {steps[4].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={6}>
            <Text size={500} tag={'h3'}>
              {steps[5].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={7}>
            <Text size={500} tag={'h3'}>
              {steps[6].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={8}>
            <Text size={500} tag={'h3'}>
              {steps[7].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={9}>
            <Text size={500} tag={'h3'}>
              {steps[8].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={10}>
            <Text size={500} tag={'h3'}>
              {steps[9].title}
            </Text>
          </Wizard.Step>
          <Wizard.Step step={11}>
            <Text size={500} tag={'h3'}>
              {steps[10].title}
            </Text>
          </Wizard.Step>
          <Flex mt={5}>
          {step > 1 && (
    <Wizard.StepBack onActive={setStep} stepName={steps[step - 2].title} disabled={step === 2}/>
  )}
  {step !== steps.length - 1 && (
    <Wizard.StepNext
    
      ml={'auto'}
      onActive={setStep}
      stepName={steps[step].title}
      disabled={step === steps.length - 3} // Отключить кнопку на последнем шаге
    />
  )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
