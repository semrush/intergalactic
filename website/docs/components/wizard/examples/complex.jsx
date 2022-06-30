import React, { useState } from 'react';
import Wizard from '@semcore/wizard';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import Input from '@semcore/input';
import Radio, { RadioGroup } from '@semcore/radio';

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

const steps = [{ title: 'Personal' }, { title: 'Keywords' }, { title: 'Import source' }];

export default function () {
  const [step, setStep] = useState(1);
  const [visible, changeVisible] = useState(false);
  const [value, setValue] = useState('');
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
            Personal
            <Text color="#FFFFFF95" tag="div">
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={setStep}>
            Keywords
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={setStep} number={2.1}>
            Import source
            <Text color="#FFFFFF95" tag="div">
              {value === '' ? 'Not selected' : value}
            </Text>
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction="column" justifyContent="space-between">
          <Wizard.Step tag={Step1} step={1} />
          <Wizard.Step step={2}>
            {(props, handlers) => {
              return 'Here might be your keywords';
            }}
          </Wizard.Step>
          <Wizard.Step step={3}>
            <RadioGroup name="radio" value={value} onChange={(v) => setValue(v)}>
              <Radio mr={2}>
                <Radio.Value value="Manually" />
                <Radio.Text>Manually</Radio.Text>
              </Radio>
              <Radio mr={2}>
                <Radio.Value value="From TXT" />
                <Radio.Text>From TXT</Radio.Text>
              </Radio>
              <Radio mr={2}>
                <Radio.Value value="From SCV" />
                <Radio.Text>From SCV</Radio.Text>
              </Radio>
            </RadioGroup>
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
