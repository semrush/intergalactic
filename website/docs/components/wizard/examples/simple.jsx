import React, { useState } from 'react';
import Wizard from '@semcore/wizard';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';

const Step1 = React.forwardRef(function (props, ref) {
  return (
    <Flex ref={ref} direction="column">
      <Input mb={4}>
        <Input.Value placeholder="Your name" />
      </Input>
      <Input>
        <Input.Value placeholder="Your email" />
      </Input>
    </Flex>
  );
});

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
          <Wizard.Stepper step={1} onActive={setStep}>
            <Box mb={1}>Step 1</Box>
            <Text color="#FFFFFF95">optional</Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep}>
            Step 2
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep} number={2.1}>
            Step 3
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content>
          <Wizard.Step tag={Step1} step={1} />
          <Wizard.Step step={2}>
            {(props, handlers) => {
              return 'Second page';
            }}
          </Wizard.Step>
          <Wizard.Step step={3}>
            <Text size={400} fontWeight={500}>
              Final page
            </Text>
            <Text tag="p" mt={2}>
              Congratulations on passing all the steps
            </Text>
          </Wizard.Step>
          <Flex justifyContent="space-between" w="100%">
            {step > 1 && (
              <Button use="tertiary" mt={5} onClick={() => setStep(step - 1)}>
                <Button.Addon>
                  <ArrowLeft />
                </Button.Addon>
                <Button.Text>{steps[step - 2].title}</Button.Text>
              </Button>
            )}
            {step != steps.length && (
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
