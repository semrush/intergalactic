import React from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Input from '@semcore/input';

const Step1 = React.forwardRef(function (_props, ref: React.Ref<HTMLDivElement>) {
  return (
    <Flex ref={ref} direction='column' gap={4}>
      <Text size={500} tag='h3'>
        Keywords
      </Text>
      <Input>
        <Input.Value placeholder='Keyword 1' />
      </Input>
      <Input>
        <Input.Value placeholder='Keyword 2' />
      </Input>
    </Flex>
  );
});

const steps = [{ title: 'Keywords' }, { title: 'Location' }, { title: 'Schedule' }];

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
      <Button onClick={handleOpen}>Open wizard</Button>
      <Wizard visible={visible} step={step} w={600} h={400} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings'>
          <Wizard.Stepper step={1} onActive={handleStepChange(1)}>
            {steps[0].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={handleStepChange(2)}>
            {steps[1].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={handleStepChange(3)}>
            {steps[2].title}
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          <Wizard.Step tag={Step1} step={1} />
          <Wizard.Step step={2}>
            {(props: any, handlers: any) => {
              return 'Second step';
            }}
          </Wizard.Step>
          <Wizard.Step step={3}>
            <Text size={500} tag='h3'>
              Final step
            </Text>
            <Text tag='p' mt={2}>
              Congratulations on passing all the steps!
            </Text>
          </Wizard.Step>
          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack onActive={handleStepChange(step - 1)} stepName={steps[step - 2].title} />
            )}
            {step !== steps.length && (
              <Wizard.StepNext ml='auto' onActive={handleStepChange(step + 1)} stepName={steps[step].title} />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
