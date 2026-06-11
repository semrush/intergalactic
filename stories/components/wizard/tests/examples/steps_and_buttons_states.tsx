import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import Wizard from '@semcore/ui/wizard';
import React from 'react';

const steps = [
  { title: 'Personal Info for test long long text' },
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

type StepsAndButtonsStatesProps = {
  firstStepTitle: string;
};

export const defaultProps: StepsAndButtonsStatesProps = {
  firstStepTitle: steps[0].title,
};

const Demo = ({ firstStepTitle }: StepsAndButtonsStatesProps) => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const configurableSteps = [
    { ...steps[0], title: firstStepTitle },
    ...steps.slice(1),
  ];

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleStepChange = (newStep: number) => () => {
    setStep(newStep);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open wizard</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <Wizard.Sidebar title='Site Audit Settings'>
          <Wizard.Stepper step={1} onActive={handleStepChange(1)} completed>
            {configurableSteps[0].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={handleStepChange(2)} number={1.1}>
            {configurableSteps[1].title}
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={handleStepChange(3)} number={1.2}>
            <Text color='text-secondary-invert' fontWeight={400}>
              {configurableSteps[2].title}
            </Text>
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              Optional step
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={4} onActive={handleStepChange(4)} number={1.3}>
            <Text color='text-secondary-invert' fontWeight={400}>
              {configurableSteps[3].title}
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={5} onActive={handleStepChange(5)}>
            {configurableSteps[4].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={6} onActive={handleStepChange(6)}>
            {configurableSteps[5].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={7} onActive={handleStepChange(7)}>
            {configurableSteps[6].title}
            <Text color='text-secondary-invert' fontWeight={400} tag='div'>
              optional
            </Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={8} onActive={handleStepChange(8)}>
            {configurableSteps[7].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={9} onActive={handleStepChange(9)} disabled>
            {configurableSteps[8].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={10} onActive={handleStepChange(10)} disabled number={8.1}>
            {configurableSteps[9].title}
          </Wizard.Stepper>
          <Wizard.Stepper step={11} onActive={handleStepChange(11)} disabled number={8.1} completed>
            {configurableSteps[10].title}
          </Wizard.Stepper>
        </Wizard.Sidebar>

        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between'>
          {configurableSteps.map((stepData, index) => (
            <Wizard.Step key={index} step={index + 1}>
              <Wizard.StepTitle
                ellipsis
              >
                {stepData.title}
              </Wizard.StepTitle>
            </Wizard.Step>
          ))}

          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack
                onActive={handleStepChange(step - 1)}
                stepName={configurableSteps[step - 2].title}
                disabled={step === 2}
              />
            )}
            {step !== configurableSteps.length - 1 && (
              <Wizard.StepNext
                ml='auto'
                onActive={handleStepChange(step + 1)}
                stepName={configurableSteps[step].title}
                disabled={step === configurableSteps.length - 3}
              />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

Demo.defaultProps = defaultProps;

export default Demo;
