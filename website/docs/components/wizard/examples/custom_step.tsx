import React from 'react';
import Wizard from 'intergalactic/wizard';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import ArrowRight from 'intergalactic/icon/ArrowRight/m';
import ArrowLeft from 'intergalactic/icon/ArrowLeft/m';
import Input from 'intergalactic/input';

const Step1 = React.forwardRef(function (_props, ref: React.Ref<HTMLDivElement>) {
  return (
    <Flex ref={ref} direction='column'>
      <Input mb={4}>
        <Input.Value placeholder='Your name' />
      </Input>
      <Input>
        <Input.Value placeholder='Your email' />
      </Input>
    </Flex>
  );
});

const steps = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={1} onActive={setStep}>
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
          <Wizard.Step tag={Step1} step={1} />
          <Wizard.Step step={2}>
            {(props, handlers) => {
              return 'Second step';
            }}
          </Wizard.Step>
          <Wizard.Step step={3}>
            <Text size={400} fontWeight={500}>
              Final step
            </Text>
            <Text tag='p' mt={2}>
              Congratulations on passing all the steps!
            </Text>
          </Wizard.Step>
          <Flex justifyContent='space-between' w='100%' mt={5}>
            {step > 1 && (
              <Wizard.StepBack onActive={setStep}>{steps[step - 2].title}</Wizard.StepBack>
            )}
            {step !== steps.length && (
              <Wizard.StepNext onActive={setStep}>{steps[step].title}</Wizard.StepNext>
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
