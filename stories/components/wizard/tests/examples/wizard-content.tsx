import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import Wizard from '@semcore/ui/wizard';
import React from 'react';

const steps = [
  { title: 'Personal Info' },
  { title: 'Import source' },
  { title: 'Sub step name' },
  { title: 'Sub step name 2' },
  { title: 'Administrative Info' },
  { title: 'Documents' },
  { title: 'Photos' },
  { title: 'Additional Info' },
  { title: 'Approval Info' },
  { title: 'Other Info' },
  { title: 'Something else' },
];

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
      <Wizard visible={true} step={step} w={600} onClose={handleClose}>

        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          {steps.map((stepData, index) => (
            <Wizard.Step key={index} step={index + 1}>
              <Text size={500} tag='h3'>
                {stepData.title}
              </Text>
            </Wizard.Step>
          ))}

          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack
                onActive={handleStepChange(step - 1)}
                stepName={steps[step - 2].title}
                disabled={step === 2}
              />
            )}
            {step !== steps.length - 1 && (
              <Wizard.StepNext
                ml='auto'
                onActive={handleStepChange(step + 1)}
                stepName={steps[step].title}
                disabled={step === steps.length - 3}
              />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export default Demo;
