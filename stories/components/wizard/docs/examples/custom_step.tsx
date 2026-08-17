import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import Wizard from '@semcore/ui/wizard';
import React from 'react';

const Step1 = React.forwardRef(function (_props, ref: React.Ref<HTMLDivElement>) {
  return (
    <Flex ref={ref} direction='column'>
      <Wizard.StepTitle>
        Keywords
      </Wizard.StepTitle>
      <Input mb={4}>
        <Input.Value placeholder='Keyword 1' aria-label='Keyword 1' />
      </Input>
      <Input>
        <Input.Value placeholder='Keyword 2' aria-label='Keyword 2' />
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
            <Text color='wizard-sidebar-text-secondary' fontWeight={400} mt={1} tag='div'>
              optional
            </Text>
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
            <Wizard.StepTitle>
              Final step
            </Wizard.StepTitle>
            <Text tag='p'>
              Congratulations on passing all the steps!
            </Text>
          </Wizard.Step>
          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack
                onActive={handleStepChange(step - 1)}
                stepName={steps[step - 2].title}
              />
            )}
            {step !== steps.length && (
              <Wizard.StepNext
                ml='auto'
                onActive={handleStepChange(step + 1)}
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
