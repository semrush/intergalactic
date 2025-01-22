import React from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const steps = [
  { title: 'Personal Info' },
  { title: 'Import source' },
  { title: 'Sub step name' },
  { title: 'Sub step name 2' },
  { title: 'Administrative Info' },
  { title: 'Documents' },
  { title: 'Photos' },
  { title: 'Additional Info' },
  { title: 'Approval Info' },
  { title: 'Other Info' },
  { title: 'Something else' },
];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleStepChange = (newStep: number) => () => {
    setStep(newStep);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings'>
          <Wizard.Stepper step={1} onActive={handleStepChange(1)} completed>
            {steps[0].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={handleStepChange(2)} number={1.1}>
            {steps[1].title}
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={handleStepChange(3)} number={1.2}>
            <Text color='text-secondary-invert' fontWeight={400}>
              {steps[2].title}
            </Text>
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              Optional step
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={4} onActive={handleStepChange(4)} number={1.3}>
            <Text color='text-secondary-invert' fontWeight={400}>
              {steps[3].title}
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={5} onActive={handleStepChange(5)}>
            {steps[4].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={6} onActive={handleStepChange(6)}>
            {steps[5].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={7} onActive={handleStepChange(7)}>
            {steps[6].title}
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={8} onActive={handleStepChange(8)}>
            {steps[7].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={9} onActive={handleStepChange(9)} disabled>
            {steps[8].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={10} onActive={handleStepChange(10)} disabled number={8.1}>
            {steps[9].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={11} onActive={handleStepChange(11)} disabled number={8.1} completed>
            {steps[10].title}
          </Wizard.Stepper>
        </Wizard.Sidebar>

        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          {steps.map((stepData, index) => (
            <Wizard.Step key={index} step={index + 1}>
              <Text size={500} tag='h3'>
                {stepData.title}
              </Text>
            </Wizard.Step>
          ))}

          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack onActive={handleStepChange(step - 1)} stepName={steps[step - 2].title} disabled={step === 2} />
            )}
            {step !== steps.length - 1 && (
              <Wizard.StepNext ml='auto' onActive={handleStepChange(step + 1)} stepName={steps[step].title} disabled={step === steps.length - 3} />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
