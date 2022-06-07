import React, { useState, useCallback } from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import Input from '@semcore/input';

function Step1() {
  return (
    <Flex direction="column">
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
  { step: 1, title: 'Step 1', disabled: false },
  { step: 2, title: 'Step 2', disabled: true },
  { step: 3, title: 'Step 3', disabled: false },
];

const nextStep = (step) => {
  const startElem = steps.findIndex((it) => it.step === step);
  for (let i = startElem + 1; i < steps.length; i++) {
    if (!steps[i].disabled) return steps[i];
  }
  return null;
};

const previousStep = (step) => {
  const startElem = steps.findIndex((it) => it.step === step);
  for (let i = startElem - 1; i >= 0; i--) {
    if (!steps[i].disabled) return steps[i];
  }
  return null;
};

export default function () {
  const [currentStep, setCurrentStep] = useState(1);
  const hasNext = nextStep(currentStep);
  const hasPrev = previousStep(currentStep);
  const handleStep = useCallback((step) => setCurrentStep(step), []);
  const handlePrevStep = useCallback((step) => setCurrentStep(previousStep(step).step), []);
  const handleNextStep = useCallback((step) => setCurrentStep(nextStep(step).step), []);

  return (
    <>
      <Wizard currentStep={currentStep} steps={steps} h={300}>
        <Wizard.Sidebar title="Header">
          <Wizard.Stepper
            step={1}
            onClick={() => handleStep(1)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleStep(1);
              }
            }}
          />
          <Wizard.Stepper step={2} />
          <Wizard.Stepper
            step={3}
            onClick={() => handleStep(3)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleStep(3);
              }
            }}
          />
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step tag={Step1} step={1} />
          <Wizard.Step step={2}>Second page</Wizard.Step>
          <Wizard.Step step={3}>
            <>
              <Text size={400} fontWeight={500}>
                Final page
              </Text>
              <Text tag="p" mt={2}>
                Congratulations on passing all the steps
              </Text>
            </>
          </Wizard.Step>
          <Flex justifyContent="space-between" w="100%">
            {hasPrev && (
              <Button use="tertiary" mt={5} onClick={() => handlePrevStep(currentStep)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{hasPrev.title}</Button.Text>
              </Button>
            )}
            {hasNext && (
              <Button use="tertiary" mt={5} onClick={() => handleNextStep(currentStep)}>
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
