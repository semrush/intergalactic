import React, { useCallback, useState } from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import Input from '@semcore/input';
import Modal from '@semcore/modal';

function Step1() {
  return (
    <Flex tag="form" direction="column">
      <Text size={200} tag="label" mb={1} htmlFor="email">
        Email
      </Text>
      <Input>
        <Input.Value placeholder="Email" />
      </Input>
      <Text size={200} tag="label" mb={1} htmlFor="password">
        Password
      </Text>
      <Input>
        <Input.Value placeholder="Password" />
      </Input>
      <Button type="submit" use="primary" theme="success" size="l" w="100%" mt={4}>
        Log in
      </Button>
    </Flex>
  );
}
const steps = [
  { value: 1, title: 'Step 1', disabled: false },
  { value: 2, title: 'Step 2', disabled: false },
  { value: 3, title: 'Step 3', disabled: false },
];

const nextStep = (value) => {
  const startElem = steps.findIndex((it) => it.value === value);
  for (let i = startElem + 1; i < steps.length; i++) {
    if (!steps[i].disabled) return steps[i];
  }
  return null;
};

const previousStep = (value) => {
  const startElem = steps.findIndex((it) => it.value === value);
  for (let i = startElem - 1; i >= 0; i--) {
    if (!steps[i].disabled) return steps[i];
  }
  return null;
};

export default function () {
  const [activeStep, setActiveStep] = useState(1);
  const hasNext = nextStep(activeStep);
  const hasPrev = previousStep(activeStep);

  const [visible, changeVisible] = useState(false);
  const handleOpen = () => changeVisible(true);
  const handleClose = () => changeVisible(false);
  const handleStep = useCallback((step) => setActiveStep(step), []);
  const handlePrevStep = useCallback((step) => setActiveStep(previousStep(step).value), []);
  const handleNextStep = useCallback((step) => setActiveStep(nextStep(step).value), []);

  return (
    <>
      <Button use="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Wizard
        currentStep={activeStep}
        steps={steps}
        p={0}
        w={700}
        h={500}
        visible={visible}
        onClose={handleClose}
        tag={Modal}
      >
        <Wizard.Sidebar title="Header" style={{ borderRadius: '6px 0 0 6px' }}>
          <Wizard.Stepper value={1} onClick={() => handleStep(1)} />
          <Wizard.Stepper value={2} onClick={() => handleStep(2)} />
          <Wizard.Stepper value={3} onClick={() => handleStep(3)} />
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step tag={Step1} value={1} />
          <Wizard.Step value={2}>Second page</Wizard.Step>
          <Wizard.Step value={3}>
            <Text size={400} fontWeight={500}>
              Final page
            </Text>
            <Text tag="p" mt={2}>
              Congratulations on passing all the steps
            </Text>
          </Wizard.Step>
          <Flex justifyContent="space-between" w="100%">
            {hasPrev && (
              <Button use="tertiary" mt={5} onClick={() => handlePrevStep(activeStep)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{hasPrev.title}</Button.Text>
              </Button>
            )}
            {hasNext && (
              <Button use="tertiary" mt={5} onClick={() => handleNextStep(activeStep)}>
                <Button.Text>{hasNext.title}</Button.Text>
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
