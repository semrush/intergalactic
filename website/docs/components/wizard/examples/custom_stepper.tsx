import React from 'react';
import Wizard from 'intergalactic/wizard';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Input from 'intergalactic/input';
import Radio, { RadioGroup } from 'intergalactic/radio';

const Step1 = React.forwardRef(function (_props, ref: React.Ref<HTMLDivElement>) {
  return (
    <Flex ref={ref} direction='column' gap={2}>
      <Text size={200} tag='label' htmlFor='name'>
        Name
      </Text>
      <Input mb={2}>
        <Input.Value id='name' autoComplete='name' />
      </Input>
      <Text size={200} tag='label' htmlFor='email'>
        Email
      </Text>
      <Input>
        <Input.Value id='email' type='email' autoComplete='email' />
      </Input>
    </Flex>
  );
});

const steps = [{ title: 'Personal' }, { title: 'Keywords' }, { title: 'Import source' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings'>
          <Wizard.Stepper step={1} onActive={setStep}>
            Personal
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep}>
            Keywords
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep} number={2.1}>
            Import source
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              {value === '' ? 'Not selected' : value}
            </Text>
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          <Wizard.Step tag={Step1} step={1} />
          <Wizard.Step step={2}>
            {(props, handlers) => {
              return 'Keywords';
            }}
          </Wizard.Step>
          <Wizard.Step step={3}>
            <RadioGroup name='radio' value={value} onChange={setValue}>
              <Radio mr={2} mb={3}>
                <Radio.Value value='Manually' />
                <Radio.Text>Manually</Radio.Text>
              </Radio>
              <Radio mr={2} mb={3}>
                <Radio.Value value='From TXT' />
                <Radio.Text>From TXT</Radio.Text>
              </Radio>
              <Radio mr={2} mb={3}>
                <Radio.Value value='From SCV' />
                <Radio.Text>From SCV</Radio.Text>
              </Radio>
            </RadioGroup>
          </Wizard.Step>
          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack onActive={setStep}>{steps[step - 2].title}</Wizard.StepBack>
            )}
            {step !== steps.length && (
              <Wizard.StepNext ml='auto' onActive={setStep}>
                {steps[step].title}
              </Wizard.StepNext>
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
