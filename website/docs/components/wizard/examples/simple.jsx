import React, { useState } from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';

const steps = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }];

export default function () {
  const [step, setStep] = useState(1);
  const [visible, changeVisible] = useState(false);
  const handleOpen = () => changeVisible(true);
  const handleClose = () => changeVisible(false);

  return (
    <>
      <Button use="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title="Header">
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
        <Wizard.Content tag={Flex} direction="column" justifyContent="space-between">
          <Wizard.Step step={1}>Step 1</Wizard.Step>
          <Wizard.Step step={2}>Step 2</Wizard.Step>
          <Wizard.Step step={3}>Step 3</Wizard.Step>
          <Flex justifyContent="space-between" w="100%">
            {step > 1 && (
              <Button use="tertiary" mt={5} onClick={() => setStep(step - 1)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{steps[step - 2].title}</Button.Text>
              </Button>
            )}
            {step !== steps.length && (
              <Button
                use="tertiary"
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
