---
title: Wizard
tabs: Design('wizard'), A11y('wizard-a11y'), API('wizard-api'), Example('wizard-code'), Changelog('wizard-changelog')
---

The Wizard component inherits from the [Modal](/components/modal/modal-api) component, so you can use all of its properties.

## Basic example

::: sandbox

<script lang="tsx">
import React from 'react';
import Wizard from '@semcore/ui/wizard';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import ArrowRight from '@semcore/ui/icon/ArrowRight/m';
import ArrowLeft from '@semcore/ui/icon/ArrowLeft/m';

const steps = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>
        Open modal
      </Button>
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
          <Flex justifyContent='space-between' w='100%'>
            {step > 1 && (
              <Button use='tertiary' mt={5} onClick={() => setStep(step - 1)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{steps[step - 2].title}</Button.Text>
              </Button>
            )}
            {step !== steps.length && (
              <Button
                use='tertiary'
                mt={5}
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                <Button.Text>{steps[step].title}</Button.Text>
                <Button.Addon>
                  <ArrowRight />
                </Button.Addon>
              </Button>
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
}
</script>

:::

## Custom step

As the Wizard is typically a complex component, you have the flexibility to use your own components for the steps or pass a function inside to have more control.

::: sandbox

<script lang="tsx">
import React from 'react';
import Wizard from '@semcore/ui/wizard';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import ArrowRight from '@semcore/ui/icon/ArrowRight/m';
import ArrowLeft from '@semcore/ui/icon/ArrowLeft/m';
import Input from '@semcore/ui/input';

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
      <Button onClick={handleOpen}>
        Open modal
      </Button>
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
          <Flex justifyContent='space-between' w='100%'>
            {step > 1 && (
              <Button use='tertiary' mt={5} onClick={() => setStep(step - 1)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{steps[step - 2].title}</Button.Text>
              </Button>
            )}
            {step !== steps.length && (
              <Button
                use='tertiary'
                mt={5}
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                <Button.Text>{steps[step].title}</Button.Text>
                <Button.Addon>
                  <ArrowRight />
                </Button.Addon>
              </Button>
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
}
</script>

:::

## Custom stepper

The stepper can also be customized.

::: sandbox

<script lang="tsx">
import React from 'react';
import Wizard from '@semcore/ui/wizard';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import ArrowRight from '@semcore/ui/icon/ArrowRight/m';
import ArrowLeft from '@semcore/ui/icon/ArrowLeft/m';
import Input from '@semcore/ui/input';
import Radio, { RadioGroup } from '@semcore/ui/radio';

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

const steps = [{ title: 'Personal' }, { title: 'Keywords' }, { title: 'Import source' }];

const Demo = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>
        Open modal
      </Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Header'>
          <Wizard.Stepper step={1} onActive={setStep}>
            Personal
            <Text color='#FFFFFF95' tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep}>
            Keywords
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep} number={2.1}>
            Import source
            <Text color='#FFFFFF95' tag='div'>
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
              <Radio mr={2}>
                <Radio.Value value='Manually' />
                <Radio.Text>Manually</Radio.Text>
              </Radio>
              <Radio mr={2}>
                <Radio.Value value='From TXT' />
                <Radio.Text>From TXT</Radio.Text>
              </Radio>
              <Radio mr={2}>
                <Radio.Value value='From SCV' />
                <Radio.Text>From SCV</Radio.Text>
              </Radio>
            </RadioGroup>
          </Wizard.Step>
          <Flex justifyContent='space-between' w='100%'>
            {step > 1 && (
              <Button use='tertiary' mt={5} onClick={() => setStep(step - 1)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{steps[step - 2].title}</Button.Text>
              </Button>
            )}
            {step !== steps.length && (
              <Button
                use='tertiary'
                mt={5}
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                <Button.Text>{steps[step].title}</Button.Text>
                <Button.Addon>
                  <ArrowRight />
                </Button.Addon>
              </Button>
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
}
</script>

:::
